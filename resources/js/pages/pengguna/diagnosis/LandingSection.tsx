import { ClipboardCheck, ChevronRight } from 'lucide-react';

interface LandingSectionProps {
  onStart: () => void;
}

export default function LandingSection({
  onStart,
}: LandingSectionProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-xl md:p-10">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 p-4">
            <ClipboardCheck className="h-16 w-16 text-emerald-600" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Selamat Datang! 👋
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            Diagnosis Awal Penyakit Sapi
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <p className="text-gray-700">
            Sistem pakar ini membantu Anda mengidentifikasi
            penyakit pada sapi ternak dengan akurat menggunakan
            teknologi Certainty Factor.
          </p>

          <div className="space-y-3 rounded-2xl bg-emerald-50 p-5">
            <h3 className="font-semibold text-gray-900">
              Bagaimana cara kerjanya?
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              {[
                'Isi data diri Anda dan informasi sapi',
                'Pilih kondisi dan gejala yang terlihat',
                'Sistem akan memberikan saran gejala berdasarkan analisis',
                'Dapatkan hasil diagnosis dengan tingkat kepercayaan',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                    {i + 1}
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-emerald-700 hover:to-teal-600"
        >
          Mulai Diagnosis
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}