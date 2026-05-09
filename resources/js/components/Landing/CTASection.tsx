import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CTASection() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700">
            
            {/* Decorative blobs */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

            <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
                
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Mulai Diagnosis Awal Lebih Cepat & Akurat
                </h2>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                    Gunakan SapiDoc untuk membantu mendeteksi potensi gangguan kesehatan sapi sejak dini sebelum menjadi lebih parah.
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                    <Link
                        href="/diagnosis"
                        className="group inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300"
                    >
                        Mulai Sekarang
                        <ArrowRight
                            size={20}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* small note */}
                <p className="text-xs text-white/70">
                    Gratis • Cepat • Bisa digunakan kapan saja
                </p>
            </div>
        </section>
    );
}