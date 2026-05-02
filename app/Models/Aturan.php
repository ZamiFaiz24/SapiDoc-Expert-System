<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Aturan extends Model
{
    use HasFactory;

    protected $table = 'basis_pengetahuans';

    protected $fillable = [
        'penyakit_id',
        'gejala_id',
        'nilai_mb',
        'nilai_md',
        'catatan_pakar',
    ];

    protected $casts = [
        'nilai_mb' => 'float',
        'nilai_md' => 'float',
    ];

    public function penyakit(): BelongsTo
    {
        return $this->belongsTo(Penyakit::class);
    }

    public function gejala(): BelongsTo
    {
        return $this->belongsTo(Gejala::class);
    }
}
