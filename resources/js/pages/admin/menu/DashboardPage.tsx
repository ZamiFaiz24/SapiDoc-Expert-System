'use client';

import { ShieldAlert, Stethoscope, Waypoints, ClipboardList } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
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

interface ChartDataPoint {
  name: string;
  value: number;
}

const COLORS = ['#2563eb', '#f97316', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total_penyakit: 0,
    total_gejala: 0,
    total_aturan: 0,
    total_diagnosis: 0,
  });
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData[]>([]);
  const [topPenyakit, setTopPenyakit] = useState<ChartDataPoint[]>([]);
  const [diagnosisBySapi, setDiagnosisBySapi] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [statsRes, diagnosesRes, topPenyakitRes, sapiRes] = await Promise.all([
          fetch('/admin/api/dashboard/stats'),
          fetch('/admin/api/dashboard/diagnoses'),
          fetch('/admin/api/chart/top-penyakit'),
          fetch('/admin/api/chart/diagnosis-by-sapi'),
        ]);

        if (!statsRes.ok || !diagnosesRes.ok || !topPenyakitRes.ok || !sapiRes.ok) {
          throw new Error('Gagal mengambil data dashboard');
        }

        const statsData = await statsRes.json();
        const diagnosesData = await diagnosesRes.json();
        const topPenyakitData = await topPenyakitRes.json();
        const sapiData = await sapiRes.json();

        setStats(statsData);
        setDiagnosisData(diagnosesData.data);
        setTopPenyakit(topPenyakitData.data);
        setDiagnosisBySapi(sapiData.data);
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
          icon={ShieldAlert}
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
          icon={Waypoints}
          color="purple"
        />
        <StatCard
          title="Total Diagnosis"
          value={stats.total_diagnosis.toString()}
          icon={ClipboardList}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Penyakit - Donut Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Top 5 Penyakit</h3>
          {topPenyakit.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Chart */}
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={topPenyakit}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {topPenyakit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} kasus`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {(() => {
                  const total = topPenyakit.reduce((sum, d) => sum + d.value, 0);
                  return topPenyakit.map((entry, index) => {
                    const percent = ((entry.value / total) * 100).toFixed(0);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-3 h-3 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm text-gray-700 truncate">{entry.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 flex-shrink-0 ml-2">
                          {entry.value} <span className="text-gray-400 font-normal">({percent}%)</span>
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Tidak ada data penyakit</p>
          )}
        </div>

        {/* Diagnosis by Jenis Sapi - Bar Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Diagnosis by Jenis Sapi</h3>
          {diagnosisBySapi.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diagnosisBySapi}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(value) => `${value} kasus`} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {diagnosisBySapi.map((entry, index) => (
                    <Cell key={`bar-cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Tidak ada data sapi</p>
          )}
        </div>
      </div>

      {/* Recent Diagnosis Table */}
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
