'use client';

import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Table from '@/components/Table';

export default function GejalaPage() {
  const [gejalaData] = useState([
    {
      id: 1,
      kode: 'G001',
      nama: 'Pembengkakan Ambing',
    },
    {
      id: 2,
      kode: 'G002',
      nama: 'Suhu Tubuh Tinggi',
    },
    {
      id: 3,
      kode: 'G003',
      nama: 'Feses Encer',
    },
    {
      id: 4,
      kode: 'G004',
      nama: 'Nafsu Makan Berkurang',
    },
    {
      id: 5,
      kode: 'G005',
      nama: 'Kesulitan Bernapas',
    },
    {
      id: 6,
      kode: 'G006',
      nama: 'Cairan Dari Hidung',
    },
    {
      id: 7,
      kode: 'G007',
      nama: 'Luka Pada Mulut',
    },
    {
      id: 8,
      kode: 'G008',
      nama: 'Pincang',
    },
  ]);

  const columns = [
    { key: 'kode', label: 'Kode Gejala' },
    { key: 'nama', label: 'Nama Gejala' },
  ];

  const handleEdit = (id: number) => {
    alert(`Edit gejala ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Hapus gejala ID: ${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Data Gejala</h3>
      <Table
        columns={columns}
        data={gejalaData}
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
  );
}
