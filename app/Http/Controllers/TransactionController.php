<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\Category; // <--- INI YANG TADI KURANG
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Exports\TransactionsExport;
use Maatwebsite\Excel\Facades\Excel;

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

        // 1. Ambil Data Transaksi (Filter & Pagination)
        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet']) // Load relasi
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->latest('transaction_date')
            ->paginate(10)
            ->withQueryString();

        // 2. Ambil Data Dompet (Untuk Modal Edit di halaman Index)
        $wallets = Wallet::where('user_id', $user->id)->get();

        // 3. Ambil Data Kategori (Untuk Modal Edit di halaman Index)
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ],
            'wallets' => $wallets,       // Kirim ke Frontend
            'categories' => $categories, // Kirim ke Frontend
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

        DB::transaction(function () use ($request) {
            // 1. Upload Gambar
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
     * Mengupdate transaksi.
     */
    public function update(Request $request, Transaction $transaction)
    {
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
            // 1. Revert Saldo Lama
            $oldWallet = Wallet::find($transaction->wallet_id);
            if ($transaction->type === 'expense') {
                $oldWallet->increment('balance', $transaction->amount);
            } else {
                $oldWallet->decrement('balance', $transaction->amount);
            }

            // 2. Update Data
            $transaction->update([
                'wallet_id' => $request->wallet_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'type' => $request->type,
                'transaction_date' => $request->date,
                'description' => $request->notes,
            ]);

            // 3. Apply Saldo Baru
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
        if ($transaction->user_id !== Auth::id()) abort(403);

        DB::transaction(function () use ($transaction) {
            // 1. Kembalikan Saldo
            $wallet = Wallet::find($transaction->wallet_id);
            if ($wallet) {
                if ($transaction->type === 'expense') {
                    $wallet->increment('balance', $transaction->amount);
                } else {
                    $wallet->decrement('balance', $transaction->amount);
                }
            }

            // 2. Hapus File Foto
            if ($transaction->receipt_image) {
                Storage::disk('public')->delete($transaction->receipt_image);
            }

            // 3. Hapus Data
            $transaction->delete();
        });

        return redirect()->back()->with('message', 'Transaksi berhasil dihapus!');
    }
    public function export(Request $request)
    {
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        return Excel::download(new TransactionsExport($month, $year), 'Laporan-Keuangan-' . $month . '-' . $year . '.xlsx');
    }
}
