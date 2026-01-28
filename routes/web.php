<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Di sini kita mendaftarkan rute web untuk aplikasi.
|
*/

// --- 1. HALAMAN UTAMA (ROOT) ---
// Logika: Cek apakah user sudah login?
// Jika YA -> Masuk Dashboard. Jika TIDAK -> Masuk halaman Login.
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

// --- 2. DASHBOARD ---
// Rute ini hanya bisa diakses jika sudah login ('auth').
// Memanggil fungsi 'index' di WalletController untuk mengambil data dompet.
Route::get('/dashboard', [WalletController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
// --- TAMBAHKAN INI ---
Route::post('/wallets', [WalletController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('wallets.store');
// Route untuk Update Dompet
Route::patch('/wallets/{wallet}', [WalletController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('wallets.update');

// Route Delete (Opsional, buat jaga-jaga kalau mau hapus nanti)
Route::delete('/wallets/{wallet}', [WalletController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('wallets.destroy');

// --- 3. PROFIL USER ---
// Grup rute untuk edit profil, ganti password, hapus akun.
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/categories', [CategoryController::class, 'store'])
        ->middleware(['auth', 'verified'])
        ->name('categories.store');
    Route::post('/transactions', [TransactionController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('transactions.store');
});

// --- 4. AUTENTIKASI ---
// Memuat rute untuk login, register, reset password, dll.
require __DIR__ . '/auth.php';
