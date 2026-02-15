<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Default ke bulan ini jika tidak ada filter
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));
        
        // Ambil transaksi bulan ini
        $transactions = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->with(['category', 'wallet'])
            ->get();
            
        // Group by tanggal untuk kalender
        $calendarData = [];
        foreach ($transactions as $trx) {
            $date = $trx->transaction_date;
            
            if (!isset($calendarData[$date])) {
                $calendarData[$date] = [
                    'income' => 0,
                    'expense' => 0,
                    'details' => []
                ];
            }
            
            if ($trx->type === 'income') {
                $calendarData[$date]['income'] += $trx->amount;
            } else {
                $calendarData[$date]['expense'] += $trx->amount;
            }
            
            // Simpan detail untuk popup/tooltip
            $calendarData[$date]['details'][] = [
                'type' => $trx->type,
                'category' => $trx->category->name ?? 'N/A',
                'amount' => $trx->amount
            ];
        }

        return Inertia::render('Calendar/Index', [
            'calendarData' => $calendarData,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ]
        ]);
    }
}
