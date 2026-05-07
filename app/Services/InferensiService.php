<?php

namespace App\Services;

use App\Models\Aturan;
use App\Models\Gejala;
use App\Models\Penyakit;

class InferensiService
{
    /**
     * Forward Chaining - dari gejala yang diamati + tingkat keparahan, cari penyakit
     * 
     * Proses:
     * 1. User input gejala yang diamati + CF_user (tingkat keparahan 0-1)
     * 2. Cari semua aturan (basis pengetahuan) yang match dengan gejala tersebut
     * 3. Hitung Certainty Factor (CF) untuk setiap penyakit
     *    CF = (MB - MD) × CF_user
     * 4. Kombinasi CF dari multiple gejala
     * 5. Urutkan berdasarkan CF tertinggi
     * 
     * @param array $gejala_dengan_cf Format: [
     *     ['gejala_id' => 1, 'cf_user' => 0.8],
     *     ['gejala_id' => 2, 'cf_user' => 0.6],
     * ]
     * Atau untuk backward compatibility: [1, 2, 3] (default CF_user = 1.0)
     */
    public function inferensi(array $gejalaDenganCf): array
    {
        // Normalize input: jika array gejala_id biasa, convert ke format baru
        $gejalaNormalized = $this->normalizeGejalaInput($gejalaDenganCf);

        // Array untuk menyimpan CF setiap penyakit
        $cfPenyakit = [];

        // Step 1: Ambil semua aturan yang sesuai dengan gejala yang diamati
        $gejalanIds = array_column($gejalaNormalized, 'gejala_id');
        $aturanGrouped = Aturan::whereIn('gejala_id', $gejalanIds)
            ->with(['penyakit', 'gejala'])
            ->get()
            ->groupBy('penyakit_id');

        // Step 2: Hitung CF untuk setiap penyakit
        foreach ($aturanGrouped as $penyakitId => $aturanPenyakit) {
            $cfPenyakit[$penyakitId] = $this->hitungCFPenyakit($aturanPenyakit, $gejalaNormalized);
        }

        // Step 3: Urutkan berdasarkan CF tertinggi
        arsort($cfPenyakit);

        // Step 4: Format hasil dengan detail penyakit
        $hasil = [];
        foreach ($cfPenyakit as $penyakitId => $cf) {
            $penyakits = Penyakit::whereIn('id', array_keys($cfPenyakit))
                ->get()
                ->keyBy('id');
            $penyakit = $penyakits[$penyakitId];
            $hasil[] = [
                'penyakit_id' => $penyakitId,
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
     * Normalize input gejala untuk memastikan format konsisten
     */
    private function normalizeGejalaInput(array $input): array
    {
        $normalized = [];

        foreach ($input as $item) {
            if (is_array($item)) {
                // Format baru: ['gejala_id' => 1, 'cf_user' => 0.8]
                $normalized[] = [
                    'gejala_id' => $item['gejala_id'],
                    'cf_user' => $item['cf_user'] ?? 1.0,
                ];
            } else {
                // Format lama: hanya gejala_id (backward compatibility)
                $normalized[] = [
                    'gejala_id' => $item,
                    'cf_user' => 1.0, // Default maksimal confidence
                ];
            }
        }

        return $normalized;
    }

    /**
     * Hitung CF untuk satu penyakit dari multiple gejala
     * 
     * Formula Certainty Factor dengan User Confidence:
     * - CF_expert = MB(A|B) - MD(A|B)
     * - CF_combined = CF_expert × CF_user
     * - Jika multiple gejala: CF_final = CF_lama + CF_gejala × (1 - CF_lama)
     * 
     * @param $rules Koleksi aturan untuk penyakit
     * @param array $gejalas_normalized Gejala dengan CF dari user
     */
    private function hitungCFPenyakit($aturanPenyakit, array $gejalaNormalized): float
    {
        // Mapping CF user: [gejala_id => cf_user]
        $cfUserMap = collect($gejalaNormalized)
            ->pluck('cf_user', 'gejala_id')
            ->toArray();

        $cfCombined = 0.0;

        foreach ($aturanPenyakit as $aturanItem) {
            // CF dari pakar (MB - MD)
            $cfExpert = $aturanItem->nilai_mb - $aturanItem->nilai_md;

            // Ambil CF dari user (default 0 jika tidak ada)
            $cfUser = $cfUserMap[$aturanItem->gejala_id] ?? 0.0;

            // CF untuk gejala ini
            $cfGejala = $cfExpert * $cfUser;

            // Skip kalau tidak ada kontribusi
            if ($cfGejala == 0) {
                continue;
            }

            // Kombinasi CF (incremental)
            $cfCombined = ($cfCombined == 0)
                ? $cfGejala
                : $cfCombined + ($cfGejala * (1 - $cfCombined));
        }

        // Clamp hasil antara 0 - 1
        return max(0.0, min(1.0, $cfCombined));
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
     * Detail diagnosis - lihat gejala mana saja yang cocok dengan CF breakdown
     * 
     * @param array $gejala_dengan_cf Format: [
     *     ['gejala_id' => 1, 'cf_user' => 0.8],
     *     ['gejala_id' => 2, 'cf_user' => 0.6],
     * ]
     */
    public function detailDiagnosis(array $gejalaDenganCf, int $penyakitId): array
    {
        // Normalize input
        $gejalaNormalized = $this->normalizeGejalaInput($gejalaDenganCf);

        // Buat map CF user per gejala
        $cfUserMap = [];
        foreach ($gejalaNormalized as $item) {
            $cfUserMap[$item['gejala_id']] = $item['cf_user'];
        }

        // Ambil aturan untuk penyakit ini
        $gejalanIds = array_column($gejalaNormalized, 'gejala_id');
        $aturanList = Aturan::where('penyakit_id', $penyakitId)
            ->whereIn('gejala_id', $gejalanIds)
            ->with(['gejala'])
            ->get();

        $detail = [];
        $cfCombined = 0;

        foreach ($aturanList as $aturanItem) {
            // CF expert
            $cfExpert = $aturanItem->nilai_mb - $aturanItem->nilai_md;

            // CF user
            $cfUser = $cfUserMap[$aturanItem->gejala_id] ?? 0;

            // CF combined (expert × user)
            $cfGejala = $cfExpert * $cfUser;

            // Update combined CF
            if ($cfCombined == 0) {
                $cfCombined = $cfGejala;
            } else {
                $cfCombined = $cfCombined + $cfGejala * (1 - $cfCombined);
            }

            $detail[] = [
                'gejala' => $aturanItem->gejala->nama_gejala,
                'kode_gejala' => $aturanItem->gejala->kode_gejala,
                'nilai_mb' => $aturanItem->nilai_mb,
                'nilai_md' => $aturanItem->nilai_md,
                'cf_expert' => round($cfExpert, 4),
                'cf_user' => round($cfUser, 4),
                'cf_gejala' => round($cfGejala, 4),
                'cf_combined' => round($cfCombined, 4),
                'catatan_pakar' => $aturanItem->catatan_pakar,
            ];
        }

        return [
            'total_gejala_cocok' => count($detail),
            'cf_final' => round($cfCombined, 4),
            'detail_gejala' => $detail,
        ];
    }

    /**
     * Dapatkan semua gejala untuk penyakit tertentu
     */
    public function getGejalaUntuPenyakit(int $penyakitId): array
    {
        return Aturan::where('penyakit_id', $penyakitId)
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

    /**
     * Sugesti gejala berdasarkan gejala yang sudah dipilih (FC partial)
     * Digunakan untuk guided diagnosis - suggest gejala spesifik yang kemungkinan besar cocok
     */
    public function suggestGejala(array $gejalaDenganCf): array
    {
        // Run FC partial dengan gejala yang dipilih
        $diagnosisPartial = $this->inferensi($gejalaDenganCf);

        if (empty($diagnosisPartial)) {
            return [];
        }

        // Ambil top 3 penyakit berdasarkan CF
        $topPenyakitIds = array_map(fn($d) => $d['penyakit_id'], array_slice($diagnosisPartial, 0, 3));
        $selectedGejalaIds = array_column($gejalaDenganCf, 'gejala_id');

        // Dapatkan semua gejala yang linked ke top penyakit, exclude yang sudah dipilih
        $suggestedGejalas = Aturan::whereIn('penyakit_id', $topPenyakitIds)
            ->whereNotIn('gejala_id', $selectedGejalaIds)
            ->with(['gejala'])
            ->get()
            ->groupBy('gejala_id')
            ->map(function ($aturanGroup) {
                // Filter hanya gejala spesifik
                $gejala = $aturanGroup->first()->gejala;
                if ($gejala->kategori !== 'Gejala Spesifik') {
                    return null;
                }

                // Hitung rata-rata CF expert untuk gejala ini
                $avgMb = $aturanGroup->avg('nilai_mb');
                $avgMd = $aturanGroup->avg('nilai_md');
                $cfExpert = round($avgMb - $avgMd, 4);

                return [
                    'id' => $gejala->id,
                    'kode_gejala' => $gejala->kode_gejala,
                    'nama_gejala' => $gejala->nama_gejala,
                    'kategori' => $gejala->kategori,
                    'cf_score' => $cfExpert, // Expert confidence (MB - MD)
                ];
            })
            ->filter() // Remove null values
            ->sortByDesc('cf_score')
            ->values()
            ->take(5) // Max 5 suggestions
            ->toArray();

        return $suggestedGejalas;
    }
}
