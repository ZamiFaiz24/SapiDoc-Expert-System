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
                'nama_penyakit' => 'Penyakit Mulut dan Kuku (Foot and Mouth Disease)',
                'deskripsi' => 'Penyakit Mulut dan Kuku (PMK) merupakan penyakit infeksi virus yang sangat menular pada ternak berkuku belah, seperti sapi. Penyakit ini ditandai dengan munculnya lepuh pada mulut dan kuku sehingga menyebabkan sapi sulit makan, mengeluarkan air liur berlebihan, serta mengalami penurunan kondisi tubuh.',
                'penanganan_awal' => 'Pisahkan sapi yang diduga terinfeksi dari ternak lain, batasi perpindahan ternak dan peralatan, berikan pakan yang lunak apabila terdapat luka pada mulut, serta segera hubungi dokter hewan untuk mendapatkan penanganan lebih lanjut.',
            ],
            [
                'kode_penyakit' => 'P02',
                'kategori_penyakit' => 'Pencernaan',
                'gambar' => '/images/penyakit/cacingan.jpg',
                'nama_penyakit' => 'Cacingan (Helminthiasis)',
                'deskripsi' => 'Cacingan merupakan penyakit akibat infeksi cacing parasit pada saluran pencernaan sapi. Penyakit ini umumnya terjadi karena sapi mengonsumsi pakan atau air yang tercemar larva maupun telur cacing sehingga dapat menurunkan kondisi tubuh dan produktivitas ternak.',
                'penanganan_awal' => 'Jaga kebersihan kandang, tempat pakan, dan tempat minum, hindari penggembalaan pada area yang diduga tercemar parasit, serta konsultasikan kepada dokter hewan untuk pemberian obat cacing yang sesuai.',
            ],
            [
                'kode_penyakit' => 'P03',
                'kategori_penyakit' => 'Ambing',
                'gambar' => '/images/penyakit/mastitis.jpg',
                'nama_penyakit' => 'Radang Ambing (Mastitis)',
                'deskripsi' => 'Mastitis merupakan peradangan pada jaringan ambing yang umumnya disebabkan oleh infeksi bakteri. Penyakit ini dapat menyebabkan pembengkakan ambing, penurunan produksi susu, serta perubahan kualitas susu apabila tidak segera ditangani.',
                'penanganan_awal' => 'Jaga kebersihan ambing sebelum dan sesudah pemerahan, pisahkan susu dari ambing yang mengalami peradangan, pertahankan kebersihan kandang, dan segera lakukan pemeriksaan oleh dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P04',
                'kategori_penyakit' => 'Menular',
                'gambar' => '/images/penyakit/bef.jpg',
                'nama_penyakit' => 'Demam Tiga Hari (Bovine Ephemeral Fever)',
                'deskripsi' => 'Demam Tiga Hari atau Bovine Ephemeral Fever (BEF) merupakan penyakit virus yang menyerang sapi dan ditularkan melalui gigitan serangga pengisap darah. Penyakit ini ditandai dengan demam tinggi, tubuh lemah, penurunan nafsu makan, dan kepincangan sehingga dapat menurunkan produktivitas ternak.',
                'penanganan_awal' => 'Istirahatkan ternak, pastikan kebutuhan air minum tetap terpenuhi, lakukan pengendalian serangga di sekitar kandang, dan segera konsultasikan kepada dokter hewan untuk mendapatkan penanganan lebih lanjut.',
            ],
            [
                'kode_penyakit' => 'P05',
                'kategori_penyakit' => 'Kulit',
                'gambar' => '/images/penyakit/scabies.jpg',
                'nama_penyakit' => 'Kudis (Scabies)',
                'deskripsi' => 'Scabies merupakan penyakit kulit yang disebabkan oleh infestasi tungau pada permukaan kulit sapi. Penyakit ini ditandai dengan rasa gatal, kerontokan bulu, penebalan kulit, serta terbentuknya keropeng dan dapat menular melalui kontak langsung maupun peralatan yang tercemar.',
                'penanganan_awal' => 'Pisahkan sapi yang terinfeksi, bersihkan dan lakukan sanitasi kandang beserta peralatan, jaga kebersihan kulit ternak, serta segera lakukan pemeriksaan oleh dokter hewan untuk mendapatkan terapi antiparasit.',
            ],
            [
                'kode_penyakit' => 'P06',
                'kategori_penyakit' => 'Kulit',
                'gambar' => '/images/penyakit/lumpy-skin.jpg',
                'nama_penyakit' => 'Penyakit Lato-Lato (Lumpy Skin Disease)',
                'deskripsi' => 'Lumpy Skin Disease (LSD) merupakan penyakit infeksi virus yang menyerang sapi dan kerbau serta ditandai dengan munculnya benjolan pada kulit, demam, pembengkakan kelenjar getah bening, dan penurunan produktivitas. Penyakit ini terutama ditularkan melalui gigitan serangga pengisap darah seperti nyamuk, lalat, dan caplak.',
                'penanganan_awal' => 'Pisahkan sapi yang terinfeksi dari ternak sehat, lakukan pengendalian serangga di sekitar kandang, batasi perpindahan ternak, jaga kebersihan lingkungan, dan segera hubungi dokter hewan untuk mendapatkan penanganan lebih lanjut.',
            ],
            [
                'kode_penyakit' => 'P07',
                'kategori_penyakit' => 'Pencernaan',
                'gambar' => '/images/penyakit/bloat.jpg',
                'nama_penyakit' => 'Perut Kembung (Bloat)',
                'deskripsi' => 'Perut Kembung (Bloat) merupakan gangguan pada rumen akibat penumpukan gas yang tidak dapat dikeluarkan secara normal. Kondisi ini dapat menyebabkan pembesaran perut, gangguan pernapasan, bahkan membahayakan keselamatan ternak apabila tidak segera ditangani.',
                'penanganan_awal' => 'Hentikan sementara pemberian pakan yang mudah difermentasi, amati pembesaran perut dan kondisi pernapasan sapi, hindari aktivitas berlebihan, serta segera hubungi dokter hewan apabila kondisi tidak membaik.',
            ],
            [
                'kode_penyakit' => 'P08',
                'kategori_penyakit' => 'Reproduksi',
                'gambar' => '/images/penyakit/endometritis.jpg',
                'nama_penyakit' => 'Radang Rahim (Endometritis)',
                'deskripsi' => 'Endometritis merupakan peradangan pada lapisan dalam rahim sapi yang umumnya terjadi setelah proses melahirkan akibat infeksi bakteri. Penyakit ini ditandai dengan keluarnya cairan bernanah atau lendir dari alat reproduksi serta dapat mengganggu kesuburan dan menurunkan performa reproduksi ternak.',
                'penanganan_awal' => 'Jaga kebersihan kandang dan area reproduksi sapi setelah melahirkan, pantau adanya cairan yang tidak normal, berikan perawatan pascapersalinan yang baik, dan segera konsultasikan kepada dokter hewan untuk mendapatkan penanganan yang sesuai.',
            ],
            [
                'kode_penyakit' => 'P09',
                'kategori_penyakit' => 'Metabolik',
                'gambar' => '/images/penyakit/milk-fever.jpg',
                'nama_penyakit' => 'Demam Susu (Milk Fever Disease)',
                'deskripsi' => 'Demam Susu (Milk Fever) merupakan gangguan metabolisme akibat rendahnya kadar kalsium dalam darah, umumnya terjadi pada sapi menjelang atau setelah melahirkan. Penyakit ini ditandai dengan tubuh lemah, kesulitan berdiri, hingga sapi ambruk apabila tidak segera ditangani.',
                'penanganan_awal' => 'Tempatkan sapi pada lokasi yang aman dan nyaman, hindari memaksa sapi untuk berdiri, berikan alas yang kering agar tubuh tidak mengalami luka tekan, dan segera minta penanganan dokter hewan.',
            ],
            [
                'kode_penyakit' => 'P10',
                'kategori_penyakit' => 'Menular',
                'gambar' => '/images/penyakit/omphalitis.jpg',
                'nama_penyakit' => 'Radang Pusar (Omphalitis)',
                'deskripsi' => 'Omphalitis merupakan infeksi atau peradangan pada tali pusar (umbilikus) anak sapi yang umumnya terjadi dalam 30 hari pertama setelah kelahiran akibat infeksi bakteri. Penyakit ini ditandai dengan pembengkakan pada area pusar, keluarnya nanah, rasa nyeri, dan dapat berkembang menjadi infeksi yang lebih serius apabila tidak segera ditangani.',
                'penanganan_awal' => 'Jaga kebersihan area tali pusar dan kandang pedet, lakukan pemantauan terhadap pembengkakan atau keluarnya nanah pada pusar, hindari lingkungan yang kotor, dan segera konsultasikan kepada dokter hewan apabila ditemukan tanda-tanda infeksi.',
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
