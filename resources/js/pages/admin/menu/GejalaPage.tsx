'use client';

import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';

interface Gejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  keterangan: string;
}

interface FormData {
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  keterangan: string;
}

const KATEGORI_OPTIONS = [
  { value: 'fisik', label: 'Fisik' },
  { value: 'tingkah_laku', label: 'Tingkah Laku' },
  { value: 'produksi', label: 'Produksi' },
];

export default function GejalaPage() {
  const [gejalaData, setGejalaData] = useState<Gejala[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    kode_gejala: '',
    nama_gejala: '',
    kategori: '',
    keterangan: '',
  });

  // Fetch gejala data
  const fetchGejala = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/admin/api/gejala');

      if (!response.ok) {
        throw new Error('Gagal mengambil data gejala');
      }

      const result = await response.json();
      setGejalaData(result.data);
    } catch (err) {
      console.error('Error fetching gejala:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGejala();
  }, []);

  const handleTambah = () => {
    setEditingId(null);
    setFormData({
      kode_gejala: '',
      nama_gejala: '',
      kategori: '',
      keterangan: '',
    });
    setShowModal(true);
  };

  const handleEdit = (gejala: Gejala) => {
    setEditingId(gejala.id);
    setFormData({
      kode_gejala: gejala.kode_gejala,
      nama_gejala: gejala.nama_gejala,
      kategori: gejala.kategori,
      keterangan: gejala.keterangan,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus gejala ini?')) {
      return;
    }

    try {
      const response = await fetch(`/admin/api/gejala/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus gejala');
      }

      // Refresh data
      fetchGejala();
    } catch (err) {
      console.error('Error deleting gejala:', err);
      alert(err instanceof Error ? err.message : 'Gagal menghapus gejala');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.kode_gejala || !formData.nama_gejala || !formData.kategori || !formData.keterangan) {
      alert('Semua field harus diisi');
      return;
    }

    try {
      setIsSaving(true);

      const url = editingId 
        ? `/admin/api/gejala/${editingId}` 
        : '/admin/api/gejala';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan gejala');
      }

      // Refresh data dan close modal
      fetchGejala();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving gejala:', err);
      alert(err instanceof Error ? err.message : 'Gagal menyimpan gejala');
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'kode_gejala', label: 'Kode Gejala' },
    { key: 'nama_gejala', label: 'Nama Gejala' },
    { key: 'kategori', label: 'Kategori' },
    { key: 'keterangan', label: 'Keterangan' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-100 h-10 rounded-lg animate-pulse"></div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
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
      <div className="flex justify-end">
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          <Plus size={20} />
          Tambah Gejala
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Gejala</h3>
        {gejalaData.length > 0 ? (
          <Table
            columns={columns}
            data={gejalaData}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(row as Gejala)}
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
        ) : (
          <p className="text-gray-500">Tidak ada data gejala</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Gejala' : 'Tambah Gejala Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kode Gejala
                </label>
                <input
                  type="text"
                  value={formData.kode_gejala}
                  onChange={(e) =>
                    setFormData({ ...formData, kode_gejala: e.target.value })
                  }
                  placeholder="Contoh: G001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={editingId !== null}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Gejala
                </label>
                <input
                  type="text"
                  value={formData.nama_gejala}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_gejala: e.target.value })
                  }
                  placeholder="Contoh: Pembengkakan Ambing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {KATEGORI_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keterangan
                </label>
                <textarea
                  value={formData.keterangan}
                  onChange={(e) =>
                    setFormData({ ...formData, keterangan: e.target.value })
                  }
                  placeholder="Masukkan keterangan gejala..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
