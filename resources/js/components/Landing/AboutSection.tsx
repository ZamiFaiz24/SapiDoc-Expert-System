export default function AboutSection() {
    return (
      <section id="about" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-12">
            <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tentang SapiDoc
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SapiDoc adalah sistem pakar berbasis AI untuk diagnosis awal penyakit pada sapi. Dikembangkan menggunakan metode Certainty Factor, sistem ini membantu peternak melakukan identifikasi masalah kesehatan ternak secara dini, sehingga dapat mengambil tindakan yang tepat. Platform ini dapat diakses oleh peternak di Kecamatan Petanahan, Kabupaten Kebumen, dan sekitarnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-emerald-600 mb-2">Tinggi</p>
              <p className="text-gray-700 font-medium">Akurasi Diagnosis</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">Metode CF</p>
              <p className="text-gray-700 font-medium">Certainty Factor</p>
            </div>
            <div className="bg-red-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-red-500 mb-2">Akses</p>
              <p className="text-gray-700 font-medium">Mudah & Cepat</p>
            </div>
          </div>
        </div>
        </div>
      </section>
    );
}