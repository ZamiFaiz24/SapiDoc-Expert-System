import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';


export default function HeroSection() {
  return (
    <section
        id="home"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Sistem Diagnosis Penyakit{' '}
                <span className="text-emerald-600">Awal pada Sapi</span>
              </h1>
              <p className="text-lg text-gray-600">
                Platform pendamping untuk membantu peternak melakukan diagnosis awal penyakit pada sapi mereka. Dengan metode Certainty Factor, SapiDoc memberikan hasil diagnosis yang akurat untuk mendukung pengambilan keputusan kesehatan ternak Anda.
              </p>
            </div>

            <Link href="/diagnosis" className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2 text-lg">
              Mulai Diagnosis
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex items-center justify-center">
            <img 
              src="/images/ternak sapi.jpg" 
              alt="Sapi Sehat" 
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    );
}