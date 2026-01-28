<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transfer extends Model
{
    protected $guarded = ['id'];

    // Relasi ke Dompet Asal
    public function fromWallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class, 'from_wallet_id');
    }

    // Relasi ke Dompet Tujuan
    public function toWallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class, 'to_wallet_id');
    }
}
