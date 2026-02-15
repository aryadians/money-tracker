<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        .stat-grid { display: flex; justify-content: space-between; margin: 20px 0; }
        .stat-card { flex: 1; text-align: center; padding: 10px; background: #f9fafb; border-radius: 8px; margin: 5px; }
        .income { color: #10b981; font-weight: bold; }
        .expense { color: #ef4444; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h2>Money Tracker Summary</h2>
            <p>Halo {{ $data['user_name'] }}, berikut ringkasan keuangan Anda seminggu terakhir.</p>
        </div>

        <div className="stat-grid">
            <div className="stat-card">
                <div style="font-size: 10px; text-transform: uppercase;">Pemasukan</div>
                <div className="income">Rp {{ number_format($data['total_income'], 0, ',', '.') }}</div>
            </div>
            <div className="stat-card">
                <div style="font-size: 10px; text-transform: uppercase;">Pengeluaran</div>
                <div className="expense">Rp {{ number_format($data['total_expense'], 0, ',', '.') }}</div>
            </div>
        </div>

        <h3>Saldo Dompet Saat Ini:</h3>
        <ul>
            @foreach($data['wallets'] as $wallet)
                <li><strong>{{ $wallet->name }}:</strong> Rp {{ number_format($wallet->balance, 0, ',', '.') }}</li>
            @endforeach
        </ul>

        <p>Tetap semangat mengelola keuangan! Cek detail selengkapnya di aplikasi.</p>
        
        <div className="footer">
            Email ini dikirim otomatis oleh sistem Money Tracker.
        </div>
    </div>
</body>
</html>
