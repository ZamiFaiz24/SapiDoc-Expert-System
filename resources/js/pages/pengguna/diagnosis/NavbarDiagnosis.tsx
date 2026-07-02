'use client';

import { useState } from 'react';
import { ChevronLeft, Menu, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface DiagnosisNavbarProps {
    onOpenGuide: () => void;
    showBackAction?: boolean;
    onBackAction?: () => void;
}

export default function DiagnosisNavbar({
    onOpenGuide,
    showBackAction = false,
    onBackAction,
}: DiagnosisNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

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

                        <div className="leading-tight">
                            <h1 className="text-xl font-bold tracking-tight text-emerald-600">
                                SapiDoc
                            </h1>

                            <p className="text-xs text-gray-500">
                                Diagnosis Penyakit Sapi
                            </p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-4 text-sm font-medium md:flex md:ml-4">

                        <Link
                            href="/"
                            className="relative text-gray-600 transition hover:text-emerald-600 group"
                        >
                            Beranda
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all group-hover:w-full" />
                        </Link>

                        <button
                            onClick={onOpenGuide}
                            className="relative text-gray-600 transition hover:text-emerald-600 group"
                        >
                            Panduan
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all group-hover:w-full" />
                        </button>

                        {showBackAction && onBackAction && (
                            <button
                                onClick={onBackAction}
                                className="relative text-gray-600 transition hover:text-emerald-600 group"
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    <ChevronLeft size={16} />
                                    Kembali
                                </span>
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all group-hover:w-full" />
                            </button>
                        )}

                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-lg p-2 transition hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                        isMenuOpen
                            ? 'max-h-52 opacity-100 pb-4'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col gap-2 pt-2">

                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-2 text-left text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            Beranda
                        </Link>

                        <button
                            onClick={() => {
                                onOpenGuide();
                                closeMenu();
                            }}
                            className="rounded-lg px-3 py-2 text-left text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            Panduan
                        </button>

                        {showBackAction && onBackAction && (
                            <button
                                onClick={() => {
                                    onBackAction();
                                    closeMenu();
                                }}
                                className="rounded-lg px-3 py-2 text-left text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    <ChevronLeft size={18} />
                                    Kembali
                                </span>
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}