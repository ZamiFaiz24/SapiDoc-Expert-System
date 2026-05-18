'use client';

import { Pill, Stethoscope, Zap, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import Table from '@/components/Table';

interface DiagnosisData {
  id: number;
  tanggal: string;
  user: string;
  gejala: number;
  hasil: string;
  cf: string;
}

interface DashboardStats {
  total_penyakit: number;
  total_gejala: number;
  total_aturan: number;
  total_diagnosis: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total_penyakit: 0,
    total_gejala: 0,
    total_aturan: 0,
    total_diagnosis: 0,
  });
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [statsRes, diagnosesRes] = await Promise.all([
          fetch('/admin/api/dashboard/stats'),
          fetch('/admin/api/dashboard/diagnoses'),
        ]);

        if (!statsRes.ok || !diagnosesRes.ok) {
          throw new Error('Gagal mengambil data dashboard');
        }

        const statsData = await statsRes.json();
        const diagnosesData = await diagnosesRes.json();

        setStats(statsData);
        setDiagnosisData(diagnosesData.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const diagnosisColumns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'user', label: 'Nama User' },
    { key: 'gejala', label: 'Jumlah Gejala' },
    { key: 'hasil', label: 'Hasil Penyakit' },
    { key: 'cf', label: 'CF / Persentase' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Penyakit"
          value={stats.total_penyakit.toString()}
          icon={Pill}
          color="emerald"
        />
        <StatCard
          title="Total Gejala"
          value={stats.total_gejala.toString()}
          icon={Stethoscope}
          color="blue"
        />
        <StatCard
          title="Total Aturan"
          value={stats.total_aturan.toString()}
          icon={Zap}
          color="purple"
        />
        <StatCard
          title="Total Diagnosis"
          value={stats.total_diagnosis.toString()}
          icon={FileText}
          color="orange"
        />
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Diagnosis Terbaru</h3>
        {diagnosisData.length > 0 ? (
          <Table columns={diagnosisColumns} data={diagnosisData} />
        ) : (
          <p className="text-gray-500">Tidak ada data diagnosis</p>
        )}
      </div>
    </div>
  );
}
