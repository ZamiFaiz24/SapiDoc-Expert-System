const galleryItems = [
  {
    title: 'Kondisi kandang',
    desc: 'Observasi kondisi kandang dan lingkungan peternakan.',
    image: '/images/landing/kondisi_kandang.jpeg',
  },
  {
    title: 'Pemeriksaan kesehatan sapi',
    desc: 'Pendampingan pemeriksaan dan imunisasi ternak.',
    image: '/images/landing/pemerikasaan_sapi.jpeg',
  },
  {
    title: 'Pemberian pakan',
    desc: 'Aktivitas pemberian pakan kepada ternak.',
    image: '/images/landing/pakan_sapi.jpeg',
  },
  {
    title: 'Observasi kondisi ternak',
    desc: 'Pengamatan kondisi fisik sapi selama proses pengumpulan data.',
    image: '/images/landing/observasi.jpeg',
  },
  {
    title: 'Pemberian Imunisasi Rutin',
    desc: 'Pemberian imunisasi rutin untuk mencegah penyakit pada ternak.',
    image: '/images/landing/imunisasi.jpeg',
  }
];

export default function GallerySection() {
  return (
    <section className="bg-emerald-600 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 space-y-5">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            Gallery Peternakan
          </span>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Dokumentasi Kegiatan Lapangan
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-emerald-100">
            Foto singkat kegiatan di peternakan untuk memberi gambaran suasana
            observasi dan pemeriksaan ternak.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-emerald-700/20 shadow-2xl shadow-emerald-950/10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                  📷 {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-emerald-50/90">
          *Dokumentasi diambil pada kegiatan observasi lapangan di peternakan
          sapi Kecamatan Petanahan, Kabupaten Kebumen.*
        </p>
      </div>
    </section>
  );
}