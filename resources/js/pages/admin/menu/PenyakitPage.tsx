'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Table from '@/components/Table';

export default function PenyakitPage() {
  const [penyakitData] = useState([
    {
      id: 1,
      nama: 'Mastitis',
      deskripsi: 'Peradangan pada jaringan ambing yang disebabkan oleh infeksi bakteri',
    },
    {
      id: 2,
      nama: 'Diare',
      deskripsi: 'Gangguan pencernaan yang menyebabkan feses menjadi encer',
    },
    {
      id: 3,
      nama: 'Pneumonia',
      deskripsi: 'Infeksi pada paru-paru yang menyebabkan kesulitan bernapas',
    },
    {
      id: 4,
      nama: 'Foot and Mouth Disease',
      deskripsi: 'Penyakit menular yang menyerang kuku dan mulut hewan',
    },
    {
      id: 5,
      nama: 'Antraks',
      deskripsi: 'Penyakit yang disebabkan oleh bakteri Bacillus anthracis',
    },
    {
      id: 6,
      nama: 'Radang Ambing',
      deskripsi: 'Peradangan pada ambing akibat infeksi atau trauma',
    },
  ]);

  const columns = [
    { key: 'nama', label: 'Nama Penyakit' },
    { key: 'deskripsi', label: 'Deskripsi' },
  ];

  const handleEdit = (id: number) => {
    alert(`Edit penyakit ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Hapus penyakit ID: ${id}`);
  };

  const handleTambah = () => {
    alert('Tambah penyakit baru');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          <Plus size={20} />
          Tambah Penyakit
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Penyakit</h3>
        <Table
          columns={columns}
          data={penyakitData}
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
