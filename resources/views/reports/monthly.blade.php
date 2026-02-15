<!DOCTYPE html>
<html>
<head>
    <title>Laporan Keuangan</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary-box { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .summary-box td { padding: 15px; border: 1px solid #eee; }
        .label { font-weight: bold; color: #666; font-size: 10px; text-transform: uppercase; }
        .value { font-size: 16px; font-weight: bold; }
        .income { color: #10b981; }
        .expense { color: #ef4444; }
        table.transactions { width: 100%; border-collapse: collapse; }
        table.transactions th { background: #f9fafb; padding: 10px; text-align: left; border-bottom: 2px solid #eee; }
        table.transactions td { padding: 10px; border-bottom: 1px solid #eee; }
        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #999; }
    </style>
</head>
<body>
    <div className="header">
        <h1>Laporan Keuangan Bulanan</h1>
        <p>{{ $summary['month_name'] }} {{ $summary['year'] }} - {{ $user->name }}</p>
    </div>

    <table className="summary-box">
        <tr>
            <td>
                <div className="label">Total Pemasukan</div>
                <div className="value income">Rp {{ number_format($summary['income'], 0, ',', '.') }}</div>
            </td>
            <td>
                <div className="label">Total Pengeluaran</div>
                <div className="value expense">Rp {{ number_format($summary['expense'], 0, ',', '.') }}</div>
            </td>
            <td>
                <div className="label">Saldo Akhir</div>
                <div className="value">Rp {{ number_format($summary['income'] - $summary['expense'], 0, ',', '.') }}</div>
            </td>
        </tr>
    </table>

    <h3>Detail Transaksi</h3>
    <table className="transactions">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Dompet</th>
                <th>Keterangan</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $trx)
            <tr>
                <td>{{ date('d/m/Y', strtotime($trx->transaction_date)) }}</td>
                <td>{{ $trx->category->name ?? 'N/A' }}</td>
                <td>{{ $trx->wallet->name ?? 'N/A' }}</td>
                <td>{{ $trx->description }}</td>
                <td className="{{ $trx->type === 'income' ? 'income' : 'expense' }}">
                    {{ $trx->type === 'income' ? '+' : '-' }} Rp {{ number_format($trx->amount, 0, ',', '.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div className="footer">
        Dicetak otomatis oleh Money Tracker pada {{ date('d/m/Y H:i') }}
    </div>
</body>
</html>
