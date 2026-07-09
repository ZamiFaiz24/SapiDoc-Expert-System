<?php

namespace Database\Seeders;

use App\Models\Gejala;
use App\Models\Penyakit;
use App\Models\Diagnosis;
use App\Services\InferensiService;
use Illuminate\Database\Seeder;

class DiagnosisManualSeeder extends Seeder
{
    protected $inferensiService;

    // Kita tetap inject service untuk menghitung hasil SEBELUM disimpan ke DB
    public function __construct(InferensiService $inferensiService)
    {
        $this->inferensiService = $inferensiService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Definisikan Data Kasus Uji (Nanti tinggal tambah sampai 30 data di sini)
        $dataUjiKasus = [
            [
                'nama_user' => 'Pengujian Manual P01 (Kasus 1)',
                'alamat_user' => 'Petanahan',
                'no_hp_user' => '081234567890',
                'jenis_sapi' => 'po',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G03', 'cf_user' => 0.8],
                    ['kode' => 'G04', 'cf_user' => 0.8],
                    ['kode' => 'G05', 'cf_user' => 1.0],
                ],
            ],
            // Kamu bisa tambah array kasus [Kasus 2], [Kasus 3] dst di bawah sini...
        ];

        // Ambil mapping kode_gejala ke id master
        $mapGejala = Gejala::select('id', 'kode_gejala')->pluck('id', 'kode_gejala')->toArray();

        foreach ($dataUjiKasus as $kasus) {
            // 2. Format ulang input gejala untuk mesin inferensi
            $gejalaInput = [];
            foreach ($kasus['gejala'] as $g) {
                $gejalaId = $mapGejala[$g['kode']] ?? null;
                if ($gejalaId) {
                    $gejalaInput[] = [
                        'gejala_id' => $gejalaId,
                        'cf_user' => $g['cf_user']
                    ];
                }
            }

            if (empty($gejalaInput)) {
                continue;
            }

            // 3. Hitung diagnosis lewat service agar hasilnya akurat sesuai algoritma sistem
            $hasilInferensi = $this->inferensiService->inferensi($gejalaInput);

            if (empty($hasilInferensi)) {
                continue;
            }

            $diagnosisUtama = $hasilInferensi[0];
            $diagnosisBanding = array_map(function ($item) {
                return [
                    'penyakit_id' => $item['penyakit_id'],
                    'nama_penyakit' => $item['nama_penyakit'],
                    'cf_score' => $item['cf'],
                ];
            }, array_slice($hasilInferensi, 1, 5));

            // 4. INSERT KASUS KE DATABASE TABEL DIAGNOSES
            Diagnosis::create([
                'nama_user' => $kasus['nama_user'],
                'alamat_user' => $kasus['alamat_user'],
                'no_hp_user' => $kasus['no_hp_user'],
                'jenis_sapi' => $kasus['jenis_sapi'],
                'jenis_kelamin' => $kasus['jenis_kelamin'],
                'umur_kategori' => $kasus['umur_kategori'],
                'penyakit_id' => $diagnosisUtama['penyakit_id'],
                'nama_penyakit_snap' => $diagnosisUtama['nama_penyakit'],
                'cf_final' => $diagnosisUtama['cf'],
                'diagnosis_banding' => $diagnosisBanding,
                'gejala_input' => $gejalaInput, // Tersimpan sebagai JSON cast di model
            ]);
        }
    }
}
