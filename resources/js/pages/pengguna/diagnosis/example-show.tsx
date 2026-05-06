// FILE: resources/js/pages/pengguna/diagnosis/example-show.tsx
// Contoh tampilan hasil diagnosis dengan CF breakdown

import React from 'react';
import { Diagnosis } from '@/types';

interface DetailGejala {
  gejala: string;
  kode_gejala: string;
  nilai_mb: number;
  nilai_md: number;
  cf_expert: number;
  cf_user: number;
  cf_gejala: number;
  cf_combined: number;
  catatan_pakar: string;
}

interface DetailDiagnosis {
  total_gejala_cocok: number;
  cf_final: number;
  detail_gejala: DetailGejala[];
}

interface DiagnosisBanding {
  penyakit_id: number;
  nama_penyakit: string;
  kode_penyakit: string;
  cf: number;
  presentase: string;
  kesimpulan: string;
}

interface DiagnosisShowProps {
  diagnosis: Diagnosis;
  detail_diagnosis: DetailDiagnosis | null;
  diagnosis_banding: DiagnosisBanding[];
  interpretasi: {
    level: string;
    persentase: string;
    penjelasan: string;
    color: string;
  };
}

const DiagnosisShow = ({
  diagnosis,
  detail_diagnosis,
  diagnosis_banding,
  interpretasi,
}: DiagnosisShowProps) => {
  const getColorClass = (level: string) => {
    switch (level) {
      case 'red':
        return 'bg-red-50 border-red-300 text-red-900';
      case 'orange':
        return 'bg-orange-50 border-orange-300 text-orange-900';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      default:
        return 'bg-blue-50 border-blue-300 text-blue-900';
    }
  };

  const getProgressBarColor = (cf: number) => {
    if (cf >= 0.8) return 'bg-red-500';
    if (cf >= 0.6) return 'bg-orange-500';
    if (cf >= 0.4) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hasil Diagnosis</h1>
        <p className="text-gray-600">
          Tanggal: {new Date(diagnosis.created_at).toLocaleDateString('id-ID')}
        </p>
      </div>

      {/* Informasi Peternak */}
      <section className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Data Peternak</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nama</p>
            <p className="font-medium">{diagnosis.nama_user}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">No. HP</p>
            <p className="font-medium">{diagnosis.no_hp_user}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Alamat</p>
            <p className="font-medium">{diagnosis.alamat_user}</p>
          </div>
        </div>
      </section>

      {/* Diagnosis Utama */}
      <section className={`border-l-4 p-6 rounded-lg mb-8 ${getColorClass(interpretasi.color)}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{diagnosis.nama_penyakit_snap}</h2>
            <p className="text-sm opacity-75">Diagnosis Utama</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{interpretasi.persentase}</p>
            <p className="text-sm opacity-75">Confidence</p>
          </div>
        </div>

        {/* Progress Bar CF */}
        <div className="mb-4">
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${getProgressBarColor(
                diagnosis.cf_final
              )}`}
              style={{ width: `${diagnosis.cf_final * 100}%` }}
            />
          </div>
        </div>

        {/* Interpretasi */}
        <div className="bg-white/50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Tingkat Kepastian: {interpretasi.level}</p>
          <p>{interpretasi.penjelasan}</p>
        </div>
      </section>

      {/* Detail Perhitungan CF (jika ada) */}
      {detail_diagnosis && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Detail Perhitungan CF ({detail_diagnosis.total_gejala_cocok} Gejala Cocok)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-400">
                  <th className="border p-3 text-left text-sm font-semibold">No</th>
                  <th className="border p-3 text-left text-sm font-semibold">Gejala</th>
                  <th className="border p-3 text-center text-sm font-semibold">CF Expert</th>
                  <th className="border p-3 text-center text-sm font-semibold">CF User</th>
                  <th className="border p-3 text-center text-sm font-semibold">CF Gejala</th>
                  <th className="border p-3 text-center text-sm font-semibold">CF Combined</th>
                </tr>
              </thead>
              <tbody>
                {detail_diagnosis.detail_gejala.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="border p-3 text-sm">{idx + 1}</td>
                    <td className="border p-3">
                      <div>
                        <p className="font-medium text-sm">{item.gejala}</p>
                        <p className="text-xs text-gray-500">{item.kode_gejala}</p>
                      </div>
                    </td>
                    <td className="border p-3 text-center">
                      <span className="bg-blue-100 px-2 py-1 rounded text-sm font-medium">
                        {item.cf_expert.toFixed(4)}
                      </span>
                    </td>
                    <td className="border p-3 text-center">
                      <span className="bg-green-100 px-2 py-1 rounded text-sm font-medium">
                        {item.cf_user.toFixed(4)}
                      </span>
                    </td>
                    <td className="border p-3 text-center">
                      <span className="bg-purple-100 px-2 py-1 rounded text-sm font-medium">
                        {item.cf_gejala.toFixed(4)}
                      </span>
                    </td>
                    <td className="border p-3 text-center">
                      <span className="bg-orange-100 px-2 py-1 rounded text-sm font-bold">
                        {item.cf_combined.toFixed(4)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Penjelasan Formula */}
          <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">Penjelasan Formula:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-medium">CF Expert</span> = MB - MD (dari basis pengetahuan pakar)</li>
              <li>• <span className="font-medium">CF User</span> = Tingkat keparahan gejala (0-1)</li>
              <li>• <span className="font-medium">CF Gejala</span> = CF Expert × CF User</li>
              <li>• <span className="font-medium">CF Combined</span> = CF_lama + CF_gejala × (1 - CF_lama)</li>
            </ul>
          </div>

          {/* Catatan Pakar */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-lg mb-3">Catatan Pakar</h3>
            {detail_diagnosis.detail_gejala.map((item, idx) => (
              <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <p className="text-sm font-medium text-gray-900">{item.gejala}</p>
                <p className="text-sm text-gray-700 mt-1">{item.catatan_pakar}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Diagnosis Banding */}
      {diagnosis_banding.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Diagnosis Banding</h2>

          <div className="space-y-3">
            {diagnosis_banding.map((banding, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{banding.nama_penyakit}</h3>
                    <p className="text-sm text-gray-500">
                      {banding.kode_penyakit} · {banding.kesimpulan}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{banding.presentase}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${getProgressBarColor(banding.cf)}`}
                    style={{ width: `${banding.cf * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rekomendasi */}
      <section className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-8">
        <h3 className="font-semibold text-green-900 mb-2">Rekomendasi</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>✓ Konsultasikan dengan dokter hewan untuk diagnosis lebih lanjut</li>
          <li>✓ Lakukan pemeriksaan laboratorium jika diperlukan</li>
          <li>✓ Ikuti saran penanganan yang diberikan oleh dokter hewan</li>
          <li>✓ Pantau kondisi sapi secara berkala</li>
        </ul>
      </section>

      {/* Aksi */}
      <div className="flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Cetak Hasil
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default DiagnosisShow;
