'use client';

import { LayoutDashboard, ShieldAlert, Stethoscope, Waypoints, ClipboardList, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'penyakit', label: 'Penyakit', icon: ShieldAlert },
    { id: 'gejala', label: 'Gejala', icon: Stethoscope },
    { id: 'aturan', label: 'Aturan', icon: Waypoints },
    { id: 'diagnosis', label: 'Diagnosis', icon: ClipboardList },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 md:translate-x-0 shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-400 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/images/logo.png"
              alt="SapiDoc Logo"
              className="h-14 w-14 rounded-full shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">SapiDoc</h1>
              <p className="text-xs text-emerald-100">
                Sistem Pakar Penyakit Sapi
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              Administrator
            </p>
            <p className="text-xs text-gray-500">
              Sistem Pakar CF
            </p>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
