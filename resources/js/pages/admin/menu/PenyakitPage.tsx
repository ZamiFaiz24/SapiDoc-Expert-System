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

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

interface FormData {
  kode_penyakit: string;
  nama_penyakit: string;
  deskripsi: string;
}

export default function PenyakitPage() {
  const [penyakitData, setPenyakitData] = useState<Penyakit[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
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
      setPagination(result.pagination);
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

  if (isLoading && penyakitData.length === 0) {
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
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Tambah Penyakit Baru
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Penyakit</h3>
        {penyakitData.length > 0 ? (
          <>
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
          </>
        ) : (
          <p className="text-gray-500">Tidak ada data penyakit</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Penyakit' : 'Tambah Penyakit Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-emerald-500 rounded-lg transition-colors text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Kode Penyakit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.kode_penyakit}
                    onChange={(e) =>
                      setFormData({ ...formData, kode_penyakit: e.target.value })
                    }
                    placeholder="Contoh: P001"
                    className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                    disabled={editingId !== null}
                  />
                  {editingId && (
                    <p className="text-xs text-gray-500 mt-1">Kode tidak dapat diubah</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Nama Penyakit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama_penyakit}
                    onChange={(e) =>
                      setFormData({ ...formData, nama_penyakit: e.target.value })
                    }
                    placeholder="Contoh: Mastitis"
                    className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.deskripsi}
                    onChange={(e) =>
                      setFormData({ ...formData, deskripsi: e.target.value })
                    }
                    placeholder="Jelaskan tentang penyakit ini..."
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 resize-none transition-colors"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
