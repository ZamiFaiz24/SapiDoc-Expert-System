import {
  ArrowRight,
  Stethoscope,
  BrainCircuit,
  FileCheck,
  Lightbulb,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Masukkan Data & Pilih Gejala',
    desc: 'Masukkan data sapi dan pilih gejala yang sesuai dengan kondisi yang diamati.',
    icon: Stethoscope,
  },
  {
    number: '02',
    title: 'Analisis Certainty Factor',
    desc: 'Sistem menganalisis gejala untuk menghitung tingkat keyakinan setiap kemungkinan penyakit.',
    icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Hasil Diagnosis',
    desc: 'Dapatkan hasil diagnosis awal beserta tingkat kemungkinan penyakit dan rekomendasi penanganan awal.',
    icon: FileCheck,
  },
];

export default function WorkFlowSection() {
  return (
    <section
      id="cara-kerja"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 pt-20 pb-24 md:pt-24 md:pb-28"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
            Cara Kerja Sistem
          </div>

          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Diagnosis Awal
            <span className="mt-4 block text-emerald-600">
              3 Langkah Mudah
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Proses diagnosis dirancang sederhana agar peternak dapat melakukan diagnosis awal penyakit sapi dengan mudah melalui tiga tahapan.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative">
                
                {/* Connector */}
                {/* {index !== 2 && (
                  <div className="absolute left-[85%] top-20 z-0 flex w-full items-center">
                    <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                    <ArrowRight className="ml-2 text-emerald-500" />
                  </div>
                )} */}

                {/* Card */}
                <div className="group relative z-10 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  
                  {/* Number */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <span className="text-5xl font-black text-emerald-100">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {step.desc}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/0 to-cyan-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="space-y-8 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-emerald-600">
                      Step {step.number}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="leading-relaxed text-gray-600">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-20 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-lg backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-xl">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>

              <div>
                <h4 className="font-semibold text-emerald-600 mb-1">
                  Catatan Penting
                </h4>

                <p className="font-bold text-gray-600 text-sm leading-relaxed">
                  Hasil diagnosis yang diberikan oleh SapiDoc merupakan diagnosis awal berdasarkan gejala yang dipilih pengguna. Untuk memastikan kondisi kesehatan sapi, disarankan tetap berkonsultasi dengan dokter hewan.
                </p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}