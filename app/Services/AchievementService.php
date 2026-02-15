<?php

namespace App\Services;

use App\Models\User;
use App\Models\Achievement;
use App\Models\Transaction;
use App\Models\SavingGoal;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AchievementService
{
    public static function checkAndUnlock($user)
    {
        $unlocked = [];

        // 1. Hemat Mania (Pengeluaran < Pemasukan bulan ini)
        if (self::checkHematMania($user)) {
            $unlocked[] = self::unlock($user, 'hemat_mania', 'Hemat Mania', 'Pengeluaran < Pemasukan', '💰');
        }

        // 2. Raja Nabung (Target tercapai 100%)
        if (self::checkRajaNabung($user)) {
            $unlocked[] = self::unlock($user, 'raja_nabung', 'Raja Nabung', 'Target tabungan tercapai!', '🏆');
        }

        // 3. Disiplin (Catat transaksi 3 hari berturut-turut)
        if (self::checkDisiplin($user)) {
            $unlocked[] = self::unlock($user, 'disiplin', 'Disiplin', 'Catat 3 hari berturut-turut', '📅');
        }

        return array_filter($unlocked); // Kembalikan yang baru saja terbuka
    }

    private static function unlock($user, $code, $name, $desc, $icon)
    {
        // Cari atau Buat Achievement di database
        $ach = Achievement::firstOrCreate(
            ['criteria_code' => $code],
            ['name' => $name, 'description' => $desc, 'icon' => $icon]
        );

        // Cek apakah user sudah punya
        $exists = DB::table('user_achievements')
            ->where('user_id', $user->id)
            ->where('achievement_id', $ach->id)
            ->exists();

        if (!$exists) {
            DB::table('user_achievements')->insert([
                'user_id' => $user->id,
                'achievement_id' => $ach->id,
                'unlocked_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            return $ach; // Return achievement object for notification
        }

        return null;
    }

    // --- LOGIC CHECKERS ---

    private static function checkHematMania($user)
    {
        $month = date('m');
        $income = Transaction::where('user_id', $user->id)->whereMonth('transaction_date', $month)->where('type', 'income')->sum('amount');
        $expense = Transaction::where('user_id', $user->id)->whereMonth('transaction_date', $month)->where('type', 'expense')->sum('amount');
        return $income > 0 && $expense < $income;
    }

    private static function checkRajaNabung($user)
    {
        return SavingGoal::where('user_id', $user->id)
            ->whereRaw('current_amount >= target_amount')
            ->exists();
    }

    private static function checkDisiplin($user)
    {
        // Cek 3 hari terakhir
        for ($i = 0; $i < 3; $i++) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $hasTrx = Transaction::where('user_id', $user->id)->whereDate('transaction_date', $date)->exists();
            if (!$hasTrx) return false;
        }
        return true;
    }
}
