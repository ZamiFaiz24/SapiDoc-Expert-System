'use client';

import {Link} from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import {
  LogOut,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {title}
          </h1>

          <p className="text-xs text-gray-500">
            Kelola data sistem pakar diagnosa penyakit sapi
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Profile Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-white shadow-md">
                A
              </div>

              {/* User Info */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="font-semibold text-gray-800">
                    Admin User
                  </p>

                  <p className="text-xs text-gray-500">
                    Administrator
                  </p>
                </div>

                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <User size={18} />
                  Profil
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <Settings size={18} />
                  Pengaturan
                </button>

                <div className="border-t border-gray-100">
                  <Link
                    href={route('admin.logout')}
                    method="post"
                    as="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}