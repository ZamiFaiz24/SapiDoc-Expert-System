import { ShieldCheck, BrainCircuit, Stethoscope } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6">

            <span className="
              inline-block
              px-4
              py-1.5
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
              font-medium
            ">
              Tentang Platform
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Teknologi Diagnosis Awal
              <span className="text-emerald-600"> untuk Kesehatan Sapi</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              SapiDoc merupakan sistem pakar berbasis web yang membantu
              peternak melakukan diagnosis awal penyakit sapi menggunakan
              metode Certainty Factor.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Platform ini dirancang untuk membantu proses identifikasi
              gejala secara cepat, sehingga peternak dapat mengambil
              tindakan lebih dini sebelum berkonsultasi dengan dokter hewan.
            </p>

          </div>

          {/* Right Cards */}
          <div className="space-y-6">

            {/* Card 1 */}
            <div className="
              bg-white
              p-6
              rounded-3xl
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              border border-gray-100
            ">
              <div className="flex items-start gap-4">
                <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-emerald-100
                  flex items-center justify-center
                ">
                  <BrainCircuit className="text-emerald-600" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Metode Certainty Factor
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Sistem menggunakan metode CF untuk menghitung tingkat
                    keyakinan diagnosis berdasarkan gejala yang dipilih.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="
              bg-white
              p-6
              rounded-3xl
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              border border-gray-100
            ">
              <div className="flex items-start gap-4">
                <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                ">
                  <ShieldCheck className="text-blue-600" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Diagnosis Cepat & Praktis
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Membantu peternak mengenali kemungkinan penyakit
                    secara cepat melalui perangkat smartphone maupun desktop.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="
              bg-white
              p-6
              rounded-3xl
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              border border-gray-100
            ">
              <div className="flex items-start gap-4">
                <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-red-100
                  flex items-center justify-center
                ">
                  <Stethoscope className="text-red-500" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pendamping Peternak
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    SapiDoc dirancang sebagai alat bantu diagnosis awal,
                    bukan pengganti pemeriksaan dokter hewan profesional.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}