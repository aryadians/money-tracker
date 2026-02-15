<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TelegramBotController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $update = $request->all();
        
        if (!isset($update['message'])) return response()->json(['status' => 'ok']);

        $chatId = $update['message']['chat']['id'];
        $text = $update['message']['text'];

        // Cari user berdasarkan Telegram ID
        $user = User::where('telegram_id', $chatId)->first();

        if (!$user) {
            return $this->sendMessage($chatId, "Halo! Telegram ID Anda ({$chatId}) belum terdaftar. Silakan masukkan ID ini di profil Money Tracker Anda.");
        }

        // Parsing Pesan: "Kopi 20000"
        $parts = explode(' ', $text);
        if (count($parts) < 2) {
            return $this->sendMessage($chatId, "Format salah. Gunakan: [Keterangan] [Jumlah]\nContoh: Kopi 20000");
        }

        $amount = (float) end($parts);
        array_pop($parts);
        $description = implode(' ', $parts);

        if ($amount <= 0) {
            return $this->sendMessage($chatId, "Jumlah uang harus berupa angka positif.");
        }

        // Ambil Dompet Pertama sebagai default
        $wallet = Wallet::where('user_id', $user->id)->first();
        if (!$wallet) {
            return $this->sendMessage($chatId, "Anda belum memiliki dompet. Silakan buat dompet di aplikasi.");
        }

        // Catat Transaksi
        Transaction::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'amount' => $amount,
            'type' => 'expense',
            'transaction_date' => now()->toDateString(),
            'description' => '[Telegram] ' . $description,
        ]);

        $wallet->decrement('balance', $amount);

        return $this->sendMessage($chatId, "✅ Berhasil mencatat pengeluaran: {$description} senilai Rp " . number_format($amount, 0, ',', '.'));
    }

    private function sendMessage($chatId, $text)
    {
        $token = env('TELEGRAM_BOT_TOKEN');
        if (!$token) return response()->json(['status' => 'no token']);

        $url = "https://api.telegram.org/bot{$token}/sendMessage";
        
        // Gunakan file_get_contents atau Curl untuk kirim balik pesan
        @file_get_contents($url . "?" . http_build_query([
            'chat_id' => $chatId,
            'text' => $text
        ]));

        return response()->json(['status' => 'ok']);
    }
}
