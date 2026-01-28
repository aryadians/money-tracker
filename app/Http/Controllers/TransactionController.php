<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // Penting untuk transaksi database aman
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    /**
     * Menampilkan daftar riwayat transaksi.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Ambil Bulan & Tahun dari request (Default: Bulan ini)
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet']) // Load relasi
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->latest('transaction_date')
            ->paginate(10) // Tampilkan 10 per halaman
            ->withQueryString(); // Agar filter tetap ada saat pindah halaman

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ]
        ]);
    }

    /**
     * Menyimpan transaksi baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'receipt' => 'nullable|image|max:2048', // Max 2MB
            'notes' => 'nullable|string',
        ]);

        // Gunakan DB::transaction agar jika satu gagal, semua batal (saldo aman)
        DB::transaction(function () use ($request) {

            // 1. Upload Gambar (Jika ada)
            $path = null;
            if ($request->hasFile('receipt')) {
                $path = $request->file('receipt')->store('receipts', 'public');
            }

            // 2. Simpan Transaksi
            Transaction::create([
                'user_id' => Auth::id(),
                'wallet_id' => $request->wallet_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'type' => $request->type,
                'transaction_date' => $request->date,
                'description' => $request->notes,
                'receipt_image' => $path,
            ]);

            // 3. Update Saldo Dompet
            $wallet = Wallet::find($request->wallet_id);

            // Cek apakah dompet milik user yang sama (Security Check)
            if ($wallet->user_id !== Auth::id()) abort(403);

            if ($request->type === 'expense') {
                $wallet->decrement('balance', $request->amount);
            } else {
                $wallet->increment('balance', $request->amount);
            }
        });

        return redirect()->back()->with('message', 'Transaksi berhasil disimpan!');
    }

    /**
     * Mengupdate transaksi yang sudah ada.
     * (Logic saldo harus dibalik dulu, baru di-apply yang baru)
     */
    public function update(Request $request, Transaction $transaction)
    {
        // Security Check
        if ($transaction->user_id !== Auth::id()) abort(403);

        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $transaction) {
            // 1. KEMBALIKAN SALDO LAMA (Revert Old Transaction)
            $oldWallet = Wallet::find($transaction->wallet_id);
            if ($transaction->type === 'expense') {
                $oldWallet->increment('balance', $transaction->amount); // Uang dikembalikan
            } else {
                $oldWallet->decrement('balance', $transaction->amount); // Uang ditarik kembali
            }

            // 2. UPDATE DATA TRANSAKSI
            $transaction->update([
                'wallet_id' => $request->wallet_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'type' => $request->type,
                'transaction_date' => $request->date,
                'description' => $request->notes,
            ]);

            // 3. TERAPKAN SALDO BARU (Apply New Transaction)
            $newWallet = Wallet::find($request->wallet_id);
            if ($request->type === 'expense') {
                $newWallet->decrement('balance', $request->amount);
            } else {
                $newWallet->increment('balance', $request->amount);
            }
        });

        return redirect()->back()->with('message', 'Transaksi berhasil diperbarui!');
    }

    /**
     * Menghapus transaksi.
     */
    public function destroy(Transaction $transaction)
    {
        // Security Check
        if ($transaction->user_id !== Auth::id()) abort(403);

        DB::transaction(function () use ($transaction) {
            // 1. KEMBALIKAN SALDO DOMPET
            $wallet = Wallet::find($transaction->wallet_id);

            // Jika wallet masih ada (belum dihapus user)
            if ($wallet) {
                if ($transaction->type === 'expense') {
                    $wallet->increment('balance', $transaction->amount); // Kembalikan uang belanja
                } else {
                    $wallet->decrement('balance', $transaction->amount); // Tarik kembali uang pemasukan
                }
            }

            // 2. HAPUS FILE FOTO (Jika ada)
            if ($transaction->receipt_image) {
                Storage::disk('public')->delete($transaction->receipt_image);
            }

            // 3. HAPUS DATA
            $transaction->delete();
        });

        return redirect()->back()->with('message', 'Transaksi berhasil dihapus!');
    }
}
