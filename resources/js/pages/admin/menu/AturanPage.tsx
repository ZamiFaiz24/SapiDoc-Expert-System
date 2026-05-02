'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Table from '@/components/Table';

export default function AturanPage() {
  const [aturanData] = useState([
    {
      id: 1,
      penyakit: 'Mastitis',
      gejala: 'Pembengkakan Ambing',
      cf: 0.8,
    },
    {
      id: 2,
      penyakit: 'Mastitis',
      gejala: 'Suhu Tubuh Tinggi',
      cf: 0.6,
    },
    {
      id: 3,
      penyakit: 'Diare',
      gejala: 'Feses Encer',
      cf: 0.95,
    },
    {
      id: 4,
      penyakit: 'Diare',
      gejala: 'Nafsu Makan Berkurang',
      cf: 0.7,
    },
    {
      id: 5,
      penyakit: 'Pneumonia',
      gejala: 'Kesulitan Bernapas',
      cf: 0.85,
    },
    {
      id: 6,
      penyakit: 'Pneumonia',
      gejala: 'Cairan Dari Hidung',
      cf: 0.75,
    },
    {
      id: 7,
      penyakit: 'Foot and Mouth',
      gejala: 'Luka Pada Mulut',
      cf: 0.9,
    },
    {
      id: 8,
      penyakit: 'Foot and Mouth',
      gejala: 'Pincang',
      cf: 0.8,
    },
  ]);

  const columns = [
    { key: 'penyakit', label: 'Penyakit' },
    { key: 'gejala', label: 'Gejala' },
    {
      key: 'cf',
      label: 'Nilai CF',
      render: (value: number) => value.toFixed(2),
    },
  ];

  const handleEdit = (id: number) => {
    alert(`Edit aturan ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Hapus aturan ID: ${id}`);
  };

  const handleTambah = () => {
    alert('Tambah aturan baru');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          <Plus size={20} />
          Tambah Aturan
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Aturan</h3>
        <Table
          columns={columns}
          data={aturanData}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(row.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
