<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // Pemilik Transaksi
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Link ke Dompet & Kategori
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');

            // Detail Transaksi
            // 'transfer' kita siapkan untuk fitur pindah saldo antar dompet
            $table->enum('type', ['income', 'expense', 'transfer']);
            $table->decimal('amount', 15, 2);
            $table->date('transaction_date');
            $table->text('description')->nullable(); // Catatan user

            // Fitur Struk / Foto
            $table->string('receipt_image')->nullable(); // Path file upload

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
