export default function GallerySection() {
  return (
    <section className="bg-emerald-600 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16 space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
            Gallery Peternakan
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Peternakan Digital di Kebumen
          </h2>

          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Potret peternakan sapi modern yang memanfaatkan teknologi
            diagnosis digital untuk menjaga kesehatan ternak.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Gallery 1 */}
          <div
            className="relative group overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src="/images/ternak sapi.jpg"
              alt="Peternakan Modern"
              className="w-full h-72 object-cover transition-transform duration-500         group-hover:scale-110"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20      to-transparent flex items-end p-6"
            >
              <div>
                <h3 className="text-white text-xl font-semibold">
                  Peternakan Modern
                </h3>

                <p className="text-gray-200 text-sm mt-1">
                  Sistem peternakan sapi dengan dukungan teknologi digital.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery 2 */}
          <div
            className="relative group overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src="/images/farm2.jpg"
              alt="Sapi Sehat"
              className="w-full h-72 object-cover transition-transform duration-500         group-hover:scale-110"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20      to-transparent flex items-end p-6"
            >
              <div>
                <h3 className="text-white text-xl font-semibold">
                  Sapi Sehat & Produktif
                </h3>

                <p className="text-gray-200 text-sm mt-1">
                  Pemantauan kesehatan ternak untuk menjaga produktivitas.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery 3 */}
          <div
            className="relative group overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src="/images/farm3.jpg"
              alt="Kandang Higienis"
              className="w-full h-72 object-cover transition-transform duration-500         group-hover:scale-110"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20      to-transparent flex items-end p-6"
            >
              <div>
                <h3 className="text-white text-xl font-semibold">
                  Kandang Higienis
                </h3>

                <p className="text-gray-200 text-sm mt-1">
                  Lingkungan kandang yang bersih membantu menjaga kesehatan sapi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}