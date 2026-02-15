<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function downloadPdf(Request $request)
    {
        $user = Auth::user();
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet'])
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->orderBy('transaction_date', 'asc')
            ->get();

        $wallets = Wallet::where('user_id', $user->id)->get();
        
        $summary = [
            'income' => $transactions->where('type', 'income')->sum('amount'),
            'expense' => $transactions->where('type', 'expense')->sum('amount'),
            'month_name' => date('F', mktime(0, 0, 0, $month, 10)),
            'year' => $year
        ];

        $pdf = Pdf::loadView('reports.monthly', compact('user', 'transactions', 'wallets', 'summary'));
        
        return $pdf->download("Laporan-Keuangan-{$summary['month_name']}-{$year}.pdf");
    }
}
