<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Mail\WeeklySummaryMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendWeeklySummary extends Command
{
    protected $signature = 'summary:send-weekly';
    protected $description = 'Send weekly financial summary to all users';

    public function handle()
    {
        $users = User::all();
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        foreach ($users as $user) {
            $transactions = Transaction::where('user_id', $user->id)
                ->whereBetween('transaction_date', [$startOfWeek, $endOfWeek])
                ->get();

            $wallets = Wallet::where('user_id', $user->id)->get();

            $data = [
                'user_name' => $user->name,
                'total_income' => $transactions->where('type', 'income')->sum('amount'),
                'total_expense' => $transactions->where('type', 'expense')->sum('amount'),
                'wallets' => $wallets,
            ];

            try {
                Mail::to($user->email)->send(new WeeklySummaryMail($data));
                $this->info("Summary sent to: {$user->email}");
            } catch (\Exception $e) {
                $this->error("Failed to send to: {$user->email}. Error: {$e->getMessage()}");
            }
        }
    }
}
