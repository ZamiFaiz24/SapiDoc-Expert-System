import { CheckCircle, Globe, Heart, Zap } from 'lucide-react';


export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Keunggulan SapiDoc
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diagnosis awal yang akurat dan mudah diakses untuk peternak di Kebumen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Zap size={40} className="text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Diagnosis Cepat
              </h3>
              <p className="text-gray-600">
                Dapatkan hasil diagnosis dalam hitungan menit tanpa perlu menunggu lama.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <CheckCircle size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Hasil Akurat
              </h3>
              <p className="text-gray-600">
                Menggunakan metode Certainty Factor untuk memberikan hasil diagnosis yang terpercaya.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Heart size={40} className="text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mudah Digunakan
              </h3>
              <p className="text-gray-600">
                Interface intuitif yang dirancang khusus untuk kemudahan penggunaan tanpa perlu keahlian teknis.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Globe size={40} className="text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Akses Dimana Saja
              </h3>
              <p className="text-gray-600">
                Akses diagnosis dari smartphone atau komputer Anda dengan mudah.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}