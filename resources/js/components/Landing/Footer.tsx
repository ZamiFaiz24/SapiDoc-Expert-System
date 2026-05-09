export default function Footer() {
    return (
        <footer id="contact" className="relative bg-gray-950 text-gray-400 py-14 overflow-hidden">

            {/* Background accent */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500/10 p-2 rounded-xl">
                                <img
                                    src="/images/logo.png"
                                    alt="SapiDoc Logo"
                                    className="h-10 w-10 rounded-lg"
                                />
                            </div>
                            <h3 className="text-white font-bold text-xl">SapiDoc</h3>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Sistem pakar diagnosis penyakit sapi berbasis <span className="text-emerald-400">Certainty Factor</span> untuk membantu deteksi dini secara cepat dan akurat.
                        </p>
                    </div>

                    {/* System */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Sistem</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="hover:text-emerald-400 transition">Diagnosis</a></li>
                            <li><a className="hover:text-emerald-400 transition">Gejala Penyakit</a></li>
                            <li><a className="hover:text-emerald-400 transition">Basis Pengetahuan</a></li>
                            <li><a className="hover:text-emerald-400 transition">Hasil Analisis</a></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Penelitian</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="hover:text-emerald-400 transition">Metode CF</a></li>
                            <li><a className="hover:text-emerald-400 transition">Forward Chaining</a></li>
                            <li><a className="hover:text-emerald-400 transition">Dokumentasi</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: sapidoc@kebumen.id</li>
                            <li>Phone: +62 812 3456 7890</li>
                            <li>Petanahan, Kebumen</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                    <p className="text-gray-500">
                        © {new Date().getFullYear()} SapiDoc — Built for livestock health intelligence.
                    </p>

                    <div className="flex gap-6 text-gray-500">
                        <a className="hover:text-white transition">Privacy</a>
                        <a className="hover:text-white transition">Terms</a>
                        <a className="hover:text-white transition">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}