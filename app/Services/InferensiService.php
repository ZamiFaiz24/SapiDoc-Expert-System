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
    public function inferensi(array $gejala_dengan_cf): array
    {
        // Normalize input: jika array gejala_id biasa, convert ke format baru
        $gejalas_normalized = $this->normalizeGejalaInput($gejala_dengan_cf);

        // Array untuk menyimpan CF setiap penyakit
        $cf_penyakits = [];

        // Step 1: Ambil semua aturan yang sesuai dengan gejala yang diamati
        $gejala_ids = array_column($gejalas_normalized, 'gejala_id');
        $aturans = Aturan::whereIn('gejala_id', $gejala_ids)
            ->with(['penyakit', 'gejala'])
            ->get()
            ->groupBy('penyakit_id');

        // Step 2: Hitung CF untuk setiap penyakit
        foreach ($aturans as $penyakit_id => $rules) {
            $cf_penyakits[$penyakit_id] = $this->hitungCFPenyakit($rules, $gejalas_normalized);
        }

        // Step 3: Urutkan berdasarkan CF tertinggi
        arsort($cf_penyakits);

        // Step 4: Format hasil dengan detail penyakit
        $hasil = [];
        foreach ($cf_penyakits as $penyakit_id => $cf) {
            $penyakits = Penyakit::whereIn('id', array_keys($cf_penyakits))
                ->get()
                ->keyBy('id');
            $penyakit = $penyakits[$penyakit_id];
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
    private function hitungCFPenyakit($rules, array $gejalas_normalized): float
    {
        // Mapping CF user: [gejala_id => cf_user]
        $cfUserMap = collect($gejalas_normalized)
            ->pluck('cf_user', 'gejala_id')
            ->toArray();

        $cfCombined = 0.0;

        foreach ($rules as $rule) {
            // CF dari pakar (MB - MD)
            $cfExpert = $rule->nilai_mb - $rule->nilai_md;

            // Ambil CF dari user (default 0 jika tidak ada)
            $cfUser = $cfUserMap[$rule->gejala_id] ?? 0.0;

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
    public function detailDiagnosis(array $gejala_dengan_cf, int $penyakit_id): array
    {
        // Normalize input
        $gejalas_normalized = $this->normalizeGejalaInput($gejala_dengan_cf);

        // Buat map CF user per gejala
        $cf_user_map = [];
        foreach ($gejalas_normalized as $item) {
            $cf_user_map[$item['gejala_id']] = $item['cf_user'];
        }

        // Ambil aturan untuk penyakit ini
        $gejala_ids = array_column($gejalas_normalized, 'gejala_id');
        $aturans = Aturan::where('penyakit_id', $penyakit_id)
            ->whereIn('gejala_id', $gejala_ids)
            ->with(['gejala'])
            ->get();

        $detail = [];
        $cf_combined = 0;

        foreach ($aturans as $aturan) {
            // CF expert
            $cf_expert = $aturan->nilai_mb - $aturan->nilai_md;

            // CF user
            $cf_user = $cf_user_map[$aturan->gejala_id] ?? 0;

            // CF combined (expert × user)
            $cf_gejala = $cf_expert * $cf_user;

            // Update combined CF
            if ($cf_combined == 0) {
                $cf_combined = $cf_gejala;
            } else {
                $cf_combined = $cf_combined + $cf_gejala * (1 - $cf_combined);
            }

            $detail[] = [
                'gejala' => $aturan->gejala->nama_gejala,
                'kode_gejala' => $aturan->gejala->kode_gejala,
                'nilai_mb' => $aturan->nilai_mb,
                'nilai_md' => $aturan->nilai_md,
                'cf_expert' => round($cf_expert, 4),
                'cf_user' => round($cf_user, 4),
                'cf_gejala' => round($cf_gejala, 4),
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
