<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class DetailDiagnosis extends Model
{
    use HasFactory;

    protected $fillable = [
        'diagnosis_id',
        'gejala_id',
        'nama_gejala_snap',
        'cf_user',
    ];

    protected $casts = [
        'cf_user' => 'float',
    ];

    public function diagnosis(): BelongsTo
    {
        return $this->belongsTo(Diagnosis::class);
    }

    public function gejala(): BelongsTo
    {
        return $this->belongsTo(Gejala::class);
    }
}
