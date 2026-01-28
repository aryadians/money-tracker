<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Di sini kita mendaftarkan rute web untuk aplikasi.
|
*/

// --- 1. HALAMAN UTAMA (ROOT) ---
// Cek login: Jika sudah login -> Dashboard, Jika belum -> Login page.
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

// --- 2. FITUR UTAMA APLIKASI (PROTECTED ROUTES) ---
// Semua route di dalam grup ini WAJIB Login & Email Verified
Route::middleware(['auth', 'verified'])->group(function () {

    // A. Dashboard
    Route::get('/dashboard', [WalletController::class, 'index'])->name('dashboard');

    // B. Manajemen Dompet (Wallets)
    Route::post('/wallets', [WalletController::class, 'store'])->name('wallets.store');       // Simpan Baru
    Route::patch('/wallets/{wallet}', [WalletController::class, 'update'])->name('wallets.update'); // Update
    Route::delete('/wallets/{wallet}', [WalletController::class, 'destroy'])->name('wallets.destroy'); // Hapus

    // C. Manajemen Kategori (Categories)
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store'); // Simpan Baru

    // D. Manajemen Transaksi (Transactions)
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index'); // Lihat Riwayat Lengkap
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store'); // Simpan Transaksi Baru

    // E. Profil User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route Export Excel
    Route::get('/transactions/export', [TransactionController::class, 'export'])
        ->name('transactions.export');
});

// --- 3. AUTENTIKASI ---
require __DIR__ . '/auth.php';
