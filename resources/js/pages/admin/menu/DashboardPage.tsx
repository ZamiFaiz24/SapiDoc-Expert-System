'use client';

import { Pill, Stethoscope, Zap, FileText } from 'lucide-react';
import StatCard from '@/components/StatCard';
import Table from '@/components/Table';

export default function DashboardPage() {
  const diagnosisData = [
    {
      id: 1,
      tanggal: '2024-01-15',
      user: 'Petani Ahmad',
      gejala: 3,
      hasil: 'Penyakit Mastitis',
      cf: '85%',
    },
    {
      id: 2,
      tanggal: '2024-01-14',
      user: 'Petani Budi',
      gejala: 4,
      hasil: 'Penyakit Diare',
      cf: '92%',
    },
    {
      id: 3,
      tanggal: '2024-01-13',
      user: 'Petani Citra',
      gejala: 2,
      hasil: 'Penyakit Radang Ambing',
      cf: '78%',
    },
    {
      id: 4,
      tanggal: '2024-01-12',
      user: 'Petani Dedi',
      gejala: 5,
      hasil: 'Penyakit Pneumonia',
      cf: '88%',
    },
    {
      id: 5,
      tanggal: '2024-01-11',
      user: 'Petani Eka',
      gejala: 3,
      hasil: 'Penyakit Foot and Mouth',
      cf: '81%',
    },
  ];

  const diagnosisColumns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'user', label: 'Nama User' },
    { key: 'gejala', label: 'Jumlah Gejala' },
    { key: 'hasil', label: 'Hasil Penyakit' },
    { key: 'cf', label: 'CF / Persentase' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Penyakit"
          value="24"
          icon={Pill}
          color="emerald"
        />
        <StatCard
          title="Total Gejala"
          value="156"
          icon={Stethoscope}
          color="blue"
        />
        <StatCard
          title="Total Aturan"
          value="89"
          icon={Zap}
          color="purple"
        />
        <StatCard
          title="Total Diagnosis"
          value="342"
          icon={FileText}
          color="orange"
        />
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Diagnosis Terbaru</h3>
        <Table columns={diagnosisColumns} data={diagnosisData} />
      </div>
    </div>
  );
}
