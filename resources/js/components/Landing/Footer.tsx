import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer
            id="contact"
            className="relative bg-gray-950 text-gray-400 overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">

                {/* Main Footer */}
                <div className="flex flex-col lg:flex-row justify-between gap-12">

                    {/* Left Content */}
                    <div className="max-w-md space-y-5">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/logo.png"
                                alt="SapiDoc Logo"
                                className="h-12 w-12 rounded-2xl shadow-md"
                            />

                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    SapiDoc
                                </h3>

                                <p className="text-sm text-emerald-400">
                                    Sistem Pakar Diagnosis Penyakit Sapi
                                </p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            SapiDoc merupakan sistem pakar berbasis web yang membantu peternak melakukan diagnosis awal penyakit sapi menggunakan metode 
                            <span className="text-emerald-400 font-medium">
                                {' '}Certainty Factor
                            </span>{' '}
                            sebagai pendukung pengambilan keputusan sebelum pemeriksaan lebih lanjut oleh dokter hewan.
                        </p>

                        <Link
                            href="/diagnosis"
                            className="inline-flex items-center gap-2             bg-emerald-600 hover:bg-emerald-700                        text-white px-5 py-3 rounded-2xl                        font-medium transition shadow-lg                               shadow-emerald-900/30"
                        >
                            Mulai Diagnosis
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Right Menu */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

                        {/* Navigation */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Navigasi
                            </h4>

                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a
                                        href="#home"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Beranda
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#features"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Keunggulan
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#cara-kerja"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Cara Kerja
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#penyakit"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Penyakit
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* System */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Fitur Sistem
                            </h4>

                            <ul className="space-y-3 text-sm">
                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Diagnosis Awal
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Rekomendasi Penyakit
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Tingkat Keyakinan (CF)
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Informasi Penyakit
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Kontak
                            </h4>

                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <Mail
                                        size={18}
                                        className="text-emerald-400 mt-0.5"
                                    />

                                    <span>
                                        -
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-emerald-400 mt-0.5"
                                    />

                                    <span>
                                        Petanahan, Kebumen
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 border-t border-gray-800 pt-6">
                    <div className="flex flex-col gap-4 text-sm md:flex-row md:items-start md:justify-between md:gap-8">
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-gray-500">
                                © {new Date().getFullYear()} SapiDoc
                            </p>

                            <p className="text-gray-600 max-w-md">
                                Mendukung peternak dalam melakukan diagnosis awal penyakit sapi melalui pemanfaatan teknologi sistem pakar.
                            </p>
                        </div>

                        <p className="text-gray-500 text-center md:max-w-xs md:text-right">
                            Dikembangkan menggunakan Laravel • Inertia.js • React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}