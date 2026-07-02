import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { AlertCircle, ChevronLeft, Download, RefreshCw, ClipboardCheck, UserRound, FileText, Stethoscope } from 'lucide-react';

interface Diagnosis {
  id: number;
  nama_user: string;
  alamat_user: string;
  no_hp_user: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
  cf_final: number;
  // Tambahkan baris di bawah ini:
  nama_penyakit_snap: string; 
  
  // Jika Anda juga mengirimkan gejala_input di props:
  gejala_input?: any[];
}

interface GejalaDipilih {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  cf_user: number;
}

interface Penyakit {
  id: number;
  nama_penyakit: string;
  deskripsi: string;
  penanganan_awal: string;
}

interface DiagnosisBanding {
  penyakit_id: number;
  nama_penyakit: string;
  cf_score: number;
}

interface PageProps {
  diagnosis: Diagnosis;
  penyakit: Penyakit;
  diagnosis_banding: DiagnosisBanding[];
  interpretasi: string;
  gejala_dipilih: GejalaDipilih[];
}

function getInterpretasiColor(cf: number): string {
  if (cf < 0.25) return 'bg-blue-50 border-blue-200 text-blue-900';
  if (cf < 0.5) return 'bg-cyan-50 border-cyan-200 text-cyan-900';
  if (cf < 0.75) return 'bg-yellow-50 border-yellow-200 text-yellow-900';
  if (cf < 0.9) return 'bg-orange-50 border-orange-200 text-orange-900';
  return 'bg-red-50 border-red-200 text-red-900';
}

function getSeverityLabel(cf: number) {
  if (cf < 0.25)
    return {
      text: 'Keyakinan Rendah',
      className: 'bg-blue-100 text-blue-700',
    };

  if (cf < 0.5)
    return {
      text: 'Perlu Perhatian',
      className: 'bg-cyan-100 text-cyan-700',
    };

  if (cf < 0.75)
    return {
      text: 'Kemungkinan Sedang',
      className: 'bg-yellow-100 text-yellow-700',
    };

  if (cf < 0.9)
    return {
      text: 'Kemungkinan Tinggi',
      className: 'bg-orange-100 text-orange-700',
    };

  return {
    text: 'Sangat Tinggi',
    className: 'bg-red-100 text-red-700',
  };
}

function getJenisSapiLabel(code: string): string {
  const map: Record<string, string> = {
    'Sapi PO': 'Sapi PO (Peranakan Ongole)',
    'Sapi Simental': 'Sapi Simental / Metal',
    'Sapi Limousin': 'Sapi Limousin',
    'Sapi Jawa': 'Sapi Jawa / Lokal Potong',
    perah: 'Sapi Perah',
    potong: 'Sapi Potong',
  };
  return map[code] || code;
}

function getJenisKelaminLabel(code: string): string {
  const map: Record<string, string> = {
    jantan: 'Jantan',
    betina: 'Betina',
  };
  return map[code] || code;
}

export default function DiagnosisShowPage({
  diagnosis,
  penyakit,
  diagnosis_banding = [], // Berikan default array kosong
  interpretasi,
  gejala_dipilih,
}: PageProps) {
  
  // 1. Validasi Awal: Jika diagnosis tidak ada, tampilkan pesan error sederhana
  if (!diagnosis) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-500">Data diagnosis tidak ditemukan.</p>
        </div>
      </AppLayout>
    );
  }

  const cfPercent = Math.round((diagnosis.cf_final || 0) * 100);
  const colorClass = getInterpretasiColor(diagnosis.cf_final || 0);
  const severity = getSeverityLabel(diagnosis.cf_final || 0);

  const handlePrint = () => window.print();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4fbf7] px-4 py-8">
      {/* --- BACKGROUND BLOBS (Sama dengan page.tsx) --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* --- HEADER (Style Konsisten dengan page.tsx) --- */}
        <div className="mb-6 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <ClipboardCheck className="h-6 w-6 text-gray-800" />
              </div>              
            <div>
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Hasil Diagnosis</h1>
                <p className="text-sm text-gray-600">ID Diagnosis: {diagnosis.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
               <Link
                href="/diagnosis/create"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <ChevronLeft size={16} /> Kembali
              </Link>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Download size={16} /> Cetak
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {/* --- INFORMASI PETERNAK & SAPI --- */}
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <UserRound className="h-5 w-5 text-gray-800" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Informasi Peternak & Sapi
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Nama Peternak', value: diagnosis.nama_user },
                { label: 'Alamat', value: diagnosis.alamat_user },
                { label: 'No. HP', value: diagnosis.no_hp_user },
                { label: 'Jenis Sapi', value: getJenisSapiLabel(diagnosis.jenis_sapi) },
                { label: 'Jenis Kelamin', value: getJenisKelaminLabel(diagnosis.jenis_kelamin) },
                { label: 'Kategori Umur', value: diagnosis.umur_kategori, className: 'capitalize' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-emerald-50/50 p-3 border border-emerald-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">{item.label}</p>
                  <p className={`mt-1 font-semibold text-gray-800 ${item.className || ''}`}>{item.value || '-'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GEJALA YANG DIPILIH */}
          {gejala_dipilih.length > 0 && (
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Stethoscope className="h-5 w-5 text-gray-800" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Gejala yang Dipilih
                  </h3>
                  <p className="text-sm text-gray-500">
                    Total {gejala_dipilih.length} gejala
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {gejala_dipilih.map((gejala) => (
                  <div
                    key={gejala.id}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600">
                        {gejala.kode_gejala}
                      </span>

                      <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                        {(gejala.cf_user * 100).toFixed(0)}%
                      </span>
                    </div>

                    <p className="text-sm font-medium text-gray-800">
                      {gejala.nama_gejala}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CARD HASIL UTAMA --- */}
          <div className={`rounded-3xl border-2 p-8 text-center shadow-xl backdrop-blur-sm transition-all ${colorClass}`}>
            <div className="mb-4">
              <span
                className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${severity.className}`}
              >
                {severity.text}
              </span>
            </div>
            <h2 className="mb-2 text-3xl font-black md:text-4xl">
              {penyakit?.nama_penyakit || diagnosis.nama_penyakit_snap || 'Tidak Teridentifikasi'}
            </h2>
            <p className="mx-auto max-w-md text-sm font-medium opacity-80 leading-relaxed">
              {interpretasi}
            </p>

            <div className="mx-auto mt-8 w-full max-w-sm">
              <div className="mb-2 flex items-center justify-between text-sm font-bold">
                <span>Tingkat Kepercayaan (CF)</span>
                <span className="text-lg">{cfPercent}%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full bg-emerald-600 transition-all duration-1000 ease-out"
                  style={{ width: `${cfPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* --- DETAIL EDUKASI --- */}
          {penyakit ? (
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <FileText className="h-5 w-5 text-gray-800" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Informasi Detail Penyakit
                </h3>
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <h4 className="mb-2 font-bold text-gray-900">Deskripsi Penyakit</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{penyakit.deskripsi}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
                  <h4 className="mb-2 font-bold text-emerald-900">Penanganan Awal</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {penyakit.penanganan_awal || 'Informasi penanganan awal belum tersedia.'}
                  </p>
                </div>
                {/* <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                  <h4 className="mb-2 font-bold text-blue-900">Langkah Penanganan</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{penyakit.cara_penanganan}</p>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
              <AlertCircle />
              <p className="text-sm font-medium">Informasi edukasi penyakit lengkap tidak tersedia.</p>
            </div>
          )}

          {/* --- DIAGNOSIS BANDING --- */}
          {diagnosis_banding && diagnosis_banding.length > 0 && (
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur print:break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Stethoscope className="h-5 w-5 text-gray-800" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Diagnosis Banding Lainnya
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
              {diagnosis_banding.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl   border border-gray-100 bg-gray-50/50 p-4 transition hover:bg-white">
                  <span className="text-sm font-semibold text-gray-700">{item.nama_penyakit}</span>
                  <span className="rounded-lg bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700">
                      {(item.cf_score * 100).toFixed(1)}%
                  </span>
                  </div>
              ))}
              </div>
          </div>
          )}`

          {/* --- Tombol Aksi Bawah --- */}
          <div className="flex flex-col gap-3 py-6 sm:flex-row sm:justify-center print:hidden">
            <Link
              href="/diagnosis/create"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-[1.02] active:scale-95"
            >
              <RefreshCw size={20} /> Diagnosis Baru
            </Link>
          </div>
        </div>
      </div>

     <style dangerouslySetInnerHTML={{ __html: `
        @media print {
            body { background-color: white !important; }
            .print\\:hidden { display: none !important; }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
        }
        ` }} />
    </div>
  );
}