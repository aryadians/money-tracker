<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Wallet;
use App\Models\User;

class WalletSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil user pertama (akun yang baru Anda buat tadi)
        $user = User::first();

        if ($user) {
            // Dompet 1: Cash
            Wallet::create([
                'user_id' => $user->id,
                'name' => 'Dompet Saku',
                'type' => 'cash',
                'balance' => 500000,
                'color_hex' => '#10B981', // Hijau
                'currency' => 'IDR'
            ]);

            // Dompet 2: Bank BCA
            Wallet::create([
                'user_id' => $user->id,
                'name' => 'Bank BCA',
                'type' => 'bank',
                'balance' => 15000000,
                'color_hex' => '#3B82F6', // Biru
                'currency' => 'IDR'
            ]);

            // Dompet 3: Gopay
            Wallet::create([
                'user_id' => $user->id,
                'name' => 'Gopay',
                'type' => 'ewallet',
                'balance' => 250000,
                'color_hex' => '#0EA5E9', // Biru Langit
                'currency' => 'IDR'
            ]);
        }
    }
}
