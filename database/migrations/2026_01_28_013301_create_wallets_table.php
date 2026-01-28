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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke User (Milik siapa dompet ini?)
            // onDelete('cascade') berarti jika user dihapus, dompetnya ikut terhapus
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Detail Dompet
            $table->string('name'); // Contoh: "BCA Utama", "Dompet Saku"
            $table->enum('type', ['cash', 'bank', 'ewallet', 'investment', 'credit_card'])->default('cash');
            
            // Keuangan
            $table->decimal('balance', 15, 2)->default(0); // Support angka besar sampai triliunan
            $table->string('currency', 3)->default('IDR'); // Mata uang
            
            // Persiapan UI 3D (Disimpan dari sekarang)
            $table->string('color_hex')->default('#000000'); // Warna kartu/dompet
            $table->string('icon_type')->nullable(); // Identifikasi icon 3D
            
            // Status
            $table->boolean('is_active')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};