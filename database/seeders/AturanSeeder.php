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
                'catatan_pakar' => 'Gejala umum - demam tinggi pada penyakit ini',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G03'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - air liur berlebih identik dengan PMK',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G04'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - luka pada kuku adalah ciri khas PMK',
            ],
            [
                'penyakit_id' => $penyakits['P01'] ?? null,
                'gejala_id' => $gejalas['G05'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - lepuh pada mulut adalah ciri khas PMK',
            ],

            // P02 - Cacingan
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G06'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - diare dengan bau menyengat khas cacingan',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G07'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - mata berlendir dapat terjadi pada berbagai penyakit',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G08'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - penurunan berat badan dari cacing yang mengambil nutrisi',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G09'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - bulu kusam karena malnutrisi akibat cacingan',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G10'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - bulu rontok akibat gangguan nutrisi',
            ],
            [
                'penyakit_id' => $penyakits['P02'] ?? null,
                'gejala_id' => $gejalas['G11'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - perut buncit adalah ciri khas cacingan berat',
            ],

            // P03 - Mastitis (radang ambing)
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - demam tinggi pada inflamasi',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - terlihat lemas dan lesu',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G13'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - produksi susu berkurang pada mastitis',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G14'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - pembengkakan ambing adalah ciri utama mastitis',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G15'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - susu menggumpal menunjukkan infeksi pada ambing',
            ],
            [
                'penyakit_id' => $penyakits['P03'] ?? null,
                'gejala_id' => $gejalas['G16'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - susu bercampur nanah/darah adalah ciri khas mastitis',
            ],

            // P04 - Demam Tiga Hari (Bovine Ephemeral Fever)
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - demam tinggi adalah ciri awal penyakit',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - terlihat lemas dan lesu',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G17'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - tidak gayemi adalah tanda penyakit viral akut',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G18'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - sapi lebih banyak berbaring saat demam',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G19'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - kepincangan akibat arthritis transien',
            ],
            [
                'penyakit_id' => $penyakits['P04'] ?? null,
                'gejala_id' => $gejalas['G20'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - keluar lendir dari hidung/mulut pada penyakit viral',
            ],

            // P05 - Scabies / Kudis (Gudig)
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G10'] ?? null,
                'nilai_mb' => 0.5,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - bulu rontok akibat garukan tungau',
            ],
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G21'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - kulit menebal dengan keropeng adalah ciri khas scabies',
            ],
            [
                'penyakit_id' => $penyakits['P05'] ?? null,
                'gejala_id' => $gejalas['G22'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - gatal-gatal dapat terjadi pada berbagai penyakit kulit',
            ],

            // P06 - Penyakit Lato-Lato (Lumpy Skin Disease)
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - demam tinggi pada awal infeksi',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - terlihat lemas dan lesu',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G23'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - benjol pada kulit adalah ciri utama Lato-lato',
            ],
            [
                'penyakit_id' => $penyakits['P06'] ?? null,
                'gejala_id' => $gejalas['G24'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - pembengkakan kaki dan limfonodi pada Lumpy Skin Disease',
            ],

            // P07 - Perut Kembung (Bloat)
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - terlihat lemas dan lesu',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G25'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - tidak gayemi saat perut kembung',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G26'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - sembelit adalah tanda bloat',
            ],
            [
                'penyakit_id' => $penyakits['P07'] ?? null,
                'gejala_id' => $gejalas['G27'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - pembesaran perut sebelah kiri adalah ciri khas bloat',
            ],

            // P08 - Endometritis
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - demam tinggi pada infeksi',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G12'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - terlihat lemas dan lesu',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G28'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - nanah dari vulva menunjukkan endometritis',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G29'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - penurunan produksi susu pada endometritis',
            ],
            [
                'penyakit_id' => $penyakits['P08'] ?? null,
                'gejala_id' => $gejalas['G30'] ?? null,
                'nilai_mb' => 0.9,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala sangat spesifik - lendir putih kekuningan dari vulva adalah ciri khas endometritis',
            ],

            // P09 - Hipokalsemia (Milk Fever Disease)
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G08'] ?? null,
                'nilai_mb' => 0.4,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - penurunan berat badan pada hipokalsemia',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G31'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - lemas dan lesu pada defisiensi mineral',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G32'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - ambruk adalah tanda parah hipokalsemia',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G33'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Kondisi risiko - hipokalsemia terjadi pada sapi bunting/menyusui',
            ],
            [
                'penyakit_id' => $penyakits['P09'] ?? null,
                'gejala_id' => $gejalas['G34'] ?? null,
                'nilai_mb' => 0.6,
                'nilai_md' => 0,
                'catatan_pakar' => 'Kondisi risiko - sapi multifara lebih rentan hipokalsemia',
            ],

            // P10 - Omphalitis (Radang Pusar)
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G01'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - demam tinggi pada infeksi pusar',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G02'] ?? null,
                'nilai_mb' => 0.2,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala umum - nafsu makan berkurang',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G35'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - bengkak pada pusar adalah tanda omphalitis',
            ],
            [
                'penyakit_id' => $penyakits['P10'] ?? null,
                'gejala_id' => $gejalas['G36'] ?? null,
                'nilai_mb' => 0.8,
                'nilai_md' => 0,
                'catatan_pakar' => 'Gejala spesifik - nanah pada pusar adalah ciri khas omphalitis',
            ],
        ];

        foreach ($aturans as $aturan) {
            if ($aturan['penyakit_id'] && $aturan['gejala_id']) {
                Aturan::create($aturan);
            }
        }
    }
}
