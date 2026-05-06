// FILE: resources/js/pages/pengguna/diagnosis/create.tsx
// Contoh implementasi form diagnosis dengan CF User

import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Gejala } from '@/types';

interface GejalaWithCF {
  gejala_id: number;
  cf_user: number;
}

const DiagnosisCreate = ({ gejalas }: { gejalas: Gejala[] }) => {
  const { data, setData, post, processing, errors } = useForm({
    gejala: [] as GejalaWithCF[],
    nama_user: '',
    alamat_user: '',
    no_hp_user: '',
  });

  const [selectedGejalas, setSelectedGejalas] = useState<Map<number, number>>(new Map());

  // Severity scale untuk UI
  const severityScale = [
    { value: 0, label: 'Tidak Ada', icon: '✘', color: 'gray' },
    { value: 0.2, label: 'Sangat Ringan', icon: '⚫', color: 'slate' },
    { value: 0.4, label: 'Ringan', icon: '🟢', color: 'green' },
    { value: 0.6, label: 'Sedang', icon: '🟡', color: 'yellow' },
    { value: 0.8, label: 'Berat', icon: '🟠', color: 'orange' },
    { value: 1.0, label: 'Sangat Berat', icon: '🔴', color: 'red' },
  ];

  const handleGejalaSelect = (gejalanId: number, cfUser: number) => {
    const newMap = new Map(selectedGejalas);
    
    if (cfUser === 0) {
      // Jika CF_user = 0, hapus gejala dari pilihan
      newMap.delete(gejalanId);
    } else {
      // Set CF_user untuk gejala
      newMap.set(gejalanId, cfUser);
    }
    
    setSelectedGejalas(newMap);
    
    // Update form data
    const gejalaArray = Array.from(newMap.entries()).map(([id, cf]) => ({
      gejala_id: id,
      cf_user: cf,
    }));
    
    setData('gejala', gejalaArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (data.gejala.length === 0) {
      alert('Pilih minimal 1 gejala!');
      return;
    }
    
    post('/diagnosis');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Form Diagnosis Penyakit Sapi</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Data Pengguna */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Data Peternak</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Peternak</label>
              <input
                type="text"
                value={data.nama_user}
                onChange={(e) => setData('nama_user', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              {errors.nama_user && <p className="text-red-500 text-sm mt-1">{errors.nama_user}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">No. HP</label>
              <input
                type="text"
                value={data.no_hp_user}
                onChange={(e) => setData('no_hp_user', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              {errors.no_hp_user && <p className="text-red-500 text-sm mt-1">{errors.no_hp_user}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <input
                type="text"
                value={data.alamat_user}
                onChange={(e) => setData('alamat_user', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              {errors.alamat_user && <p className="text-red-500 text-sm mt-1">{errors.alamat_user}</p>}
            </div>
          </div>
        </section>

        {/* Pilihan Gejala dengan CF */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Pilih Gejala & Tingkat Keparahan</h2>
          
          <div className="space-y-6">
            {gejalas.map((gejala) => (
              <div key={gejala.id} className="border-l-4 border-blue-400 pl-4 py-2">
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900">{gejala.nama_gejala}</h3>
                  <p className="text-xs text-gray-500">
                    Kode: {gejala.kode_gejala} | Kategori: {gejala.kategori}
                  </p>
                </div>

                {/* Severity Scale Buttons */}
                <div className="flex flex-wrap gap-2">
                  {severityScale.map((scale) => (
                    <button
                      key={scale.value}
                      type="button"
                      onClick={() => handleGejalaSelect(gejala.id, scale.value)}
                      className={`
                        px-3 py-2 rounded-lg text-sm font-medium transition
                        ${selectedGejalas.get(gejala.id) === scale.value
                          ? `bg-${scale.color}-500 text-white ring-2 ring-${scale.color}-300`
                          : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                        }
                      `}
                    >
                      <span className="mr-1">{scale.icon}</span>
                      {scale.label}
                    </button>
                  ))}
                </div>

                {/* Visual CF User */}
                {selectedGejalas.has(gejala.id) && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(selectedGejalas.get(gejala.id) || 0) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Tingkat Keparahan: {Math.round((selectedGejalas.get(gejala.id) || 0) * 100)}%
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.gejala && <p className="text-red-500 text-sm mt-4">{errors.gejala}</p>}
        </section>

        {/* Summary */}
        <section className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Ringkasan Gejala Terpilih</h3>
          {data.gejala.length > 0 ? (
            <ul className="space-y-1">
              {data.gejala.map((item) => {
                const gejala = gejalas.find((g) => g.id === item.gejala_id);
                return (
                  <li key={item.gejala_id} className="text-sm text-gray-700">
                    • {gejala?.nama_gejala} 
                    <span className="font-medium ml-2">({Math.round(item.cf_user * 100)}%)</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">Belum ada gejala yang dipilih</p>
          )}
        </section>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={processing || data.gejala.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400"
          >
            {processing ? 'Memproses...' : 'Lakukan Diagnosis'}
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosisCreate;
