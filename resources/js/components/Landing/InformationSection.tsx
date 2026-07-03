import { ArrowRight, Stethoscope } from 'lucide-react';
import type { Disease } from '@/types/disease';
import { useState } from 'react';

interface InformationSectionProps {
  openDiseaseModal: (disease: Disease) => void;
  diseases: Disease[];
}

export default function InformationSection({
  openDiseaseModal,
  diseases,
}: InformationSectionProps) {
  const showAllCount = 5;
  const [showAllDiseases, setShowAllDiseases] = useState(false);

  const visibleDiseases = showAllDiseases
    ? diseases
    : diseases.slice(0, showAllCount);

  const canToggle = diseases.length > showAllCount;
  console.log(diseases)
  console.log(diseases.map(d => d.id));
  return (
    <section
      id="penyakit"
      className="bg-gradient-to-b from-gray-50 via-white to-emerald-50/40 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            Informasi Penyakit
          </span>

          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Penyakit yang Dapat 
            <span className="mt-4 block text-emerald-600">
              Dideteksi Sistem
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistem pakar ini mampu membantu diagnosis awal terhadap 10 jenis penyakit sapi. Berikut ditampilkan 5 penyakit sebagai ringkasan. Klik Lihat Semua Penyakit untuk melihat daftar lengkap beserta penjelasannya.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {visibleDiseases.map((disease) => (
              <button
                key={disease.id}
                type="button"
                onClick={() => openDiseaseModal(disease)}
                className="group w-full text-left rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                {disease.image ? (
                  <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <img
                      src={disease.image}
                      alt={disease.name}
                      className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                    <Stethoscope className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                      {disease.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
                      {disease.shortDesc}
                    </p>
                    {disease.kategori_penyakit ? (
                      <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                        {disease.kategori_penyakit}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-all group-hover:gap-3">
                  Lihat Detail
                  <ArrowRight size={16} />
                </div>
              </button>
            ))}
          </div>

          {canToggle && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllDiseases((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50"
              >
                {showAllDiseases ? 'Sembunyikan' : 'Lihat Semua Penyakit'}
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {visibleDiseases.length}/{diseases.length}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}