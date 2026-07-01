import { ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50"
    >
      {/* Background Blur */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">
              Sistem Pakar Diagnosis Sapi
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-black leading-tight text-gray-900 md:text-6xl">
              Diagnosis Penyakit
              <span className="block text-emerald-600">
                Sapi Lebih Cepat
              </span>
              dan Tepat
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              SapiDoc membantu peternak melakukan diagnosis awal penyakit sapi menggunakan metode <span className="font-semibold text-emerald-700">Certainty Factor </span>
              berdasarkan gejala yang diamati, sehingga penanganan dapat dilakukan lebih cepat.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/diagnosis"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
            >
              Mulai Diagnosis
              <ArrowRight size={20} />
            </Link>

            <button
              className="rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-medium text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              Pelajari Sistem
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">10+</h3>
              <p className="text-sm text-gray-600">Penyakit Didukung</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">CF</h3>
              <p className="text-sm text-gray-600">Metode Diagnosis</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">Online</h3>
              <p className="text-sm text-gray-600">Akses Kapan Saja</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative hidden lg:flex items-center justify-center">
          
          {/* Main Image */}
          <div className="relative">
            <img
              src="/images/ternak sapi.jpg"
              alt="Sapi Sehat"
              className="h-[520px] w-[520px] rounded-[32px] object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Stethoscope className="h-6 w-6 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Diagnosis Awal
                  </p>
                  <h4 className="font-bold text-gray-900">
                    Cepat & Efisien
                  </h4>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute right-6 top-6 rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-xl">
              <p className="text-sm">Metode</p>
              <h4 className="text-xl font-bold">Certainty Factor</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}