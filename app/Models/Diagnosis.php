<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_user',
        'alamat_user',
        'no_hp_user',
        'jenis_sapi',
        'jenis_kelamin',
        'umur_kategori',
        'penyakit_id',
        'nama_penyakit_snap',
        'cf_final',
        'diagnosis_banding',
        'gejala_input',
    ];

    protected $casts = [
        'cf_final' => 'float',
        'diagnosis_banding' => 'array',
        'gejala_input' => 'array',
    ];

    // Opsi untuk validasi
    public static function getJenisSapi(): array
    {
        return [
            'perah' => 'Sapi Perah',
            'potong' => 'Sapi Potong',
        ];
    }

    public static function getJenisKelamin(): array
    {
        return [
            'jantan' => 'Jantan',
            'betina' => 'Betina',
        ];
    }

    public static function getUmurKategori(): array
    {
        return [
            'pedet' => 'Pedet (0-6 bulan)',
            'muda' => 'Muda (6-24 bulan)',
            'dewasa' => 'Dewasa (>2 tahun)',
        ];
    }

    public function penyakit(): BelongsTo
    {
        return $this->belongsTo(Penyakit::class);
    }

    public function detailDiagnoses(): HasMany
    {
        return $this->hasMany(DetailDiagnosis::class, 'diagnosis_id');
    }
}
