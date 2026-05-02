<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Gejala extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_gejala',
        'nama_gejala',
        'kategori',
        'keterangan',
    ];

    public function aturans(): HasMany
    {
        return $this->hasMany(Aturan::class, 'gejala_id');
    }

    public function detailDiagnoses(): HasMany
    {
        return $this->hasMany(DetailDiagnosis::class, 'gejala_id');
    }
}
