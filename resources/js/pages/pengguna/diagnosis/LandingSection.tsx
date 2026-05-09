import { ClipboardCheck, ChevronRight } from 'lucide-react';

interface LandingSectionProps {
  onStart: () => void;
}

export default function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-md shadow-xl p-8 md:p-10">

        {/* subtle background glow */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl"></div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 p-4 shadow-sm">
            <ClipboardCheck className="h-14 w-14 text-emerald-600" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Diagnosis Awal Sapi
          </h1>

          <p className="text-gray-600 text-base md:text-lg">
            Sistem Pakar Berbasis <span className="text-emerald-600 font-medium">Certainty Factor</span>
          </p>

          <p className="text-sm text-gray-500">
            Deteksi gejala lebih cepat sebelum kondisi memburuk
          </p>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-5">

          <p className="text-gray-700 leading-relaxed">
            Sistem ini menganalisis gejala yang Anda input untuk memberikan
            rekomendasi penyakit sapi berdasarkan tingkat keyakinan (CF).
          </p>

          {/* Steps */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">
              Alur Diagnosis
            </h3>

            <div className="space-y-4">
              {[
                'Masukkan data peternak & sapi',
                'Pilih gejala yang sesuai kondisi',
                'Sistem melakukan analisis Certainty Factor',
                'Hasil diagnosis & rekomendasi ditampilkan',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {i + 1}
                  </div>

                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          Mulai Diagnosis
          <ChevronRight
            size={20}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>
    </div>
  );
}