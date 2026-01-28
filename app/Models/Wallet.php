<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    // Field yang boleh diisi manual
    protected $fillable = [
        'user_id',
        'name',
        'type',
        'balance',
        'currency',
        'color_hex',
        'icon_type',
        'is_active',
    ];

    // Casting tipe data agar outputnya konsisten
    protected $casts = [
        'balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi: Setiap Wallet dimiliki oleh satu User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}