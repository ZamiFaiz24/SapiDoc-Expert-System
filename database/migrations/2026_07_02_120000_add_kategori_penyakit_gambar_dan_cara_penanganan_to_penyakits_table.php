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
        Schema::table('penyakits', function (Blueprint $table) {
            $table->string('kategori_penyakit')->nullable()->after('kode_penyakit');
            $table->string('gambar')->nullable()->after('kategori_penyakit');
            $table->text('penanganan_awal')->nullable()->after('deskripsi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penyakits', function (Blueprint $table) {
            $table->dropColumn(['kategori_penyakit', 'gambar', 'penanganan_awal']);
        });
    }
};
