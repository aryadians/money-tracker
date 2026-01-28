<?php

namespace App\Http\Controllers;

use App\Models\Wallet; // <--- PASTIKAN BARIS INI ADA!
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;

class WalletController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Ambil Dompet
        $wallets = Wallet::where('user_id', $user->id)->get();

        // Ambil Kategori (Pisahkan Income & Expense biar rapi)
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id') // Ambil kategori global juga
            ->get();

        return Inertia::render('Dashboard', [
            'wallets' => $wallets,
            'categories' => $categories, // <--- Kirim ke frontend
            'totalBalance' => $wallets->sum('balance'),
        ]);
    }
    // ... method index yang lama biarkan saja ...

    // TAMBAHKAN INI DI BAWAHNYA:
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,investment,credit_card',
            'balance' => 'required|numeric|min:0',
            'color_hex' => 'required|string|max:7',
        ]);

        // 2. Simpan ke Database
        Wallet::create([
            'user_id' => Auth::id(), // Ambil ID user yang sedang login
            'name' => $request->name,
            'type' => $request->type,
            'balance' => $request->balance,
            'color_hex' => $request->color_hex,
            'currency' => 'IDR' // Default Rupiah dulu
        ]);
        

        // 3. Kembali ke Dashboard (Data akan otomatis ter-refresh)
        return redirect()->route('dashboard');
    }
    public function update(Request $request, Wallet $wallet)
    {
        // Pastikan user hanya mengedit dompet miliknya sendiri
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

        return redirect()->back();
    }

    public function destroy(Wallet $wallet)
    {
        if ($wallet->user_id !== Auth::id()) {
            abort(403);
        }
        $wallet->delete();
        return redirect()->back();
    }
}
