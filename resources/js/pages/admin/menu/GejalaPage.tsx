'use client';

import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight, AlertCircle, Database, Activity, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  { value: 'Gejala Umum', label: 'Gejala Umum' },
  { value: 'Gejala Spesifik', label: 'Gejala Spesifik' },
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
  const [totalStats, setTotalStats] = useState({ total: 0, umum: 0, spesifik: 0 });
  const [formData, setFormData] = useState<FormData>({
    kode_gejala: '',
    nama_gejala: '',
    kategori: '',
    keterangan: '',
  });

  // Fetch total stats for all gejala
  const fetchTotalStats = async () => {
    try {
      const response = await fetch('/admin/api/gejala?per_page=10000');
      
      if (response.ok) {
        const result = await response.json();
        const allGejala = result.data;
        const umum = allGejala.filter((g: Gejala) => g.kategori === 'Gejala Umum').length;
        const spesifik = allGejala.filter((g: Gejala) => g.kategori === 'Gejala Spesifik').length;
        setTotalStats({
          total: result.pagination.total,
          umum,
          spesifik,
        });
      }
    } catch (err) {
      console.error('Error fetching total stats:', err);
    }
  };

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
    fetchTotalStats();
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

      // Refresh data and stats
      fetchGejala(currentPage, search, kategoriFilter);
      fetchTotalStats();
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
      fetchTotalStats();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving gejala:', err);
      alert(err instanceof Error ? err.message : 'Gagal menyimpan gejala');
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Search & Filter Section */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Cari berdasarkan kode atau nama gejala..."
                className="w-full pl-12 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm whitespace-nowrap"
            >
              Cari
            </button>
          </form>

          <select
            value={kategoriFilter}
            onChange={handleFilterChange}
            className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
          >
            <option value="">Semua Kategori</option>
            {KATEGORI_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-start gap-3">
            <Database className="text-gray-600 flex-shrink-0 mt-0.5" size={24} />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Gejala</p>
              <p className="text-3xl font-bold text-gray-800">{totalStats.total}</p>
            </div>
          </div>
        </div>

        {/* Gejala Umum */}
        <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
          <div className="flex items-start gap-3">
            <Activity className="text-emerald-600 flex-shrink-0 mt-0.5" size={24} />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-2">Gejala Umum</p>
              <p className="text-3xl font-bold text-emerald-700">{totalStats.umum}</p>
            </div>
          </div>
        </div>

        {/* Gejala Spesifik */}
        <div className="bg-white p-4 rounded-lg border border-indigo-200 shadow-sm">
          <div className="flex items-start gap-3">
            <Stethoscope className="text-indigo-600 flex-shrink-0 mt-0.5" size={24} />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-2">Gejala Spesifik</p>
              <p className="text-3xl font-bold text-indigo-700">{totalStats.spesifik}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Gejala Header & Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Data Gejala</h3>
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm shadow-md"
        >
          <Plus size={18} />
          Tambah Gejala
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
        {gejalaData.length > 0 ? (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-emerald-600 border-b border-gray-200">
                    <th className="px-5 py-5 whitespace-nowrap text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                    <th className="px-5 py-5 whitespace-nowrap text-left text-xs font-semibold text-white uppercase tracking-wider">Kode Gejala</th>
                    <th className="px-5 py-5 whitespace-nowrap text-left text-xs font-semibold text-white uppercase tracking-wider">Nama Gejala</th>
                    <th className="px-5 py-5 text-center text-xs font-semibold text-white uppercase tracking-wider">Kategori</th>
                    <th className="px-5 py-5 whitespace-nowrap text-left text-xs font-semibold text-white uppercase tracking-wider">Keterangan</th>
                    <th className="px-5 py-5 whitespace-nowrap text-center text-xs font-semibold text-white uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {gejalaData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-t border-gray-100 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50`}
                    >
                      <td className="px-5 py-5 text-sm text-gray-600 font-medium">
                        {pagination?.from && pagination.from + idx}
                      </td>
                      <td className="px-5 py-5 text-sm font-semibold text-gray-800">{row.kode_gejala}</td>
                      <td className="px-5 py-5 text-sm text-gray-700">
                        <span className="font-medium">{row.nama_gejala}</span>
                      </td>
                      <td className="px-5 py-5 text-sm text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${row.kategori === 'Gejala Umum' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}
                        >
                          {row.kategori}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm text-gray-600">
                        <div className="line-clamp-2 max-w-xs">{row.keterangan}</div>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(row)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded transition-colors border border-emerald-200"
                            title="Edit gejala"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors border border-red-200"
                            title="Hapus gejala"
                          >
                            <Trash2 size={14} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="p-5 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} data
                </p>
                <div className="flex gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => fetchGejala(currentPage - 1, search, kategoriFilter)}
                    className="flex items-center gap-0.5 px-2.5 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => fetchGejala(page, search, kategoriFilter)}
                        className={`px-2.5 py-1.5 text-xs rounded transition-colors ${currentPage === page ? 'bg-emerald-500 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === pagination.last_page}
                    onClick={() => fetchGejala(currentPage + 1, search, kategoriFilter)}
                    className="flex items-center gap-0.5 px-2.5 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Selanjutnya
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-base font-medium">Tidak ada data gejala</p>
            <p className="text-gray-400 text-sm mt-1">Coba gunakan filter berbeda atau tambahkan gejala baru</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Gejala' : 'Tambah Gejala Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-emerald-500 rounded transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Kode Gejala <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.kode_gejala}
                    onChange={(e) =>
                      setFormData({ ...formData, kode_gejala: e.target.value })
                    }
                    placeholder="Contoh: G001"
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                    disabled={editingId !== null}
                  />
                  {editingId && (
                    <p className="text-xs text-gray-500 mt-1">Kode tidak dapat diubah</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Nama Gejala <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama_gejala}
                    onChange={(e) =>
                      setFormData({ ...formData, nama_gejala: e.target.value })
                    }
                    placeholder="Contoh: Pembengkakan Ambing"
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) =>
                      setFormData({ ...formData, kategori: e.target.value })
                    }
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
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
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Keterangan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.keterangan}
                    onChange={(e) =>
                      setFormData({ ...formData, keterangan: e.target.value })
                    }
                    placeholder="Jelaskan tentang gejala ini..."
                    rows={3}
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 resize-none transition-colors"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
