import { ArrowRight } from 'lucide-react';
import type { Disease } from '@/types/disease';

interface InformationSectionProps {
  diseases: Disease[];
  openDiseaseModal: (disease: Disease) => void;
}

export default function InformationSection({ diseases, openDiseaseModal }: InformationSectionProps) {
    return (
      <section id="penyakit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Informasi Penyakit Ternak
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari tentang penyakit-penyakit umum yang sering menyerang sapi ternak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map((disease) => (
            <div key={disease.id} className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{disease.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {disease.shortDesc}
              </p>
              <button 
                onClick={() => openDiseaseModal(disease)}
                className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition inline-flex items-center gap-2"
              >
                Lihat Detail
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    );
}