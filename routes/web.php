<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\SavingGoalController;
use App\Http\Controllers\RecurringTransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\CalendarController;

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
    Route::post('/transfers', [TransferController::class, 'store'])->name('transfers.store');

    // B. Manajemen Dompet (Wallets)
    Route::middleware('throttle:10,1')->group(function () {
        Route::post('/wallets', [WalletController::class, 'store'])->name('wallets.store');
        Route::patch('/wallets/{wallet}', [WalletController::class, 'update'])->name('wallets.update');
        Route::post('/transfers', [TransferController::class, 'store'])->name('transfers.store');
        Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    });

    Route::delete('/wallets/{wallet}', [WalletController::class, 'destroy'])->name('wallets.destroy');

    // E. Profil User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route Export Excel & PDF
    Route::get('/transactions/export', [TransactionController::class, 'export'])
        ->name('transactions.export');
    Route::get('/transactions/pdf', [ReportController::class, 'downloadPdf'])
        ->name('transactions.pdf');
    Route::post('/transactions/import', [ImportController::class, 'store'])
        ->name('transactions.import');

    // Calendar & Analytics
    Route::get('/calendar', [CalendarController::class, 'index'])
        ->name('calendar.index');
    Route::resource('budgets', BudgetController::class)->only(['index', 'store', 'update', 'destroy']);

    // F. Fitur Lanjutan
    Route::resource('debts', DebtController::class);
    Route::resource('saving-goals', SavingGoalController::class);
    Route::resource('recurring', RecurringTransactionController::class);
});

// --- 3. AUTENTIKASI ---
require __DIR__ . '/auth.php';
