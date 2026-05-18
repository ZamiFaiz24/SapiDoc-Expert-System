'use client';

import { Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';

interface DiagnosisItem {
  id: number;
  tanggal: string;
  user: string;
  gejala: number;
  hasil: string;
  cf: number;
}

interface DiagnosisDetail {
  id: number;
  tanggal: string;
  user: string;
  gejala: number;
  hasil: string;
  cf: number;
  alamat: string;
  no_hp: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
  gejala_input: Array<{ gejala_id: number; cf_user: number }>;
  diagnosis_banding: Array<{ penyakit_id: number; nama_penyakit: string; cf_score: number }>;
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export default function DiagnosisPage() {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<DiagnosisDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [jenisSapi, setJenisSapi] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [cfMin, setCfMin] = useState('');
  const [cfMax, setCfMax] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch diagnosis data
  const fetchDiagnosis = async (page: number = 1, searchTerm: string = '', sapi: string = '', dFrom: string = '', dTo: string = '', cMin: string = '', cMax: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (sapi) params.append('jenis_sapi', sapi);
      if (dFrom) params.append('date_from', dFrom);
      if (dTo) params.append('date_to', dTo);
      if (cMin) params.append('cf_min', cMin);
      if (cMax) params.append('cf_max', cMax);
      params.append('page', page.toString());

      const response = await fetch(`/admin/api/diagnosis/all?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Gagal mengambil data diagnosis');
      }

      const result = await response.json();
      setDiagnosisData(result.data);
      setPagination(result.pagination);
      setCurrentPage(result.pagination.current_page);
    } catch (err) {
      console.error('Error fetching diagnosis:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnosis(1, search, jenisSapi, dateFrom, dateTo, cfMin, cfMax);
  }, []);


  const handleDetail = (id: number) => {
    const detail = diagnosisData.find(d => d.id === id) as unknown as DiagnosisDetail;
    if (detail) {
      setSelectedDetail(detail);
      setIsModalOpen(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDiagnosis(1, search, jenisSapi, dateFrom, dateTo, cfMin, cfMax);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setCurrentPage(1);
    
    if (filterName === 'jenis_sapi') {
      setJenisSapi(value);
      fetchDiagnosis(1, search, value, dateFrom, dateTo, cfMin, cfMax);
    } else if (filterName === 'date_from') {
      setDateFrom(value);
      fetchDiagnosis(1, search, jenisSapi, value, dateTo, cfMin, cfMax);
    } else if (filterName === 'date_to') {
      setDateTo(value);
      fetchDiagnosis(1, search, jenisSapi, dateFrom, value, cfMin, cfMax);
    } else if (filterName === 'cf_min') {
      setCfMin(value);
      fetchDiagnosis(1, search, jenisSapi, dateFrom, dateTo, value, cfMax);
    } else if (filterName === 'cf_max') {
      setCfMax(value);
      fetchDiagnosis(1, search, jenisSapi, dateFrom, dateTo, cfMin, value);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDiagnosis(page, search, jenisSapi, dateFrom, dateTo, cfMin, cfMax);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Diagnosis</h3>

        {/* Search & Filter Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari nama user, alamat, atau no HP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Cari
            </button>
          </form>

          {/* Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Jenis Sapi Filter */}
            <select
              value={jenisSapi}
              onChange={(e) => handleFilterChange('jenis_sapi', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="">Semua Jenis Sapi</option>
              <option value="perah">Sapi Perah</option>
              <option value="potong">Sapi Potong</option>
            </select>

            {/* Date From */}
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />

            {/* Date To */}
            <input
              type="date"
              value={dateTo}
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />

            {/* CF Min */}
            <input
              type="number"
              placeholder="CF Min"
              min="0"
              max="100"
              value={cfMin}
              onChange={(e) => handleFilterChange('cf_min', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />

            {/* CF Max */}
            <input
              type="number"
              placeholder="CF Max"
              min="0"
              max="100"
              value={cfMax}
              onChange={(e) => handleFilterChange('cf_max', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : diagnosisData.length > 0 ? (
          <>
            <Table
              columns={[
                { key: 'tanggal', label: 'Tanggal' },
                { key: 'user', label: 'Nama User' },
                { key: 'gejala', label: 'Jumlah Gejala' },
                { key: 'hasil', label: 'Hasil Penyakit' },
                {
                  key: 'cf',
                  label: 'CF / Persentase',
                  render: (value: number) => `${value}%`,
                },
              ]}
              data={diagnosisData}
              actions={(row) => (
                <button
                  onClick={() => handleDetail(row.id)}
                  className="flex items-center gap-2 px-3 py-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <Eye size={16} />
                  Detail
                </button>
              )}
            />

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-600">
                  Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} data
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {[...Array(pagination.last_page)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.last_page}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Tidak ada data diagnosis</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDetail(null);
        }}
        title="Detail Diagnosis"
      >
        {selectedDetail && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-semibold text-gray-900">{selectedDetail.tanggal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama User</p>
                <p className="font-semibold text-gray-900">{selectedDetail.user}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Alamat</p>
                <p className="font-semibold text-gray-800">{selectedDetail.alamat}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">No. HP</p>
                <p className="font-semibold text-gray-800">{selectedDetail.no_hp}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Jenis Sapi</p>
                <p className="font-semibold text-gray-800">
                  {selectedDetail.jenis_sapi === 'perah' ? 'Sapi Perah' : 'Sapi Potong'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Jenis Kelamin</p>
                <p className="font-semibold text-gray-800 capitalize">{selectedDetail.jenis_kelamin}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Umur Kategori</p>
                <p className="font-semibold text-gray-800">{selectedDetail.umur_kategori}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Gejala yang Dipilih ({selectedDetail.gejala} gejala):
              </p>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                <p>Total gejala input: {selectedDetail.gejala_input.length}</p>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Hasil Diagnosis Utama</p>
              <p className="text-2xl font-bold text-emerald-600">{selectedDetail.hasil}</p>
              <p className="text-sm text-gray-600 mt-2">
                Nilai CF: {selectedDetail.cf}% ({(selectedDetail.cf / 100).toFixed(2)})
              </p>
            </div>

            {selectedDetail.diagnosis_banding && selectedDetail.diagnosis_banding.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Diagnosis Banding:</p>
                <div className="space-y-2">
                  {selectedDetail.diagnosis_banding.map((diag, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700">{diag.nama_penyakit}</span>
                      <span className="text-sm font-semibold text-gray-600">
                        {(diag.cf_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

