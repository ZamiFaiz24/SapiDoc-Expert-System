import { ArrowRight, Stethoscope } from 'lucide-react';
import type { Disease } from '@/types/disease';

const diseases: Disease[] = [
  {
    id: 'mastitis',
    name: 'Mastitis',
    shortDesc: 'Inflamasi pada kelenjar susu. Ditandai dengan pembengkakan, kemerahan, atau perubahan warna susu yang keluar.',
    image: '/images/farm1.jpg',
    fullDesc: 'Mastitis adalah peradangan pada ambing (kelenjar susu) sapi yang biasanya disebabkan oleh infeksi bakteri. Kondisi ini dapat mengurangi produksi susu dan kualitas susu yang dihasilkan. Jika tidak segera ditangani, mastitis dapat berlanjut menjadi masalah kesehatan yang lebih serius yang mempengaruhi produktivitas sapi.',
    symptoms: [
      'Pembengkakan pada ambing',
      'Kemerahan dan hangat pada ambing',
      'Susu keluar berbentuk gumpalan atau berubah warna',
      'Sapi terlihat tidak nyaman saat diperah',
      'Demam ringan',
      'Penurunan produksi susu'
    ]
  },
  {
    id: 'antraks',
    name: 'Antraks',
    shortDesc: 'Penyakit menular akut yang disebabkan bakteri. Gejala termasuk demam tinggi, lemas, dan bisa menyebabkan kematian mendadak.',
    image: '/images/farm2.jpg',
    fullDesc: 'Antraks adalah penyakit menular yang sangat serius yang disebabkan oleh bakteri Bacillus anthracis. Penyakit ini dapat menular ke manusia dan merupakan penyakit yang mudah menular antar ternak. Antraks dapat menyebabkan kematian mendadak tanpa gejala yang jelas pada beberapa kasus.',
    symptoms: [
      'Demam tinggi (hingga 40-41°C)',
      'Lemas dan tidak mau makan',
      'Kesulitan bernafas',
      'Keluarnya darah dari lubang alami tubuh',
      'Penurunan produksi susu drastis',
      'Kematian mendadak dalam beberapa jam'
    ]
  },
  {
    id: 'pmk',
    name: 'PMK (Penyakit Mulut Kaki)',
    shortDesc: 'Penyakit viral yang menyerang mulut dan kaki. Ditandai dengan lepuh, lemas, dan pincang pada sapi.',
    image: '/images/farm3.jpg',
    fullDesc: 'Penyakit Mulut Kaki (PMK) adalah penyakit viral yang sangat menular dan menyerang ternak berkuku genap termasuk sapi. Penyakit ini ditandai dengan munculnya lepuh pada mulut, lidah, dan kaki. Sapi akan terlihat sangat lemas dan kesulitan makan serta berjalan.',
    symptoms: [
      'Terbentuk lepuh (blister) di mulut dan lidah',
      'Lepuh pada kaki dan di antara jari kaki',
      'Air liur berlebihan dan sulit menelan',
      'Sapi berjalan pincang atau tidak mau bergerak',
      'Demam ringan',
      'Penurunan berat badan dan produksi susu'
    ]
  },
  {
    id: 'cacingan',
    name: 'Cacingan',
    shortDesc: 'Infeksi parasit cacing pada saluran pencernaan. Menyebabkan penurunan berat badan dan produksi susu menurun.',
    image: '/images/farm1.jpg',
    fullDesc: 'Cacingan adalah infeksi yang disebabkan oleh cacing parasit yang hidup di saluran pencernaan sapi. Infeksi ini terjadi ketika sapi memakan pakan yang terkontaminasi telur cacing. Cacingan dapat menyebabkan malnutrisi dan penurunan performa produksi pada sapi.',
    symptoms: [
      'Penurunan berat badan',
      'Perut membuncit atau distended',
      'Penurunan produksi susu',
      'Diare atau kotoran lembek',
      'Bulu kusam dan tidak bersinar',
      'Apatis dan kurang aktif'
    ]
  }
];

interface InformationSectionProps {
  openDiseaseModal: (disease: Disease) => void;
}

export default function InformationSection({
  openDiseaseModal,
}: InformationSectionProps) {
  return (
    <section
      id="penyakit"
      className="bg-gray-50 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            Informasi Penyakit
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Penyakit Umum Pada
            <span className="text-emerald-600"> Ternak Sapi</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kenali beberapa penyakit yang sering menyerang sapi
            agar penanganan dapat dilakukan lebih cepat dan tepat.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diseases.map((disease) => (
            <div
              key={disease.id}
              className="
                group
                bg-white
                rounded-3xl
                p-7
                border border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7 text-emerald-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {disease.name}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {disease.shortDesc}
              </p>

              {/* Button */}
              <button
                onClick={() => openDiseaseModal(disease)}
                className="
                  inline-flex items-center gap-2
                  text-emerald-600
                  font-semibold
                  group-hover:gap-3
                  transition-all
                "
              >
                Lihat Detail
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}