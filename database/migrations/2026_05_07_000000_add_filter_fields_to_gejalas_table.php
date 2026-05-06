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
        Schema::table('gejalas', function (Blueprint $table) {
            // Filter berdasarkan jenis kelamin
            // jantan, betina, all (untuk gejala umum)
            $table->string('jenis_kelamin')->default('all')->after('kategori');

            // Filter berdasarkan kategori umur
            // pedet, muda, dewasa, all (untuk gejala umum)
            $table->string('umur_kategori')->default('all')->after('jenis_kelamin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gejalas', function (Blueprint $table) {
            $table->dropColumn(['jenis_kelamin', 'umur_kategori']);
        });
    }
};
