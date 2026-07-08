<?php

namespace Database\Seeders;

use App\Models\Aturan;
use App\Models\Penyakit;
use App\Models\Gejala;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AturanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all diseases and symptoms
        $penyakits = Penyakit::pluck('id', 'kode_penyakit')->toArray();
        $gejalas = Gejala::pluck('id', 'kode_gejala')->toArray();

        $aturans = [
            // P01 - Penyakit Mulut dan Kuku (PMK)
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G03'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G04'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G05'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P02 - Cacingan
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G06'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G07'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G08'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G09'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G10'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G11'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],

            // P03 - Mastitis (radang ambing)
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G13'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G14'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G15'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G16'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P04 - Demam Tiga Hari (Bovine Ephemeral Fever)
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G17'] ?? null, // Sapi tidak gayemi (Sebelumnya G17/G25 duplikat)
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G18'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G19'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G20'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],

            // P05 - Scabies / Kudis (Gudig)
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G10'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G21'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G22'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],

            // P06 - Penyakit Lato-Lato (Lumpy Skin Disease)
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G23'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G24'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P07 - Perut Kembung (Bloat)
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G17'] ?? null, // Sapi tidak gayemi
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G25'] ?? null, // Tidak bisa BAB / feses keras (Sebelumnya G26)
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G26'] ?? null, // Pembesaran perut sebelah kiri (Sebelumnya G27)
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P08 - Endometritis
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G13'] ?? null, // Penurunan produksi susu
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G27'] ?? null, // Keluar nanah dari vulva (Sebelumnya G28)
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G28'] ?? null, // Keluar lendir putih kekuningan (Sebelumnya G30)
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P09 - Hipokalsemia (Milk Fever Disease)
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G08'] ?? null,
                'nilai_mb' => 0.4,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null, // Terlihat lemas dan lesu (Sebelumnya G31 duplikat)
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G29'] ?? null, // Sapi ambruk (Sebelumnya G32)
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G30'] ?? null, // Dalam masa bunting / menyusui (Sebelumnya G33)
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G31'] ?? null, // Sapi sudah beberapa kali melahirkan (Sebelumnya G34)
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],

            // P10 - Omphalitis (Radang Pusar)
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Umum',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G32'] ?? null, // Bengkak pada area pusar (Sebelumnya G35)
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G33'] ?? null, // Bagian pusar bernanah (Sebelumnya G36)
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala Spesifik',
            ],
        ];

        foreach ($aturans as $aturan) {
            if ($aturan['penyakit_id'] && $aturan['gejala_id']) {
                Aturan::updateOrCreate(
                    [
                        'penyakit_id' => $aturan['penyakit_id'],
                        'gejala_id' => $aturan['gejala_id']
                    ],
                    $aturan
                );
            }
        }
    }
}
