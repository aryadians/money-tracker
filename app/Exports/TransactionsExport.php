<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $month;
    protected $year;

    // Terima filter bulan & tahun
    public function __construct($month, $year)
    {
        $this->month = $month;
        $this->year = $year;
    }

    public function collection()
    {
        return Transaction::where('user_id', Auth::id())
            ->with(['wallet', 'category'])
            ->whereMonth('transaction_date', $this->month)
            ->whereYear('transaction_date', $this->year)
            ->orderBy('transaction_date', 'asc')
            ->get();
    }

    public function map($transaction): array
    {
        return [
            $transaction->transaction_date,
            $transaction->category ? $transaction->category->name : 'Tanpa Kategori',
            $transaction->description,
            $transaction->type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            $transaction->wallet ? $transaction->wallet->name : 'Dompet Terhapus',
            $transaction->amount,
        ];
    }

    public function headings(): array
    {
        return [
            'Tanggal',
            'Kategori',
            'Catatan',
            'Tipe',
            'Dompet',
            'Nominal (IDR)',
        ];
    }
}
