'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@inertiajs/react';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); // Close menu on mobile after clicking
        }
    };

    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
                <img src="/images/logo.png" alt="SapiDoc Logo" className="h-12 w-12 rounded-full" />
              <span className="font-bold text-xl text-emerald-600">SapiDoc</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Keunggulan
              </button>
              <button
                onClick={() => scrollToSection('cara-kerja')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => scrollToSection('penyakit')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Penyakit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Kontak
              </button>
              <Link href="/admin/login" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition inline-block">
                Masuk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-emerald-600"
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Keunggulan
              </button>
              <button
                onClick={() => scrollToSection('cara-kerja')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => scrollToSection('penyakit')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Penyakit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Kontak
              </button>
              <Link href="/admin/login" className="block w-full bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition text-center">
                Masuk
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
}  
