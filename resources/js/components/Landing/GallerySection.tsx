export default function GallerySection() {
    return (
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Peternakan di Kebumen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Peternakan sapi di Kecamatan Petanahan, Kebumen yang memanfaatkan diagnosis digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gallery 1 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/ternak sapi.jpg" 
              alt="Peternakan Modern" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Peternakan Jawa Barat</p>
            </div>
          </div>

          {/* Gallery 2 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/farm2.jpg" 
              alt="Sapi Sehat Produktif" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Sapi Sehat & Produktif</p>
            </div>
          </div>

          {/* Gallery 3 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/farm3.jpg" 
              alt="Kandang Terawat" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Kandang Higienis & Terawat</p>
            </div>
          </div>
        </div>
      </section>
    );
}