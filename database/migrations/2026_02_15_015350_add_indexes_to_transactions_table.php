<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Index untuk mempercepat filter berdasarkan tanggal (bulan/tahun)
            $table->index('transaction_date');
            // Index untuk mempercepat filter tipe (income/expense)
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropIndex(['transaction_date']);
            $table->dropIndex(['type']);
        });
    }
};
