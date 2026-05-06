<?php

namespace Database\Seeders;

use App\Models\Penyakit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenyakitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penyakits = [
            [
                'kode_penyakit' => 'P01',
                'nama_penyakit' => 'Penyakit Mulut dan Kuku (PMK)',
                'deskripsi' => 'Penyakit Mulut dan Kuku (PMK) adalah penyakit menular pada ternak berkuku genap seperti sapi yang disebabkan oleh virus dan dapat menyebar dengan cepat.',
            ],
            [
                'kode_penyakit' => 'P02',
                'nama_penyakit' => 'Cacingan',
                'deskripsi' => 'Cacingan adalah penyakit yang disebabkan oleh infestasi cacing pada tubuh ternak, terutama pada saluran pencernaan dan hati. Kondisi ini dapat mengganggu kesehatan serta menurunkan produktivitas sapi.',
            ],
            [
                'kode_penyakit' => 'P03',
                'nama_penyakit' => 'Mastitis (radang ambing)',
                'deskripsi' => 'Mastitis adalah peradangan pada ambing sapi yang disebabkan oleh infeksi bakteri pada kelenjar susu. Penyakit ini dapat mengganggu produksi dan kualitas susu serta sering terjadi dalam bentuk tanpa gejala yang jelas.',
            ],
            [
                'kode_penyakit' => 'P04',
                'nama_penyakit' => 'Demam Tiga Hari (Bovine Ephemeral Fever)',
                'deskripsi' => 'Bovine Ephemeral Fever (BEF) adalah penyakit virus pada sapi yang ditularkan melalui serangga, ditandai dengan demam mendadak dan kekakuan sendi. Penyakit ini umumnya bersifat sementara namun dapat menurunkan produksi dan aktivitas ternak.',
            ],
            [
                'kode_penyakit' => 'P05',
                'nama_penyakit' => 'Scabies / Kudis (Gudig)',
                'deskripsi' => 'Scabies adalah penyakit kulit menular yang disebabkan oleh tungau Sarcoptes scabiei, ditandai dengan gatal, keropeng, dan kerontokan bulu. Penyakit ini dapat menyerang berbagai bagian tubuh ternak dan menyebar dengan cepat.',
            ],
            [
                'kode_penyakit' => 'P06',
                'nama_penyakit' => 'Penyakit Lato-Lato (Lumpy Skin Disease)',
                'deskripsi' => 'Lumpy Skin Disease adalah penyakit virus pada sapi yang ditandai dengan munculnya benjolan pada kulit serta gangguan kesehatan umum. Penyakit ini dapat menurunkan produktivitas dan kondisi tubuh ternak.',
            ],
            [
                'kode_penyakit' => 'P07',
                'nama_penyakit' => 'Perut Kembung (Bloat)',
                'deskripsi' => 'Bloat adalah kondisi kembung pada sapi akibat penumpukan gas di dalam rumen yang tidak dapat dikeluarkan secara normal. Kondisi ini dapat menyebabkan pembesaran perut, gangguan pernapasan, dan berisiko kematian jika tidak ditangani.',
            ],
            [
                'kode_penyakit' => 'P08',
                'nama_penyakit' => 'Endometritis',
                'deskripsi' => 'Endometritis adalah peradangan pada lapisan rahim sapi betina yang umumnya terjadi setelah proses melahirkan akibat infeksi bakteri. Kondisi ini dapat mengganggu kesuburan dan menurunkan kemampuan reproduksi ternak.',
            ],
            [
                'kode_penyakit' => 'P09',
                'nama_penyakit' => 'Hipokalsemia (Milk Fever Disease)',
                'deskripsi' => 'Milk Fever adalah gangguan metabolisme pada sapi perah akibat kekurangan kalsium dalam darah setelah melahirkan. Penyakit ini ditandai dengan kelemahan otot dan dapat menyebabkan sapi tidak mampu berdiri. Kondisi ini memerlukan penanganan cepat untuk mencegah komplikasi serius.',
            ],
            [
                'kode_penyakit' => 'P10',
                'nama_penyakit' => 'Omphalitis (Radang Pusar)',
                'deskripsi' => 'Omphalitis adalah infeksi pada tali pusar anak sapi yang biasanya terjadi akibat kebersihan yang kurang baik setelah kelahiran. Kondisi ini dapat menyebabkan pembengkakan dan gangguan kesehatan pada pedet.',
            ],
        ];

        foreach ($penyakits as $penyakit) {
            Penyakit::create($penyakit);
        }
    }
}
