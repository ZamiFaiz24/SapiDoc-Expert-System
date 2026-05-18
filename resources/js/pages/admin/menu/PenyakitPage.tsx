'use client';

import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';

interface Penyakit {
  id: number;
  kode_penyakit: string;
  nama_penyakit: string;
  deskripsi: string;
}

interface FormData {
  kode_penyakit: string;
  nama_penyakit: string;
  deskripsi: string;
}

export default function PenyakitPage() {
  const [penyakitData, setPenyakitData] = useState<Penyakit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    kode_penyakit: '',
    nama_penyakit: '',
    deskripsi: '',
  });

  // Fetch penyakit data
  const fetchPenyakit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/admin/api/penyakit');

      if (!response.ok) {
        throw new Error('Gagal mengambil data penyakit');
      }

      const result = await response.json();
      setPenyakitData(result.data);
    } catch (err) {
      console.error('Error fetching penyakit:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPenyakit();
  }, []);

  const handleTambah = () => {
    setEditingId(null);
    setFormData({
      kode_penyakit: '',
      nama_penyakit: '',
      deskripsi: '',
    });
    setShowModal(true);
  };

  const handleEdit = (penyakit: Penyakit) => {
    setEditingId(penyakit.id);
    setFormData({
      kode_penyakit: penyakit.kode_penyakit,
      nama_penyakit: penyakit.nama_penyakit,
      deskripsi: penyakit.deskripsi,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus penyakit ini?')) {
      return;
    }

    try {
      const response = await fetch(`/admin/api/penyakit/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus penyakit');
      }

      // Refresh data
      fetchPenyakit();
    } catch (err) {
      console.error('Error deleting penyakit:', err);
      alert(err instanceof Error ? err.message : 'Gagal menghapus penyakit');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.kode_penyakit || !formData.nama_penyakit || !formData.deskripsi) {
      alert('Semua field harus diisi');
      return;
    }

    try {
      setIsSaving(true);

      const url = editingId 
        ? `/admin/api/penyakit/${editingId}` 
        : '/admin/api/penyakit';
      
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
        throw new Error(errorData.message || 'Gagal menyimpan penyakit');
      }

      // Refresh data dan close modal
      fetchPenyakit();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving penyakit:', err);
      alert(err instanceof Error ? err.message : 'Gagal menyimpan penyakit');
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'kode_penyakit', label: 'Kode Penyakit' },
    { key: 'nama_penyakit', label: 'Nama Penyakit' },
    { key: 'deskripsi', label: 'Deskripsi' },
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
          Tambah Penyakit
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Penyakit</h3>
        {penyakitData.length > 0 ? (
          <Table
            columns={columns}
            data={penyakitData}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(row as Penyakit)}
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
          <p className="text-gray-500">Tidak ada data penyakit</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Penyakit' : 'Tambah Penyakit Baru'}
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
                  Kode Penyakit
                </label>
                <input
                  type="text"
                  value={formData.kode_penyakit}
                  onChange={(e) =>
                    setFormData({ ...formData, kode_penyakit: e.target.value })
                  }
                  placeholder="Contoh: P001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={editingId !== null}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Penyakit
                </label>
                <input
                  type="text"
                  value={formData.nama_penyakit}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_penyakit: e.target.value })
                  }
                  placeholder="Contoh: Mastitis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  placeholder="Masukkan deskripsi penyakit..."
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
