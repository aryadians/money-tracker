<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wallet_id',
        'category_id',
        'type',
        'amount',
        'transaction_date',
        'description',
        'receipt_image',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'date',
    ];

    // Relasi: Transaksi milik satu user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi: Transaksi terhubung ke satu dompet
    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class);
    }

    // Relasi: Transaksi punya satu kategori
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
