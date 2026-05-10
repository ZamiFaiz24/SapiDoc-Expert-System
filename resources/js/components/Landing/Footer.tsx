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
                                    Smart Livestock Diagnosis
                                </p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Sistem pakar diagnosis penyakit sapi berbasis
                            <span className="text-emerald-400 font-medium">
                                {' '}Certainty Factor
                            </span>{' '}
                            untuk membantu peternak melakukan deteksi dini
                            penyakit ternak secara cepat dan mudah.
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
                                Sistem
                            </h4>

                            <ul className="space-y-3 text-sm">
                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Diagnosis Awal
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Certainty Factor
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Informasi Penyakit
                                </li>

                                <li className="hover:text-emerald-400 transition cursor-default">
                                    Deteksi Gejala
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
                                        sapidoc@kebumen.id
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
                <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p className="text-gray-500 text-center md:text-left">
                        © {new Date().getFullYear()} SapiDoc. All rights reserved.
                    </p>

                    <p className="text-gray-600 text-center md:text-right">
                        Built with Laravel, Inertia & React.
                    </p>
                </div>
            </div>
        </footer>
    );
}