'use client';

import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';

interface Gejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  keterangan: string;
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
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    kode_gejala: '',
    nama_gejala: '',
    kategori: '',
    keterangan: '',
  });

  // Fetch gejala data
  const fetchGejala = async (page: number = 1, searchTerm: string = '', kategori: string = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (kategori) params.append('kategori', kategori);
      params.append('page', page.toString());

      const response = await fetch(`/admin/api/gejala?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Gagal mengambil data gejala');
      }

      const result = await response.json();
      setGejalaData(result.data);
      setPagination(result.pagination);
      setCurrentPage(result.pagination.current_page);
    } catch (err) {
      console.error('Error fetching gejala:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGejala(1, search, kategoriFilter);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGejala(1, search, kategoriFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      fetchGejala(1, '', kategoriFilter);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setKategoriFilter(value);
    fetchGejala(1, search, value);
  };

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
      fetchGejala(currentPage, search, kategoriFilter);
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
      fetchGejala(currentPage, search, kategoriFilter);
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

  if (isLoading && gejalaData.length === 0) {
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
      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari gejala..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Cari
          </button>
        </form>

        <select
          value={kategoriFilter}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Semua Kategori</option>
          {KATEGORI_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

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
          <>
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

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} data
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => fetchGejala(currentPage - 1, search, kategoriFilter)}
                    className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => fetchGejala(page, search, kategoriFilter)}
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
                    onClick={() => fetchGejala(currentPage + 1, search, kategoriFilter)}
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
          <p className="text-gray-500">Tidak ada data gejala</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
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
