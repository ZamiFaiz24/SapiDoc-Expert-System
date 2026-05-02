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
        Schema::create('basis_pengetahuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penyakit_id')->constrained('penyakits')->cascadeOnDelete();
            $table->foreignId('gejala_id')->constrained('gejalas')->cascadeOnDelete();
            $table->double('nilai_mb');
            $table->double('nilai_md');
            $table->text('catatan_pakar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basis_pengetahuans');
    }
};
