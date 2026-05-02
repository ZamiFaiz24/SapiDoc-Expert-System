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
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->string('nama_user');
            $table->string('alamat_user');
            $table->string('no_hp_user');
            $table->foreignId('penyakit_id')->constrained('penyakits')->cascadeOnDelete();
            $table->string('nama_penyakit_snap');
            $table->double('cf_final');
            $table->json('diagnosis_banding');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};
