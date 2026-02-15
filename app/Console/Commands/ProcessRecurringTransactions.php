<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RecurringTransaction;
use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProcessRecurringTransactions extends Command
{
    protected $signature = 'transactions:process-recurring';
    protected $description = 'Process all active recurring transactions for today';

    public function handle()
    {
        $today = Carbon::today();
        
        $recurringTasks = RecurringTransaction::where('is_active', true)
            ->where('next_run_date', '<=', $today)
            ->get();

        if ($recurringTasks->isEmpty()) {
            $this->info('Tidak ada transaksi berulang yang perlu diproses hari ini.');
            return;
        }

        foreach ($recurringTasks as $task) {
            DB::transaction(function () use ($task, $today) {
                // 1. Buat Transaksi Baru
                Transaction::create([
                    'user_id' => $task->user_id,
                    'wallet_id' => $task->wallet_id,
                    'category_id' => $task->category_id,
                    'amount' => $task->amount,
                    'type' => $task->type,
                    'transaction_date' => $today->toDateString(),
                    'description' => '[Otomatis] ' . $task->description,
                ]);

                // 2. Update Saldo Dompet
                $wallet = Wallet::find($task->wallet_id);
                if ($task->type === 'expense') {
                    $wallet->decrement('balance', $task->amount);
                } else {
                    $wallet->increment('balance', $task->amount);
                }

                // 3. Hitung Tanggal Berikutnya
                $nextRun = Carbon::parse($task->next_run_date);
                switch ($task->frequency) {
                    case 'daily': $nextRun->addDay(); break;
                    case 'weekly': $nextRun->addWeek(); break;
                    case 'monthly': $nextRun->addMonth(); break;
                    case 'yearly': $nextRun->addYear(); break;
                }

                $task->update([
                    'next_run_date' => $nextRun->toDateString(),
                ]);
            });
            
            $this->info("Berhasil memproses: {$task->description}");
        }
    }
}
