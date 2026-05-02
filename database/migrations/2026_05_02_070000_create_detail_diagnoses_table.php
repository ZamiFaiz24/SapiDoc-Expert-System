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
        Schema::create('detail_diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('diagnosis_id')->constrained('diagnoses')->cascadeOnDelete();
            $table->foreignId('gejala_id')->constrained('gejalas')->cascadeOnDelete();
            $table->string('nama_gejala_snap');
            $table->double('cf_user');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_diagnoses');
    }
};
