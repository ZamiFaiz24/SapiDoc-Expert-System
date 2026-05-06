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
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->string('jenis_sapi')->after('no_hp_user');
            $table->string('jenis_kelamin')->after('jenis_sapi');
            $table->string('umur_kategori')->after('jenis_kelamin');
        });
    }

    public function down(): void
    {
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->dropColumn(['jenis_sapi', 'jenis_kelamin', 'umur_kategori']);
        });
    }
};
