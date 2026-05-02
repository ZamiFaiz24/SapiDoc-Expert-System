'use client';

import { Eye } from 'lucide-react';
import { useState } from 'react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';

interface DiagnosisDetail {
  id: number;
  tanggal: string;
  user: string;
  gejala: string[];
  hasil: string;
  cf: number;
}

export default function DiagnosisPage() {
  const [diagnosisData] = useState([
    {
      id: 1,
      tanggal: '2024-01-15',
      user: 'Petani Ahmad',
      gejala: 3,
      hasil: 'Mastitis',
      cf: 85,
    },
    {
      id: 2,
      tanggal: '2024-01-14',
      user: 'Petani Budi',
      gejala: 4,
      hasil: 'Diare',
      cf: 92,
    },
    {
      id: 3,
      tanggal: '2024-01-13',
      user: 'Petani Citra',
      gejala: 2,
      hasil: 'Radang Ambing',
      cf: 78,
    },
    {
      id: 4,
      tanggal: '2024-01-12',
      user: 'Petani Dedi',
      gejala: 5,
      hasil: 'Pneumonia',
      cf: 88,
    },
    {
      id: 5,
      tanggal: '2024-01-11',
      user: 'Petani Eka',
      gejala: 3,
      hasil: 'Foot and Mouth',
      cf: 81,
    },
  ]);

  const detailData: Record<number, DiagnosisDetail> = {
    1: {
      id: 1,
      tanggal: '2024-01-15',
      user: 'Petani Ahmad',
      gejala: ['Pembengkakan Ambing', 'Suhu Tubuh Tinggi', 'Cairan Berwarna'],
      hasil: 'Mastitis',
      cf: 85,
    },
    2: {
      id: 2,
      tanggal: '2024-01-14',
      user: 'Petani Budi',
      gejala: ['Feses Encer', 'Nafsu Makan Berkurang', 'Dehidrasi', 'Letargi'],
      hasil: 'Diare',
      cf: 92,
    },
    3: {
      id: 3,
      tanggal: '2024-01-13',
      user: 'Petani Citra',
      gejala: ['Pembengkakan Ambing', 'Kemerahan'],
      hasil: 'Radang Ambing',
      cf: 78,
    },
    4: {
      id: 4,
      tanggal: '2024-01-12',
      user: 'Petani Dedi',
      gejala: [
        'Kesulitan Bernapas',
        'Cairan Dari Hidung',
        'Batuk',
        'Suhu Tinggi',
        'Lemas',
      ],
      hasil: 'Pneumonia',
      cf: 88,
    },
    5: {
      id: 5,
      tanggal: '2024-01-11',
      user: 'Petani Eka',
      gejala: ['Luka Pada Mulut', 'Pincang', 'Aliran Air Liur Berlebih'],
      hasil: 'Foot and Mouth',
      cf: 81,
    },
  };

  const [selectedDetail, setSelectedDetail] = useState<DiagnosisDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetail = (id: number) => {
    setSelectedDetail(detailData[id]);
    setIsModalOpen(true);
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

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Diagnosis</h3>
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

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Gejala yang Dipilih:
              </p>
              <ul className="space-y-2">
                {selectedDetail.gejala.map((g, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Hasil Diagnosis</p>
              <p className="text-xl font-bold text-emerald-600">
                {selectedDetail.hasil}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Nilai CF: {selectedDetail.cf}% ({(selectedDetail.cf / 100).toFixed(2)})
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
