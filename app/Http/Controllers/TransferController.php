<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransferController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'from_wallet_id' => 'required|exists:wallets,id|different:to_wallet_id',
            'to_wallet_id'   => 'required|exists:wallets,id',
            'amount'         => 'required|numeric|min:1',
            'date'           => 'required|date',
            'description'    => 'nullable|string|max:255',
        ]);

        // Pastikan dompet milik user yang sedang login (Security)
        $fromWallet = Wallet::where('id', $request->from_wallet_id)->where('user_id', Auth::id())->firstOrFail();
        $toWallet   = Wallet::where('id', $request->to_wallet_id)->where('user_id', Auth::id())->firstOrFail();

        // Cek saldo cukup?
        if ($fromWallet->balance < $request->amount) {
            return redirect()->back()->withErrors(['amount' => 'Saldo dompet asal tidak mencukupi.']);
        }

        // Gunakan Database Transaction agar aman (Atomic Operation)
        DB::transaction(function () use ($request, $fromWallet, $toWallet) {

            // 1. Catat Riwayat Transfer
            Transfer::create([
                'user_id'        => Auth::id(),
                'from_wallet_id' => $fromWallet->id,
                'to_wallet_id'   => $toWallet->id,
                'amount'         => $request->amount,
                'date'           => $request->date,
                'description'    => $request->description,
            ]);

            // 2. Kurangi Saldo Pengirim
            $fromWallet->decrement('balance', $request->amount);

            // 3. Tambah Saldo Penerima
            $toWallet->increment('balance', $request->amount);
        });

        // CONTOH YANG BENAR:
        return redirect()->back()->with('message', 'Transfer berhasil dilakukan! 💸');

        // Jika Gagal/Error (Opsional):
        return redirect()->back()->with('error', 'Saldo tidak mencukupi!');
    }
}
