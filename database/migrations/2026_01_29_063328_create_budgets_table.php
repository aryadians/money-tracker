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
    Schema::create('budgets', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('category_id')->constrained()->onDelete('cascade');
        $table->decimal('amount', 15, 2); // Batas anggaran (misal: 2.000.000)
        $table->timestamps();
        
        // Mencegah duplikasi: 1 User hanya boleh punya 1 budget per kategori
        $table->unique(['user_id', 'category_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
