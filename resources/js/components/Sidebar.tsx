'use client';

import { LayoutDashboard, Pill, Stethoscope, Zap, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'penyakit', label: 'Penyakit', icon: Pill },
    { id: 'gejala', label: 'Gejala', icon: Stethoscope },
    { id: 'aturan', label: 'Aturan', icon: Zap },
    { id: 'diagnosis', label: 'Diagnosis', icon: FileText },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transition-transform duration-300 z-30 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-emerald-400">CattleCare</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
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
