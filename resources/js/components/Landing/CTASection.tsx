import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CTASection() {
    return (
    <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Mulai Diagnosis Awal Sekarang
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Gunakan SapiDoc untuk membantu Anda mendeteksi masalah kesehatan sapi sejak dini.
          </p>
          <Link href="/diagnosis" className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2 text-lg">
            Mulai Sekarang
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    );
}