<?php

namespace Database\Seeders;

use App\Models\Gejala;
use App\Models\Diagnosis;
use App\Services\InferensiService;
use Illuminate\Database\Seeder;

class DiagnosisPakarSeeder extends Seeder
{
    protected $inferensiService;

    public function __construct(InferensiService $inferensiService)
    {
        $this->inferensiService = $inferensiService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Diagnosis::query()->delete();

        // 30 Data Uji Rekam Medis Pakar dengan Karakteristik Sapi yang Sesuai
        $dataUjiKasus = [
            // === PENYAKIT MULUT DAN KUKU (PMK) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 01 (PMK)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G04', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 02 (PMK)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 1.0],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G03', 'cf_user' => 0.6],
                    ['kode' => 'G05', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 03 (PMK)',
                'jenis_sapi' => 'Sapi Limousin',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 1.0],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G03', 'cf_user' => 0.8],
                    ['kode' => 'G04', 'cf_user' => 0.6],
                    ['kode' => 'G05', 'cf_user' => 1.0],
                ],
            ],

            // === CACINGAN ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 04 (Cacingan)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G06', 'cf_user' => 0.8],
                    ['kode' => 'G11', 'cf_user' => 0.4],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 05 (Cacingan)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'pedet',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G07', 'cf_user' => 0.6],
                    ['kode' => 'G08', 'cf_user' => 0.8],
                    ['kode' => 'G09', 'cf_user' => 0.6],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 06 (Cacingan)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G07', 'cf_user' => 0.4],
                    ['kode' => 'G08', 'cf_user' => 0.8],
                    ['kode' => 'G09', 'cf_user' => 0.8],
                    ['kode' => 'G11', 'cf_user' => 0.6],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 07 (Cacingan)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G09', 'cf_user' => 0.6],
                    ['kode' => 'G10', 'cf_user' => 0.8],
                    ['kode' => 'G11', 'cf_user' => 1.0],
                ],
            ],

            // === MASTITIS (Hanya menyerang Betina Dewasa) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 08 (Mastitis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G14', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 09 (Mastitis)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.6],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G13', 'cf_user' => 1.0],
                    ['kode' => 'G15', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 10 (Mastitis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G14', 'cf_user' => 0.8],
                    ['kode' => 'G16', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 11 (Mastitis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.6],
                    ['kode' => 'G13', 'cf_user' => 0.8],
                    ['kode' => 'G15', 'cf_user' => 0.6],
                    ['kode' => 'G16', 'cf_user' => 0.8],
                ],
            ],

            // === BOVINE EPHEMERAL FEVER (BEF) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 12 (BEF)',
                'jenis_sapi' => 'Sapi Limousin',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 1.0],
                    ['kode' => 'G12', 'cf_user' => 0.8],
                    ['kode' => 'G19', 'cf_user' => 0.6],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 13 (BEF)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G17', 'cf_user' => 0.8],
                    ['kode' => 'G18', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 14 (BEF)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G18', 'cf_user' => 0.8],
                    ['kode' => 'G19', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 15 (BEF)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 1.0],
                    ['kode' => 'G12', 'cf_user' => 0.8],
                    ['kode' => 'G17', 'cf_user' => 0.6],
                    ['kode' => 'G19', 'cf_user' => 0.6],
                    ['kode' => 'G20', 'cf_user' => 0.8],
                ],
            ],

            // === SCABIES / GUDIG ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 16 (Scabies)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G22', 'cf_user' => 1.0],
                    ['kode' => 'G10', 'cf_user' => 0.8],
                    ['kode' => 'G21', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 17 (Scabies)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'pedet',
                'gejala' => [
                    ['kode' => 'G22', 'cf_user' => 0.6],
                    ['kode' => 'G10', 'cf_user' => 0.4],
                    ['kode' => 'G21', 'cf_user' => 0.6],
                ],
            ],

            // === LUMPY SKIN DISEASE (LSD) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 18 (LSD)',
                'jenis_sapi' => 'Sapi Limousin',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G23', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 19 (LSD)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G23', 'cf_user' => 0.8],
                    ['kode' => 'G24', 'cf_user' => 0.6],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 20 (LSD)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 1.0],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.8],
                    ['kode' => 'G23', 'cf_user' => 1.0],
                    ['kode' => 'G24', 'cf_user' => 0.8],
                ],
            ],

            // === BLOAT / KEMBUNG ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 21 (Bloat)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G12', 'cf_user' => 0.4],
                    ['kode' => 'G26', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 22 (Bloat)',
                'jenis_sapi' => 'Sapi Limousin',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G17', 'cf_user' => 0.8],
                    ['kode' => 'G26', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 23 (Bloat)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'muda',
                'gejala' => [
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G17', 'cf_user' => 0.8],
                    ['kode' => 'G25', 'cf_user' => 0.4],
                    ['kode' => 'G26', 'cf_user' => 1.0],
                ],
            ],

            // === ENDOMETRITIS (Hanya menyerang Betina Dewasa) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 24 (Endometritis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.6],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G28', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 25 (Endometritis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G27', 'cf_user' => 1.0],
                    ['kode' => 'G13', 'cf_user' => 0.8],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 26 (Endometritis)',
                'jenis_sapi' => 'Sapi Simental',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G27', 'cf_user' => 0.8],
                    ['kode' => 'G28', 'cf_user' => 0.6],
                ],
            ],

            // === HIPOKALSEMIA (Hanya menyerang Betina Dewasa) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 27 (Hipokalsemia)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G12', 'cf_user' => 0.8],
                    ['kode' => 'G29', 'cf_user' => 1.0],
                    ['kode' => 'G30', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 28 (Hipokalsemia)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'dewasa',
                'gejala' => [
                    ['kode' => 'G08', 'cf_user' => 0.6],
                    ['kode' => 'G12', 'cf_user' => 0.8],
                    ['kode' => 'G29', 'cf_user' => 1.0],
                    ['kode' => 'G31', 'cf_user' => 1.0],
                ],
            ],

            // === OMPHALITIS (Biasanya menyerang Pedet/Anak Sapi) ===
            [
                'nama_user' => 'Data Uji Pakar Kasus 29 (Omphalitis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'jantan',
                'umur_kategori' => 'pedet',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.6],
                    ['kode' => 'G32', 'cf_user' => 1.0],
                ],
            ],
            [
                'nama_user' => 'Data Uji Pakar Kasus 30 (Omphalitis)',
                'jenis_sapi' => 'Sapi PO',
                'jenis_kelamin' => 'betina',
                'umur_kategori' => 'pedet',
                'gejala' => [
                    ['kode' => 'G01', 'cf_user' => 0.8],
                    ['kode' => 'G02', 'cf_user' => 0.8],
                    ['kode' => 'G12', 'cf_user' => 0.6],
                    ['kode' => 'G32', 'cf_user' => 1.0],
                    ['kode' => 'G33', 'cf_user' => 0.8],
                ],
            ],
        ];

        // Ambil mapping master kode gejala ke ID tabel
        $mapGejala = Gejala::pluck('id', 'kode_gejala')->toArray();

        foreach ($dataUjiKasus as $kasus) {
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

            // Hitung menggunakan service utama agar hasil diagnosis_banding & cf_final ter-generate otomatis
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

            // Simpan atau update ke database (Aman dari Duplikasi)
            Diagnosis::updateOrCreate(
                [
                    'nama_user' => $kasus['nama_user'],
                ],
                [
                    'alamat_user' => 'Alamat Pengujian Pakar',
                    'no_hp_user' => '081234567890',
                    'jenis_sapi' => $kasus['jenis_sapi'],
                    'jenis_kelamin' => $kasus['jenis_kelamin'],
                    'umur_kategori' => $kasus['umur_kategori'],
                    'penyakit_id' => $diagnosisUtama['penyakit_id'],
                    'nama_penyakit_snap' => $diagnosisUtama['nama_penyakit'],
                    'cf_final' => $diagnosisUtama['cf'],
                    'diagnosis_banding' => $diagnosisBanding,
                    'gejala_input' => $gejalaInput,
                ]
            );
        }
    }
}
