'use client';

import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';

interface Aturan {
  id: number;
  penyakit_id: number;
  gejala_id: number;
  penyakit: string;
  gejala: string;
  nilai_mb: number;
  nilai_md: number;
  catatan_pakar?: string;
}

interface FormData {
  penyakit_id: string;
  gejala_id: string;
  nilai_mb: string;
  nilai_md: string;
  catatan_pakar: string;
}

interface Option {
  id: number;
  nama_penyakit?: string;
  nama_gejala?: string;
}

export default function AturanPage() {
  const [aturanData, setAturanData] = useState<Aturan[]>([]);
  const [penyakits, setPenyakits] = useState<Option[]>([]);
  const [gejalas, setGejalas] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    penyakit_id: '',
    gejala_id: '',
    nilai_mb: '',
    nilai_md: '',
    catatan_pakar: '',
  });

  // Fetch aturan data and options
  const fetchAturanData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [aturanRes, optionsRes] = await Promise.all([
        fetch('/admin/api/aturan'),
        fetch('/admin/api/aturan/options'),
      ]);

      if (!aturanRes.ok || !optionsRes.ok) {
        throw new Error('Gagal mengambil data aturan');
      }

      const aturanResult = await aturanRes.json();
      const optionsResult = await optionsRes.json();

      setAturanData(aturanResult.data);
      setPenyakits(optionsResult.penyakits);
      setGejalas(optionsResult.gejalas);
    } catch (err) {
      console.error('Error fetching aturan:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAturanData();
  }, []);

  const handleTambah = () => {
    setEditingId(null);
    setFormData({
      penyakit_id: '',
      gejala_id: '',
      nilai_mb: '',
      nilai_md: '',
      catatan_pakar: '',
    });
    setShowModal(true);
  };

  const handleEdit = (aturan: Aturan) => {
    setEditingId(aturan.id);
    setFormData({
      penyakit_id: aturan.penyakit_id.toString(),
      gejala_id: aturan.gejala_id.toString(),
      nilai_mb: aturan.nilai_mb.toString(),
      nilai_md: aturan.nilai_md.toString(),
      catatan_pakar: aturan.catatan_pakar || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus aturan ini?')) {
      return;
    }

    try {
      const response = await fetch(`/admin/api/aturan/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus aturan');
      }

      // Refresh data
      fetchAturanData();
    } catch (err) {
      console.error('Error deleting aturan:', err);
      alert(err instanceof Error ? err.message : 'Gagal menghapus aturan');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.penyakit_id || !formData.gejala_id || !formData.nilai_mb || !formData.nilai_md) {
      alert('Semua field wajib diisi');
      return;
    }

    const nilaiMb = parseFloat(formData.nilai_mb);
    const nilaiMd = parseFloat(formData.nilai_md);

    if (isNaN(nilaiMb) || isNaN(nilaiMd) || nilaiMb < 0 || nilaiMb > 1 || nilaiMd < 0 || nilaiMd > 1) {
      alert('Nilai MB dan MD harus berada antara 0-1');
      return;
    }

    try {
      setIsSaving(true);

      const url = editingId 
        ? `/admin/api/aturan/${editingId}` 
        : '/admin/api/aturan';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          penyakit_id: parseInt(formData.penyakit_id),
          gejala_id: parseInt(formData.gejala_id),
          nilai_mb: nilaiMb,
          nilai_md: nilaiMd,
          catatan_pakar: formData.catatan_pakar || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan aturan');
      }

      // Refresh data dan close modal
      fetchAturanData();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving aturan:', err);
      alert(err instanceof Error ? err.message : 'Gagal menyimpan aturan');
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'penyakit', label: 'Penyakit' },
    { key: 'gejala', label: 'Gejala' },
    {
      key: 'nilai_mb',
      label: 'MB',
      render: (value: number) => value.toFixed(2),
    },
    {
      key: 'nilai_md',
      label: 'MD',
      render: (value: number) => value.toFixed(2),
    },
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
          Tambah Aturan
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Aturan (Basis Pengetahuan)</h3>
        {aturanData.length > 0 ? (
          <Table
            columns={columns}
            data={aturanData}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(row as Aturan)}
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
          <p className="text-gray-500">Tidak ada data aturan</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Aturan' : 'Tambah Aturan Baru'}
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
                  Penyakit
                </label>
                <select
                  value={formData.penyakit_id}
                  onChange={(e) =>
                    setFormData({ ...formData, penyakit_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Pilih Penyakit --</option>
                  {penyakits.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama_penyakit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gejala
                </label>
                <select
                  value={formData.gejala_id}
                  onChange={(e) =>
                    setFormData({ ...formData, gejala_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Pilih Gejala --</option>
                  {gejalas.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nama_gejala}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nilai MB (0-1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.nilai_mb}
                    onChange={(e) =>
                      setFormData({ ...formData, nilai_mb: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nilai MD (0-1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.nilai_md}
                    onChange={(e) =>
                      setFormData({ ...formData, nilai_md: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan Pakar (Opsional)
                </label>
                <textarea
                  value={formData.catatan_pakar}
                  onChange={(e) =>
                    setFormData({ ...formData, catatan_pakar: e.target.value })
                  }
                  placeholder="Masukkan catatan..."
                  rows={3}
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
