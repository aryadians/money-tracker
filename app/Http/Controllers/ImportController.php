<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'file' => 'required|mimes:csv,txt',
        ]);

        $wallet = Wallet::where('id', $request->wallet_id)->where('user_id', Auth::id())->firstOrFail();
        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');
        
        // Lewati header jika ada
        fgetcsv($handle);

        $count = 0;
        DB::transaction(function () use ($handle, $wallet, &$count) {
            while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                // Format CSV Asumsi: Tanggal(Y-m-d), Keterangan, Jumlah, Tipe(income/expense)
                if (count($data) < 4) continue;

                $date = $data[0];
                $description = $data[1];
                $amount = abs($data[2]);
                $type = strtolower($data[3]) == 'income' ? 'income' : 'expense';

                Transaction::create([
                    'user_id' => Auth::id(),
                    'wallet_id' => $wallet->id,
                    'category_id' => null, // Manual categorization later
                    'amount' => $amount,
                    'type' => $type,
                    'transaction_date' => $date,
                    'description' => '[Import] ' . $description,
                ]);

                if ($type === 'expense') {
                    $wallet->decrement('balance', $amount);
                } else {
                    $wallet->increment('balance', $amount);
                }
                $count++;
            }
        });

        fclose($handle);

        return redirect()->back()->with('message', "Berhasil mengimpor {$count} transaksi!");
    }
}
