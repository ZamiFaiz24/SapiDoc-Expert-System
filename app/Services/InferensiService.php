<?php

namespace App\Services;

use App\Models\Aturan;
use App\Models\Gejala;
use App\Models\Penyakit;

class InferensiService
{
    /**
     * Forward Chaining - dari gejala yang diamati, cari penyakit yang mungkin
     * 
     * Proses:
     * 1. User input gejala yang diamati
     * 2. Cari semua aturan (basis pengetahuan) yang match dengan gejala tersebut
     * 3. Hitung Certainty Factor (CF) untuk setiap penyakit
     * 4. Urutkan berdasarkan CF tertinggi
     */
    public function inferensi(array $gejala_ids): array
    {
        // Array untuk menyimpan CF setiap penyakit
        $cf_penyakits = [];

        // Step 1: Ambil semua aturan yang sesuai dengan gejala yang diamati
        $aturans = Aturan::whereIn('gejala_id', $gejala_ids)
            ->with(['penyakit', 'gejala'])
            ->get()
            ->groupBy('penyakit_id');

        // Step 2: Hitung CF untuk setiap penyakit
        foreach ($aturans as $penyakit_id => $rules) {
            $cf_penyakits[$penyakit_id] = $this->hitungCFPenyakit($rules);
        }

        // Step 3: Urutkan berdasarkan CF tertinggi
        arsort($cf_penyakits);

        // Step 4: Format hasil dengan detail penyakit
        $hasil = [];
        foreach ($cf_penyakits as $penyakit_id => $cf) {
            $penyakit = Penyakit::find($penyakit_id);
            $hasil[] = [
                'penyakit_id' => $penyakit_id,
                'nama_penyakit' => $penyakit->nama_penyakit,
                'kode_penyakit' => $penyakit->kode_penyakit,
                'cf' => round($cf, 4),
                'presentase' => round($cf * 100, 2) . '%',
                'kesimpulan' => $this->getKesimpulan($cf),
            ];
        }

        return $hasil;
    }

    /**
     * Hitung CF untuk satu penyakit dari multiple gejala
     * Formula Certainty Factor:
     * - CF(A|B) = MB(A|B) - MD(A|B)
     * - Jika multiple gejala: CF_baru = CF_lama + CF_gejala × (1 - CF_lama)
     */
    private function hitungCFPenyakit($rules): float
    {
        $cf_combined = 0;

        foreach ($rules as $rule) {
            // CF untuk rule ini
            $cf_rule = $rule->nilai_mb - $rule->nilai_md;

            // Kombinasi dengan CF sebelumnya
            if ($cf_combined == 0) {
                $cf_combined = $cf_rule;
            } else {
                // Formula: CF_baru = CF_lama + CF_gejala × (1 - CF_lama)
                $cf_combined = $cf_combined + $cf_rule * (1 - $cf_combined);
            }
        }

        return max(0, min(1, $cf_combined)); // Pastikan hasil antara 0-1
    }

    /**
     * Tentukan kesimpulan berdasarkan nilai CF
     */
    private function getKesimpulan(float $cf): string
    {
        if ($cf >= 0.8) {
            return 'Sangat Mungkin (Konfiden Tinggi)';
        } elseif ($cf >= 0.6) {
            return 'Mungkin (Konfiden Sedang)';
        } elseif ($cf >= 0.4) {
            return 'Cukup Mungkin (Konfiden Rendah)';
        } else {
            return 'Tidak Mungkin (Konfiden Sangat Rendah)';
        }
    }

    /**
     * Detail diagnosis - lihat gejala mana saja yang cocok
     */
    public function detailDiagnosis(array $gejala_ids, int $penyakit_id): array
    {
        $aturans = Aturan::where('penyakit_id', $penyakit_id)
            ->whereIn('gejala_id', $gejala_ids)
            ->with(['gejala'])
            ->get();

        $detail = [];
        $cf_combined = 0;

        foreach ($aturans as $aturan) {
            $cf_rule = $aturan->nilai_mb - $aturan->nilai_md;

            if ($cf_combined == 0) {
                $cf_combined = $cf_rule;
            } else {
                $cf_combined = $cf_combined + $cf_rule * (1 - $cf_combined);
            }

            $detail[] = [
                'gejala' => $aturan->gejala->nama_gejala,
                'nilai_mb' => $aturan->nilai_mb,
                'nilai_md' => $aturan->nilai_md,
                'cf_rule' => round($cf_rule, 4),
                'cf_combined' => round($cf_combined, 4),
                'catatan_pakar' => $aturan->catatan_pakar,
            ];
        }

        return [
            'total_gejala_cocok' => count($detail),
            'cf_final' => round($cf_combined, 4),
            'detail_gejala' => $detail,
        ];
    }

    /**
     * Dapatkan semua gejala untuk penyakit tertentu
     */
    public function getGejalaUntuPenyakit(int $penyakit_id): array
    {
        return Aturan::where('penyakit_id', $penyakit_id)
            ->with(['gejala'])
            ->get()
            ->map(function ($aturan) {
                return [
                    'gejala_id' => $aturan->gejala_id,
                    'nama_gejala' => $aturan->gejala->nama_gejala,
                    'kategori' => $aturan->gejala->kategori,
                    'nilai_mb' => $aturan->nilai_mb,
                    'catatan_pakar' => $aturan->catatan_pakar,
                ];
            })
            ->toArray();
    }
}
