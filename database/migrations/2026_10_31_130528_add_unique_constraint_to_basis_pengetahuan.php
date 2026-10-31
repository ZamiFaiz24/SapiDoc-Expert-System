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
        Schema::table('basis_pengetahuans', function (Blueprint $table) {
            $table->unique(
                ['penyakit_id', 'gejala_id'],
                'basis_pengetahuan_penyakit_gejala_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('basis_pengetahuans', function (Blueprint $table) {
            $table->dropUnique('basis_pengetahuan_penyakit_gejala_unique');
        });
    }
};
