<?php

namespace App\Services;

use App\Models\Budget;
use App\Models\Transaction;
use App\Models\Debt;
use App\Models\Wallet;
use Carbon\Carbon;

class HealthScoreService
{
    public static function calculate($user)
    {
        $score = 0;
        $maxScore = 100;
        $month = date('m');
        $year = date('Y');

        // 1. Rasio Tabungan (Income > Expense) - Bobot 40
        $income = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->where('type', 'income')
            ->sum('amount');
            
        $expense = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->where('type', 'expense')
            ->sum('amount');

        if ($income > 0 && $expense < $income) {
            $savingRatio = ($income - $expense) / $income;
            // Jika bisa nabung > 20%, skor full
            $score += ($savingRatio >= 0.2) ? 40 : ($savingRatio * 200); 
        }

        // 2. Budget Adherence (Tidak Overbudget) - Bobot 30
        $budgets = Budget::where('user_id', $user->id)->get();
        $overBudgetCount = 0;
        
        foreach ($budgets as $budget) {
            $spent = Transaction::where('user_id', $user->id)
                ->where('category_id', $budget->category_id)
                ->whereMonth('transaction_date', $month)
                ->whereYear('transaction_date', $year)
                ->where('type', 'expense')
                ->sum('amount');
                
            if ($spent > $budget->amount) {
                $overBudgetCount++;
            }
        }
        
        if ($budgets->count() > 0) {
            if ($overBudgetCount === 0) {
                $score += 30;
            } else {
                // Kurangi skor jika ada yang jebol
                $score += max(0, 30 - ($overBudgetCount * 10));
            }
        } else {
            // Jika belum punya budget, kasih nilai tengah (motivasi)
            $score += 15;
        }

        // 3. Manajemen Hutang (Tidak ada hutang jatuh tempo) - Bobot 30
        $overdueDebts = Debt::where('user_id', $user->id)
            ->where('type', 'payable')
            ->where('is_paid', false)
            ->where('due_date', '<', Carbon::today())
            ->exists();

        if (!$overdueDebts) {
            $score += 30;
        }

        return min(100, max(0, round($score)));
    }
}
