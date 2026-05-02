'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import DashboardPage from '@/pages/admin/menu/DashboardPage';
import PenyakitPage from '@/pages/admin/menu/PenyakitPage';
import GejalaPage from '@/pages/admin/menu/GejalaPage';
import AturanPage from '@/pages/admin/menu/AturanPage';
import DiagnosisPage from '@/pages/admin/menu/DiagnosisPage';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    penyakit: 'Data Penyakit',
    gejala: 'Data Gejala',
    aturan: 'Data Aturan',
    diagnosis: 'Riwayat Diagnosis',
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardPage />;
      case 'penyakit':
        return <PenyakitPage />;
      case 'gejala':
        return <GejalaPage />;
      case 'aturan':
        return <AturanPage />;
      case 'diagnosis':
        return <DiagnosisPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar title={menuTitles[activeMenu]} />

        <main className="flex-1 overflow-auto p-6 md:p-8 sm:p-4 pt-20 md:pt-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
