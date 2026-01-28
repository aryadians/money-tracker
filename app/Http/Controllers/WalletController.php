<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Menampilkan halaman Dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        $currentMonth = date('m');
        $currentYear = date('Y');

        // 1. Ambil Data Dompet (Milik User)
        $wallets = Wallet::where('user_id', $user->id)->get();

        // 2. Ambil Data Kategori (Milik User + Default System/Null)
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->get();

        // 3. Ambil 5 Transaksi Terakhir (Untuk List Recent Transactions)
        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet']) // Load relasi agar nama/icon muncul
            ->latest('transaction_date')
            ->take(5)
            ->get();

        // 4. Hitung Pemasukan Bulan Ini
        $monthlyIncome = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->where('type', 'income')
            ->sum('amount');

        // 5. Hitung Pengeluaran Bulan Ini
        $monthlyExpense = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->where('type', 'expense')
            ->sum('amount');

        // Kirim semua data ke Frontend (Dashboard.jsx)
        return Inertia::render('Dashboard', [
            'wallets' => $wallets,
            'categories' => $categories,
            'transactions' => $transactions,
            'totalBalance' => $wallets->sum('balance'),
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpense' => $monthlyExpense,
        ]);
    }

    /**
     * Menyimpan dompet baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,investment,credit_card',
            'balance' => 'required|numeric|min:0',
            'color_hex' => 'required|string|max:7',
        ]);

        Wallet::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'type' => $request->type,
            'balance' => $request->balance,
            'color_hex' => $request->color_hex,
            'currency' => 'IDR' // Default currency
        ]);

        return redirect()->back()->with('message', 'Dompet berhasil dibuat!');
    }

    /**
     * Mengupdate dompet yang sudah ada.
     */
    public function update(Request $request, Wallet $wallet)
    {
        // Security: Pastikan user hanya mengedit dompet miliknya
        if ($wallet->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,investment,credit_card',
            'balance' => 'required|numeric|min:0',
            'color_hex' => 'required|string|max:7',
        ]);

        $wallet->update([
            'name' => $request->name,
            'type' => $request->type,
            'balance' => $request->balance,
            'color_hex' => $request->color_hex,
        ]);

        return redirect()->back()->with('message', 'Dompet berhasil diperbarui!');
    }

    /**
     * Menghapus dompet.
     */
    public function destroy(Wallet $wallet)
    {
        // Security: Pastikan user hanya menghapus dompet miliknya
        if ($wallet->user_id !== Auth::id()) {
            abort(403);
        }

        // Opsional: Cek apakah ada transaksi di dompet ini sebelum hapus?
        // Untuk sekarang kita hapus saja (transaksi terkait akan kehilangan relasi wallet_id atau ikut terhapus jika di-set cascade)

        $wallet->delete();

        return redirect()->back()->with('message', 'Dompet berhasil dihapus!');
    }
}
