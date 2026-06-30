'use client';

import { useState } from 'react';
import { Menu, X, Home, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface DiagnosisNavbarProps {
    onOpenGuide: () => void;
}

export default function DiagnosisNavbar({
    onOpenGuide,
}: DiagnosisNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="SapiDoc Logo"
                            className="h-11 w-11 rounded-full shadow-sm"
                        />

                        <div>
                            <h1 className="font-bold text-xl text-emerald-600 tracking-tight">
                                SapiDoc
                            </h1>

                            <p className="text-xs text-gray-500">
                                Diagnosis Penyakit Sapi
                            </p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-3">

                        <button
                            onClick={onOpenGuide}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <BookOpen size={18} />
                            Panduan
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Home size={18} />
                            Beranda
                        </Link>

                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-lg p-2 transition hover:bg-gray-100"
                        >
                            {isMenuOpen ? (
                                <X size={22} />
                            ) : (
                                <Menu size={22} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                        isMenuOpen
                            ? 'max-h-40 opacity-100 pb-4'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col gap-2 pt-2">

                        <button
                            onClick={() => {
                                onOpenGuide();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <BookOpen size={18} />
                            Panduan
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Home size={18} />
                            Beranda
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}