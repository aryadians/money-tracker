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
        Schema::create('debts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Nama orang yang berhutang/kita hutangi
            $table->string('person_name');
            
            // Tipe: 'payable' (Kita berhutang), 'receivable' (Orang berhutang ke kita)
            $table->enum('type', ['payable', 'receivable']);
            
            // Jumlah total hutang
            $table->decimal('amount', 15, 2);
            
            // Jumlah yang sudah dibayar (Cicilan)
            $table->decimal('paid_amount', 15, 2)->default(0);
            
            // Tanggal jatuh tempo (opsional)
            $table->date('due_date')->nullable();
            
            // Catatan tambahan
            $table->text('description')->nullable();
            
            // Status lunas
            $table->boolean('is_paid')->default(false);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('debts');
    }
};
