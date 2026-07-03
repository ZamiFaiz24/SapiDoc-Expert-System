'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
            setActiveSection(id);
        }
    };

    useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
}, []);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link
                        href="/"
                        >
                            <img
                                src="/images/logo.png"
                                alt="SapiDoc Logo"
                                className="h-11 w-11 rounded-full shadow-sm"
                            />
                        </Link>
                        <span className="font-bold text-xl text-emerald-600 tracking-tight">
                            SapiDoc
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">

                        {[
                            ['home', 'Beranda'],
                            ['features', 'Keunggulan'],
                            ['cara-kerja', 'Cara Kerja'],
                            ['penyakit', 'Penyakit'],
                            ['gallery', 'Galeri'],
                            ['about', 'Tentang'],
                        ].map(([id, label]) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`relative transition group ${
                                    activeSection === id
                                        ? 'text-emerald-600 font-semibold'
                                        : 'text-gray-600 hover:text-emerald-600'
                                }`}
                            >
                                {label}
                                <span
                                className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-500 transition-all ${
                                    activeSection === id
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                }`}
                            />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col gap-2 pt-2">

                        {[
                            ['home', 'Beranda'],
                            ['features', 'Keunggulan'],
                            ['cara-kerja', 'Cara Kerja'],
                            ['penyakit', 'Penyakit'],
                            ['gallery', 'Galeri'],
                            ['about', 'Tentang'],
                        ].map(([id, label]) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`text-left px-3 py-2 rounded-lg transition ${
                                    activeSection === id
                                        ? 'text-emerald-600 font-semibold bg-emerald-100'
                                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}