'use client';

import { X, Eye, Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      <div className="space-y-6">
        {/* Search & Filter Section */}
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari nama user, alamat, atau no HP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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

            {/* Filter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Jenis Sapi Filter */}
              <select
                value={jenisSapi}
                onChange={(e) => handleFilterChange('jenis_sapi', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              >
                <option value="">Semua Jenis Sapi</option>
                <option value="Sapi PO">Sapi PO (Peranakan Ongole)</option>
                <option value="Sapi Simental">Sapi Simental / Metal</option>
                <option value="Sapi Limousin">Sapi Limousin</option>
                <option value="Sapi Jawa">Sapi Jawa / Lokal Potong</option>
              </select>

              {/* Date From */}
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />

              {/* Date To */}
              <input
                type="date"
                value={dateTo}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />

              {/* CF Min */}
              <input
                type="number"
                placeholder="CF Min"
                min="0"
                max="100"
                value={cfMin}
                onChange={(e) => handleFilterChange('cf_min', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />

              {/* CF Max */}
              <input
                type="number"
                placeholder="CF Max"
                min="0"
                max="100"
                value={cfMax}
                onChange={(e) => handleFilterChange('cf_max', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />
            </div>
          </div>
        </div>

        {/* Riwayat Diagnosis Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Riwayat Diagnosis</h3>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">

          {isLoading ? (
            <div className="space-y-4 p-6">
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
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-emerald-600 border-b border-gray-200">
                      <th className="px-5 py-5 whitespace-nowrap text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                      <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Tanggal</th>
                      <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Nama User</th>
                      <th className="px-5 py-5 whitespace-nowrap text-center text-xs font-semibold text-white uppercase tracking-wider">Jumlah Gejala</th>
                      <th className="px-5 py-5 text-left text-xs font-semibold text-white uppercase tracking-wider">Hasil Penyakit</th>
                      <th className="px-5 py-5 whitespace-nowrap text-center text-xs font-semibold text-white uppercase tracking-wider">CF %</th>
                      <th className="px-5 py-5 whitespace-nowrap text-center text-xs font-semibold text-white uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {diagnosisData.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`border-t border-gray-100 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50`}
                      >
                        <td className="px-5 py-5 text-sm text-gray-600 font-medium">
                          {pagination?.from && pagination.from + idx}
                        </td>
                        <td className="px-5 py-5 text-sm font-semibold text-gray-800">{row.tanggal}</td>
                        <td className="px-5 py-5 text-sm text-gray-700">{row.user}</td>
                        <td className="px-5 py-5 text-sm text-center text-gray-800">{row.gejala}</td>
                        <td className="px-5 py-5 text-sm text-gray-700 font-medium">{row.hasil}</td>
                        <td className="px-5 py-5 text-sm text-center font-semibold text-emerald-600">{row.cf}%</td>
                        <td className="px-5 py-5 text-center">
                          <button
                            onClick={() => handleDetail(row.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded transition-colors border border-emerald-200 mx-auto"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
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
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="flex items-center gap-0.5 px-2.5 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Sebelumnya
                    </button>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2.5 py-1.5 text-xs rounded transition-colors ${currentPage === page ? 'bg-emerald-500 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={currentPage === pagination.last_page}
                      onClick={() => handlePageChange(currentPage + 1)}
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
              <p className="text-gray-500 text-base font-medium">Tidak ada data diagnosis</p>
              <p className="text-gray-400 text-sm mt-1">Coba gunakan filter berbeda atau lakukan diagnosis baru</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail Diagnosis */}
      {isModalOpen && selectedDetail && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-base font-bold text-white">Detail Diagnosis #{selectedDetail.id}</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedDetail(null);
                }}
                className="p-1 hover:bg-emerald-500 rounded transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">CF Akhir</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.cf}%</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Total Gejala</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.gejala_input.length}</p>
                </div>
              </div>

              {/* Informasi Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Tanggal</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.tanggal}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Nama User</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.user}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Alamat</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.alamat}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">No. HP</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.no_hp}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Jenis Sapi</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {selectedDetail.jenis_sapi === 'Sapi PO'
                      ? 'Sapi PO (Peranakan Ongole)'
                      : selectedDetail.jenis_sapi === 'Sapi Simental'
                      ? 'Sapi Simental / Metal'
                      : selectedDetail.jenis_sapi === 'Sapi Limousin'
                      ? 'Sapi Limousin'
                      : 'Sapi Jawa / Lokal Potong'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Jenis Kelamin</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800 capitalize">{selectedDetail.jenis_kelamin}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Kategori Umur</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{selectedDetail.umur_kategori}</p>
                </div>
              </div>

              {/* Gejala */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Gejala yang Dipilih</h4>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    Total gejala dipilih:
                    <span className="font-bold text-emerald-600 ml-1">{selectedDetail.gejala_input.length}</span>
                  </p>
                </div>
              </div>

              {selectedDetail.gejala_input.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Rincian Gejala</h4>
                  <div className="space-y-2">
                    {selectedDetail.gejala_input.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 hover:border-emerald-200 hover:bg-white transition"
                      >
                        <span className="text-sm font-medium text-gray-700">Gejala #{item.gejala_id}</span>
                        <span className="rounded-lg bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                          CF User {(item.cf_user * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hasil Diagnosis */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Hasil Diagnosis Utama</p>
                <h3 className="text-2xl font-bold text-emerald-700 mt-2">{selectedDetail.hasil}</h3>
                <p className="text-sm text-gray-600 mt-3">
                  Nilai CF:
                  <span className="font-bold text-gray-800 ml-1">{selectedDetail.cf}%</span>
                  <span className="text-gray-500 ml-2">({(selectedDetail.cf / 100).toFixed(2)})</span>
                </p>
              </div>

              {/* Diagnosis Banding */}
              {selectedDetail.diagnosis_banding && selectedDetail.diagnosis_banding.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Diagnosis Banding</h4>
                  <div className="space-y-2">
                    {selectedDetail.diagnosis_banding.map((diag, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 hover:border-emerald-200 hover:bg-white transition"
                      >
                        <span className="text-sm font-medium text-gray-700">{diag.nama_penyakit}</span>
                        <span className="rounded-lg bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                          {(diag.cf_score * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedDetail(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

