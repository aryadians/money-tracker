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
        Schema::create('saving_goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Nama target (misal: "Beli Laptop", "Liburan Bali")
            $table->string('name');
            
            // Jumlah target
            $table->decimal('target_amount', 15, 2);
            
            // Jumlah saat ini
            $table->decimal('current_amount', 15, 2)->default(0);
            
            // Deadline (Opsional)
            $table->date('deadline')->nullable();
            
            // Warna untuk progress bar
            $table->string('color_hex', 7)->default('#3B82F6');
            
            // Catatan
            $table->text('description')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saving_goals');
    }
};
