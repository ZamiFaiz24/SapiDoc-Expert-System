'use client';

import { Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';

interface DiagnosisItem {
  id: number;
  tanggal: string;
  user: string;
  gejala: number;
  hasil: string;
  cf: number;
}

interface DiagnosisDetail {
  id: number;
  tanggal: string;
  user: string;
  gejala: number;
  hasil: string;
  cf: number;
  alamat: string;
  no_hp: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
  gejala_input: Array<{ gejala_id: number; cf_user: number }>;
  diagnosis_banding: Array<{ penyakit_id: number; nama_penyakit: string; cf_score: number }>;
}

export default function DiagnosisPage() {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<DiagnosisDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch diagnosis data
  const fetchDiagnosis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/admin/api/diagnosis/all');

      if (!response.ok) {
        throw new Error('Gagal mengambil data diagnosis');
      }

      const result = await response.json();
      setDiagnosisData(result.data);
    } catch (err) {
      console.error('Error fetching diagnosis:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnosis();
  }, []);

  const handleDetail = (id: number) => {
    const detail = diagnosisData.find(d => d.id === id) as unknown as DiagnosisDetail;
    if (detail) {
      setSelectedDetail(detail);
      setIsModalOpen(true);
    }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'user', label: 'Nama User' },
    { key: 'gejala', label: 'Jumlah Gejala' },
    { key: 'hasil', label: 'Hasil Penyakit' },
    {
      key: 'cf',
      label: 'CF / Persentase',
      render: (value: number) => `${value}%`,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
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
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Diagnosis</h3>
        {diagnosisData.length > 0 ? (
          <Table
            columns={columns}
            data={diagnosisData}
            actions={(row) => (
              <button
                onClick={() => handleDetail(row.id)}
                className="flex items-center gap-2 px-3 py-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-sm font-medium"
              >
                <Eye size={16} />
                Detail
              </button>
            )}
          />
        ) : (
          <p className="text-gray-500">Tidak ada data diagnosis</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDetail(null);
        }}
        title="Detail Diagnosis"
      >
        {selectedDetail && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-semibold text-gray-900">{selectedDetail.tanggal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama User</p>
                <p className="font-semibold text-gray-900">{selectedDetail.user}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Alamat</p>
                <p className="font-semibold text-gray-800">{selectedDetail.alamat}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">No. HP</p>
                <p className="font-semibold text-gray-800">{selectedDetail.no_hp}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Jenis Sapi</p>
                <p className="font-semibold text-gray-800">
                  {selectedDetail.jenis_sapi === 'perah' ? 'Sapi Perah' : 'Sapi Potong'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Jenis Kelamin</p>
                <p className="font-semibold text-gray-800 capitalize">{selectedDetail.jenis_kelamin}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Umur Kategori</p>
                <p className="font-semibold text-gray-800">{selectedDetail.umur_kategori}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Gejala yang Dipilih ({selectedDetail.gejala} gejala):
              </p>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                <p>Total gejala input: {selectedDetail.gejala_input.length}</p>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Hasil Diagnosis Utama</p>
              <p className="text-2xl font-bold text-emerald-600">{selectedDetail.hasil}</p>
              <p className="text-sm text-gray-600 mt-2">
                Nilai CF: {selectedDetail.cf}% ({(selectedDetail.cf / 100).toFixed(2)})
              </p>
            </div>

            {selectedDetail.diagnosis_banding && selectedDetail.diagnosis_banding.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Diagnosis Banding:</p>
                <div className="space-y-2">
                  {selectedDetail.diagnosis_banding.map((diag, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700">{diag.nama_penyakit}</span>
                      <span className="text-sm font-semibold text-gray-600">
                        {(diag.cf_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

