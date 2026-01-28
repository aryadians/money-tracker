<?php

namespace App\Http\Controllers;

use App\Models\Wallet; // <--- PASTIKAN BARIS INI ADA!
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public function index()
    {
        // Kita gunakan try-catch agar kalau error ketahuan
        try {
            $wallets = Wallet::where('user_id', Auth::id())->get();
            $totalBalance = $wallets->sum('balance');

            return Inertia::render('Dashboard', [
                'wallets' => $wallets,
                'totalBalance' => $totalBalance,
            ]);
        } catch (\Exception $e) {
            // Jika error, kembalikan array kosong agar tidak layar putih
            return Inertia::render('Dashboard', [
                'wallets' => [],
                'totalBalance' => 0,
                'error' => $e->getMessage()
            ]);
        }
    }
}
