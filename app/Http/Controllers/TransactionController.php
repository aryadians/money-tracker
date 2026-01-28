<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // Penting untuk transaksi database aman
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
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
            if ($request->type === 'expense') {
                $wallet->decrement('balance', $request->amount);
            } else {
                $wallet->increment('balance', $request->amount);
            }
        });

        return redirect()->back()->with('message', 'Transaksi berhasil disimpan!');
    }
}
