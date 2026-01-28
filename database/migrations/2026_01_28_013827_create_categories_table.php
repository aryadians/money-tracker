<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            // User ID bisa NULL. Jika NULL, berarti ini kategori bawaan sistem (Global)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

            $table->string('name'); // Contoh: Makanan, Gaji, Listrik
            $table->enum('type', ['income', 'expense']);

            // UI 3D & Visual
            $table->string('icon_name')->nullable(); // Nama file icon 3D nanti
            $table->string('color_hex')->default('#cccccc');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
