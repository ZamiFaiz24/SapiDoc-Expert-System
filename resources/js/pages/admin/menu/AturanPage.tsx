'use client';

import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
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
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [penyakitFilter, setPenyakitFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    penyakit_id: '',
    gejala_id: '',
    nilai_mb: '',
    nilai_md: '',
    catatan_pakar: '',
  });

  // Fetch aturan data and options
  const fetchAturanData = async (page: number = 1, searchTerm: string = '', penyakitId: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (penyakitId) params.append('penyakit_id', penyakitId);
      params.append('page', page.toString());

      const [aturanRes, optionsRes] = await Promise.all([
        fetch(`/admin/api/aturan?${params.toString()}`),
        fetch('/admin/api/aturan/options'),
      ]);

      if (!aturanRes.ok || !optionsRes.ok) {
        throw new Error('Gagal mengambil data aturan');
      }

      const aturanResult = await aturanRes.json();
      const optionsResult = await optionsRes.json();

      setAturanData(aturanResult.data);
      setPagination(aturanResult.pagination);
      setCurrentPage(aturanResult.pagination.current_page);
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
    fetchAturanData(1, search, penyakitFilter);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAturanData(1, search, penyakitFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      fetchAturanData(1, '', penyakitFilter);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPenyakitFilter(value);
    fetchAturanData(1, search, value);
  };

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
      fetchAturanData(currentPage, search, penyakitFilter);
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
      fetchAturanData(currentPage, search, penyakitFilter);
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

  if (isLoading && aturanData.length === 0) {
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
      {/* Search & Filter Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-lg border border-emerald-200">
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Cari berdasarkan penyakit atau gejala..."
                className="w-full pl-12 pr-4 py-3 text-sm text-gray-800 bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm whitespace-nowrap"
            >
              Cari
            </button>
          </form>

          <select
            value={penyakitFilter}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm font-medium"
          >
            <option value="">Semua Penyakit</option>
            {penyakits.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_penyakit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Tambah Aturan Baru
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Aturan (Basis Pengetahuan)</h3>
        {aturanData.length > 0 ? (
          <>
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

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} data
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => fetchAturanData(currentPage - 1, search, penyakitFilter)}
                    className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => fetchAturanData(page, search, penyakitFilter)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === page
                            ? 'bg-emerald-500 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === pagination.last_page}
                    onClick={() => fetchAturanData(currentPage + 1, search, penyakitFilter)}
                    className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Tidak ada data aturan</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Aturan' : 'Tambah Aturan Baru'}
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
                    Penyakit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.penyakit_id}
                    onChange={(e) =>
                      setFormData({ ...formData, penyakit_id: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
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
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Gejala <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gejala_id}
                    onChange={(e) =>
                      setFormData({ ...formData, gejala_id: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                  >
                    <option value="">-- Pilih Gejala --</option>
                    {gejalas.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nama_gejala}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Nilai MB (0-1) <span className="text-red-500">*</span>
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
                      className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Nilai MD (0-1) <span className="text-red-500">*</span>
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
                      className="w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Catatan Pakar
                  </label>
                  <textarea
                    value={formData.catatan_pakar}
                    onChange={(e) =>
                      setFormData({ ...formData, catatan_pakar: e.target.value })
                    }
                    placeholder="Masukkan catatan pakar (opsional)..."
                    rows={3}
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
