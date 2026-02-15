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
        Schema::create('recurring_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Relasi ke dompet & kategori
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            
            // Tipe: Pemasukan / Pengeluaran
            $table->enum('type', ['income', 'expense']);
            
            // Jumlah
            $table->decimal('amount', 15, 2);
            
            // Frekuensi (harian, mingguan, bulanan, tahunan)
            $table->enum('frequency', ['daily', 'weekly', 'monthly', 'yearly']);
            
            // Tanggal mulai
            $table->date('start_date');
            
            // Tanggal transaksi berikutnya
            $table->date('next_run_date')->nullable();
            
            // Status aktif/non-aktif
            $table->boolean('is_active')->default(true);
            
            // Catatan
            $table->string('description')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recurring_transactions');
    }
};
