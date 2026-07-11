'use client';

import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Penyakit {
  id: number;
  kode_penyakit: string;
  kategori_penyakit: string | null;
  gambar: string | null;
  nama_penyakit: string;
  deskripsi: string;
  penanganan_awal: string | null;
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
  kategori_penyakit: string;
  gambar: string;
  nama_penyakit: string;
  deskripsi: string;
  penanganan_awal: string;
}

const KATEGORI_PENYAKIT_OPTIONS = [
  'Menular',
  'Pencernaan',
  'Ambing',
  'Kulit',
  'Reproduksi',
  'Metabolik',
];

export default function PenyakitPage() {
  const [penyakitData, setPenyakitData] = useState<Penyakit[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    kode_penyakit: '',
    kategori_penyakit: '',
    gambar: '',
    nama_penyakit: '',
    deskripsi: '',
    penanganan_awal: '',
  });

  // Fetch penyakit data
  const fetchPenyakit = async (page: number = 1, searchTerm: string = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('page', page.toString());

      const response = await fetch(`/admin/api/penyakit?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Gagal mengambil data penyakit');
      }

      const result = await response.json();
      setPenyakitData(result.data);
      setPagination(result.pagination);
      setCurrentPage(result.pagination.current_page);
    } catch (err) {
      console.error('Error fetching penyakit:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPenyakit(1, search);
  }, []);

  const generateKodePenyakit = () => {
    if (penyakitData.length === 0) return 'P01';

    const maxKode = Math.max(
      ...penyakitData.map((p) =>
        parseInt(p.kode_penyakit.replace('P', ''), 10)
      )
    );

    return `P${String(maxKode + 1).padStart(2, '0')}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPenyakit(1, search);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      fetchPenyakit(1, '');
    }
  };

  const handleTambah = () => {
    setEditingId(null);
    setFormData({
      kode_penyakit: generateKodePenyakit(),
      kategori_penyakit: '',
      gambar: '',
      nama_penyakit: '',
      deskripsi: '',
      penanganan_awal: '',
    });
    setShowModal(true);
  };

  const handleEdit = (penyakit: Penyakit) => {
    setEditingId(penyakit.id);
    setFormData({
      kode_penyakit: penyakit.kode_penyakit,
      kategori_penyakit: penyakit.kategori_penyakit || '',
      gambar: penyakit.gambar || '',
      nama_penyakit: penyakit.nama_penyakit,
      deskripsi: penyakit.deskripsi,
      penanganan_awal: penyakit.penanganan_awal || '',
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

      const nextPage =
        penyakitData.length === 1 && currentPage > 1
        ? currentPage - 1
        : currentPage;

    fetchPenyakit(nextPage, search);
    alert('Penyakit berhasil dihapus.');
    } catch (err) {
      console.error('Error deleting penyakit:', err);
      alert(err instanceof Error ? err.message : 'Gagal menghapus penyakit');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.kode_penyakit.trim() || !formData.nama_penyakit.trim() || !formData.deskripsi.trim()) {
      alert('Semua field harus diisi');
      return;
    }

    try {
      setIsSaving(true);

      const url = editingId 
        ? `/admin/api/penyakit/${editingId}` 
        : '/admin/api/penyakit';
      
      const method = editingId ? 'PUT' : 'POST';
      const payload = {
        kode_penyakit: formData.kode_penyakit.trim(),
        kategori_penyakit: formData.kategori_penyakit.trim() || null,
        gambar: formData.gambar.trim() || null,
        nama_penyakit: formData.nama_penyakit.trim(),
        deskripsi: formData.deskripsi.trim(),
        penanganan_awal: formData.penanganan_awal.trim() || null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan penyakit');
      }

      // Refresh data dan close modal
      fetchPenyakit(currentPage, search);
      setShowModal(false);
      alert(
        editingId
          ? 'Data penyakit berhasil diperbarui.'
          : 'Data penyakit berhasil ditambahkan.'
      );
    } catch (err) {
      console.error('Error saving penyakit:', err);
      alert(err instanceof Error ? err.message : 'Gagal menyimpan penyakit');
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Search & Filter Section */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari berdasarkan kode atau nama penyakit..."
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
      </div>

      {/* Data Penyakit Header & Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Data Penyakit</h3>
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm shadow-md"
        >
          <Plus size={18} />
          Tambah Penyakit
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
        {penyakitData.length > 0 ? (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-emerald-600 border-b border-gray-200">
                    <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                    <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Kode Penyakit</th>
                    <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Kategori</th>
                    <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Nama Penyakit</th>
                    <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Deskripsi</th>
                    <th className="px-5 py-5 text-center text-xs font-semibold text-white uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {penyakitData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-t border-gray-100 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50`}
                    >
                      <td className="px-5 py-5 text-sm text-gray-600 font-medium">
                        {pagination?.from && pagination.from + idx}
                      </td>
                      <td className="px-5 py-5 text-sm font-semibold text-gray-800">{row.kode_penyakit}</td>
                      <td className="px-5 py-5 text-sm text-gray-700">
                        {row.kategori_penyakit ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            {row.kategori_penyakit}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-5 py-5 text-sm text-gray-700">
                        <span className="font-medium">{row.nama_penyakit}</span>
                      </td>
                      <td className="px-5 py-5 text-sm text-gray-600">
                        <div className="line-clamp-2 max-w-xs">{row.deskripsi}</div>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(row)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded transition-colors border border-emerald-200"
                            title="Edit penyakit"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors border border-red-200"
                            title="Hapus penyakit"
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
                    onClick={() => fetchPenyakit(currentPage - 1, search)}
                    className="flex items-center gap-0.5 px-2.5 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => fetchPenyakit(page, search)}
                        className={`px-2.5 py-1.5 text-xs rounded transition-colors ${currentPage === page ? 'bg-emerald-500 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === pagination.last_page}
                    onClick={() => fetchPenyakit(currentPage + 1, search)}
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
            <p className="text-gray-500 text-base font-medium">Tidak ada data penyakit</p>
            <p className="text-gray-400 text-sm mt-1">Coba gunakan filter berbeda atau tambahkan penyakit baru</p>
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
                {editingId ? 'Edit Penyakit' : 'Tambah Penyakit Baru'}
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
                    Kode Penyakit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.kode_penyakit}
                    onChange={(e) =>
                      setFormData({ ...formData, kode_penyakit: e.target.value })
                    }
                    placeholder="Contoh: P001"
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                    disabled={editingId !== null}
                  />
                  {editingId && (
                    <p className="text-xs text-gray-500 mt-1">Kode tidak dapat diubah</p>
                  )}
                </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Kategori Penyakit
                      </label>
                      <input
                        type="text"
                        list="kategori-penyakit-options"
                        value={formData.kategori_penyakit}
                        onChange={(e) =>
                          setFormData({ ...formData, kategori_penyakit: e.target.value })
                        }
                        placeholder="Contoh: Menular"
                        className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                      />
                      <datalist id="kategori-penyakit-options">
                        {KATEGORI_PENYAKIT_OPTIONS.map((kategori) => (
                          <option key={kategori} value={kategori} />
                        ))}
                      </datalist>
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
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                  />
                </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Gambar Penyakit
                      </label>
                      <input
                        type="text"
                        value={formData.gambar}
                        onChange={(e) =>
                          setFormData({ ...formData, gambar: e.target.value })
                        }
                        placeholder="Contoh: /images/penyakit/pmk.jpg"
                        className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">Isi dengan path atau URL gambar yang bisa diakses publik.</p>
                      {formData.gambar.trim() ? (
                        <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          <img
                            src={formData.gambar}
                            alt={formData.nama_penyakit || 'Preview gambar penyakit'}
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      ) : null}
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
                    rows={3}
                    className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 resize-none transition-colors"
                  />
                </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Penanganan Awal
                      </label>
                      <textarea
                        value={formData.penanganan_awal}
                        onChange={(e) =>
                          setFormData({ ...formData, penanganan_awal: e.target.value })
                        }
                        placeholder="Jelaskan langkah penanganan awal..."
                        rows={4}
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
