'use client';

import { Bell, User, LogOut } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:px-6 sm:px-4">
      <h2 className="text-2xl font-bold text-gray-800 md:text-xl">{title}</h2>

      <div className="flex items-center gap-6 md:gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
