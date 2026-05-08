import { ArrowRight } from 'lucide-react';

export default function WorkFlowSection() {
    return (
    <section id="cara-kerja" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Cara Kerja Sistem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tiga langkah mudah untuk mendapatkan diagnosis awal kesehatan ternak sapi Anda
          </p>
        </div>

        {/* Steps Container - Desktop */}
        <div className="hidden md:block">
          <div className="flex items-stretch gap-6">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Pilih Gejala
                </h3>
                <p className="text-gray-600 text-sm">
                  Identifikasi gejala yang dialami ternak berdasarkan pengamatan di lapangan
                </p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center justify-center w-12 flex-shrink-0">
              <div className="relative w-full h-0.5 bg-emerald-600">
                <ArrowRight size={24} className="absolute -right-6 -top-2.5 text-emerald-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Hitung dengan CF
                </h3>
                <p className="text-gray-600 text-sm">
                  Sistem menghitung otomatis menggunakan metode Certainty Factor
                </p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center justify-center w-12 flex-shrink-0">
              <div className="relative w-full h-0.5 bg-emerald-600">
                <ArrowRight size={24} className="absolute -right-6 -top-2.5 text-emerald-600" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Hasil Diagnosis
                </h3>
                <p className="text-gray-600 text-sm">
                  Dapatkan hasil dengan kemungkinan penyakit dan tingkat keyakinan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Container - Mobile */}
        <div className="md:hidden space-y-8">
          {/* Step 1 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">1</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Pilih Gejala
              </h3>
              <p className="text-gray-600 text-sm">
                Identifikasi gejala yang dialami ternak berdasarkan pengamatan di lapangan
              </p>
            </div>
          </div>

          {/* Divider Mobile */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-600"></div>
          </div>

          {/* Step 2 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">2</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hitung dengan CF
              </h3>
              <p className="text-gray-600 text-sm">
                Sistem menghitung otomatis menggunakan metode Certainty Factor
              </p>
            </div>
          </div>

          {/* Divider Mobile */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-600"></div>
          </div>

          {/* Step 3 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">3</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hasil Diagnosis
              </h3>
              <p className="text-gray-600 text-sm">
                Dapatkan hasil dengan kemungkinan penyakit dan tingkat keyakinan
              </p>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-blue-900 text-sm">
            <span className="font-bold">💡 Catatan:</span> Hasil diagnosis dari sistem SapiDoc adalah diagnosis awal yang membantu Anda untuk mengambil keputusan. Untuk diagnosis yang lebih akurat dan penanganan lanjutan, tetap disarankan untuk berkonsultasi dengan dokter hewan profesional.
          </p>
        </div>
      </section>
    );
}