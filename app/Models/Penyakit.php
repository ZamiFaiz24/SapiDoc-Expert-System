<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Penyakit extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_penyakit',
        'kategori_penyakit',
        'gambar',
        'nama_penyakit',
        'deskripsi',
        'penanganan_awal',
    ];

    public function aturans(): HasMany
    {
        return $this->hasMany(Aturan::class, 'penyakit_id');
    }

    public function diagnoses(): HasMany
    {
        return $this->hasMany(Diagnosis::class, 'penyakit_id');
    }
}
