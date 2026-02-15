<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Budget;
use Carbon\Carbon;

class InsightService
{
    public static function generate($user)
    {
        $insights = [];
        $month = date('m');
        
        // 1. Boros Kopi/Makan?
        $makanLuar = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $month)
            ->whereHas('category', function ($q) {
                $q->where('name', 'like', '%Makan%')->orWhere('name', 'like', '%Kopi%');
            })
            ->sum('amount');
            
        if ($makanLuar > 500000) {
            $insights[] = [
                'type' => 'warning',
                'message' => 'Pengeluaran makan luar bulan ini sudah Rp ' . number_format($makanLuar) . '. Masak sendiri bisa hemat 50% lho! 🍳',
            ];
        }

        // 2. Tabungan Tipis?
        $income = Transaction::where('user_id', $user->id)->whereMonth('transaction_date', $month)->where('type', 'income')->sum('amount');
        $expense = Transaction::where('user_id', $user->id)->whereMonth('transaction_date', $month)->where('type', 'expense')->sum('amount');
        
        if ($income > 0 && ($expense / $income) > 0.8) {
            $insights[] = [
                'type' => 'danger',
                'message' => 'Waspada! Anda sudah menghabiskan 80% dari pemasukan bulan ini. Rem pengeluaran non-esensial! 🛑',
            ];
        } else if ($income > 0 && ($expense / $income) < 0.5) {
            $insights[] = [
                'type' => 'success',
                'message' => 'Hebat! Anda hemat sekali bulan ini. Pertimbangkan investasi sisa uangnya. 📈',
            ];
        }

        // 3. Hutang Jatuh Tempo
        // (Logic di HealthScoreService sudah ada, ini tambahan insight verbal)
        
        return $insights;
    }
}
