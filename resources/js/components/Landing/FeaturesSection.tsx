import { Brain, Gauge, LaptopMinimal, Zap } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Diagnosis Cepat',
    desc: 'Membantu peternak memperoleh hasil diagnosis awal dalam waktu singkat berdasarkan gejala yang dipilih.',
    color: 'emerald',
  },
  {
    icon: Brain,
    title: 'Berbasis Pengetahuan Pakar',
    desc: 'Basis pengetahuan disusun dari hasil akuisisi pengetahuan pakar dan aturan diagnosis yang telah ditentukan.',
    color: 'blue',
  },
  {
    icon: Gauge,
    title: 'Tingkat Keyakinan Diagnosis',
    desc: 'Memberikan tingkat keyakinan terhadap setiap diagnosis yang diberikan.',
    color: 'red',
  },
  {
    icon: LaptopMinimal,
    title: 'Akses Kapan Saja',
    desc: 'Dapat digunakan melalui berbagai perangkat tanpa instalasi aplikasi tambahan.',
    color: 'cyan',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white pt-20 pb-24 md:pt-24 md:pb-28"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            Keunggulan Sistem
          </div>

          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Mengapa Memilih
            <span className="mt-4 block text-emerald-600">
              SapiDoc?
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            SapiDoc dirancang untuk membantu peternak melakukan diagnosis awal penyakit sapi secara lebih cepat, praktis, dan mudah dipahami melalui sistem pakar berbasis Certainty Factor.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-cyan-50/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-inner">
                  <Icon className="h-8 w-8 text-emerald-600" />
                </div>

                {/* Text */}
                <div className="relative">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {feature.desc}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-100/30 blur-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}