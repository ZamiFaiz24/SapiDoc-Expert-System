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
                'kategori_penyakit' => 'Menular',
                'gambar' => '/images/penyakit/pmk.jpg',
                'nama_penyakit' => 'Penyakit Mulut dan Kuku (PMK)',
                'deskripsi' => 'Penyakit Mulut dan Kuku (PMK) adalah penyakit menular pada ternak berkuku genap seperti sapi yang disebabkan oleh virus dan dapat menyebar dengan cepat.',
                'penanganan_awal' => 'Pisahkan sapi yang menunjukkan gejala dari ternak lain, batasi perpindahan ternak, jaga kebersihan kandang, dan segera hubungi dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P02',
                'kategori_penyakit' => 'Pencernaan',
                'gambar' => '/images/penyakit/cacingan.jpg',
                'nama_penyakit' => 'Cacingan',
                'deskripsi' => 'Cacingan adalah penyakit yang disebabkan oleh infestasi cacing pada tubuh ternak, terutama pada saluran pencernaan dan hati. Kondisi ini dapat mengganggu kesehatan serta menurunkan produktivitas sapi.',
                'penanganan_awal' => 'Amati kondisi sapi, pastikan konsumsi pakan dan air tercukupi, jaga kebersihan kandang, dan konsultasikan kepada dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P03',
                'kategori_penyakit' => 'Ambing',
                'gambar' => '/images/penyakit/mastitis.jpg',
                'nama_penyakit' => 'Mastitis (radang ambing)',
                'deskripsi' => 'Mastitis adalah peradangan pada ambing sapi yang disebabkan oleh infeksi bakteri pada kelenjar susu. Penyakit ini dapat mengganggu produksi dan kualitas susu serta sering terjadi dalam bentuk tanpa gejala yang jelas.',
                'penanganan_awal' => 'Periksa ambing dengan hati-hati, jaga kebersihan saat pemerahan, pisahkan sapi bila diperlukan, dan segera konsultasikan kepada dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P04',
                'kategori_penyakit' => 'Menular',
                'gambar' => '/images/penyakit/bef.jpg',
                'nama_penyakit' => 'Demam Tiga Hari (Bovine Ephemeral Fever)',
                'deskripsi' => 'Bovine Ephemeral Fever (BEF) adalah penyakit virus pada sapi yang ditularkan melalui serangga, ditandai dengan demam mendadak dan kekakuan sendi. Penyakit ini umumnya bersifat sementara namun dapat menurunkan produksi dan aktivitas ternak.',
                'penanganan_awal' => 'Pisahkan sapi dari sumber stres, sediakan tempat istirahat yang nyaman, pastikan air minum cukup, kendalikan serangga, dan konsultasikan ke dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P05',
                'kategori_penyakit' => 'Kulit',
                'gambar' => '/images/penyakit/scabies.jpg',
                'nama_penyakit' => 'Scabies / Kudis (Gudig)',
                'deskripsi' => 'Scabies adalah penyakit kulit menular yang disebabkan oleh tungau Sarcoptes scabiei, ditandai dengan gatal, keropeng, dan kerontokan bulu. Penyakit ini dapat menyerang berbagai bagian tubuh ternak dan menyebar dengan cepat.',
                'penanganan_awal' => 'Jaga kebersihan kandang, hindari kontak dengan sapi lain bila diperlukan, lakukan pemeriksaan lanjutan, dan ikuti anjuran dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P06',
                'kategori_penyakit' => 'Kulit',
                'gambar' => '/images/penyakit/lumpy-skin.jpg',
                'nama_penyakit' => 'Penyakit Lato-Lato (Lumpy Skin Disease)',
                'deskripsi' => 'Lumpy Skin Disease adalah penyakit virus pada sapi yang ditandai dengan munculnya benjolan pada kulit serta gangguan kesehatan umum. Penyakit ini dapat menurunkan produktivitas dan kondisi tubuh ternak.',
                'penanganan_awal' => 'Lakukan pemeriksaan lanjutan, pisahkan bila diperlukan, jaga kebersihan kandang, dan konsultasikan kepada dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P07',
                'kategori_penyakit' => 'Pencernaan',
                'gambar' => '/images/penyakit/bloat.jpg',
                'nama_penyakit' => 'Perut Kembung (Bloat)',
                'deskripsi' => 'Bloat adalah kondisi kembung pada sapi akibat penumpukan gas di dalam rumen yang tidak dapat dikeluarkan secara normal. Kondisi ini dapat menyebabkan pembesaran perut, gangguan pernapasan, dan berisiko kematian jika tidak ditangani.',
                'penanganan_awal' => 'Amati kondisi sapi, perhatikan konsumsi pakan dan air, hentikan sementara pemberian pakan yang diduga memicu kembung, dan segera konsultasikan kepada dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P08',
                'kategori_penyakit' => 'Reproduksi',
                'gambar' => '/images/penyakit/endometritis.jpg',
                'nama_penyakit' => 'Endometritis',
                'deskripsi' => 'Endometritis adalah peradangan pada lapisan rahim sapi betina yang umumnya terjadi setelah proses melahirkan akibat infeksi bakteri. Kondisi ini dapat mengganggu kesuburan dan menurunkan kemampuan reproduksi ternak.',
                'penanganan_awal' => 'Lakukan pemeriksaan dokter hewan, jaga kebersihan kandang, dan pantau kondisi reproduksi sapi secara berkala.',
            ],
            [
                'kode_penyakit' => 'P09',
                'kategori_penyakit' => 'Metabolik',
                'gambar' => '/images/penyakit/milk-fever.jpg',
                'nama_penyakit' => 'Hipokalsemia (Milk Fever Disease)',
                'deskripsi' => 'Milk Fever adalah gangguan metabolisme pada sapi perah akibat kekurangan kalsium dalam darah setelah melahirkan. Penyakit ini ditandai dengan kelemahan otot dan dapat menyebabkan sapi tidak mampu berdiri. Kondisi ini memerlukan penanganan cepat untuk mencegah komplikasi serius.',
                'penanganan_awal' => 'Tempatkan sapi di tempat yang aman, pantau kondisinya, jaga agar tetap nyaman, dan segera hubungi dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P10',
                'kategori_penyakit' => 'Menular',
                'gambar' => '/images/penyakit/omphalitis.jpg',
                'nama_penyakit' => 'Omphalitis (Radang Pusar)',
                'deskripsi' => 'Omphalitis adalah infeksi pada tali pusar anak sapi yang biasanya terjadi akibat kebersihan yang kurang baik setelah kelahiran. Kondisi ini dapat menyebabkan pembengkakan dan gangguan kesehatan pada pedet.',
                'penanganan_awal' => 'Jaga kebersihan area kelahiran, pisahkan pedet yang sakit, dan konsultasikan kepada dokter hewan.',
            ],
        ];

        foreach ($penyakits as $penyakit) {
            Penyakit::updateOrCreate(
                ['kode_penyakit' => $penyakit['kode_penyakit']],
                $penyakit,
            );
        }
    }
}
