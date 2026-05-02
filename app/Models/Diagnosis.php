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
        'penyakit_id',
        'nama_penyakit_snap',
        'cf_final',
        'diagnosis_banding',
    ];

    protected $casts = [
        'cf_final' => 'float',
        'diagnosis_banding' => 'array',
    ];

    public function penyakit(): BelongsTo
    {
        return $this->belongsTo(Penyakit::class);
    }

    public function detailDiagnoses(): HasMany
    {
        return $this->hasMany(DetailDiagnosis::class, 'diagnosis_id');
    }
}
