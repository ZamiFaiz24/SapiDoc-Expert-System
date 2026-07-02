 'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Info,
  Lightbulb,
  Loader,
  Sparkles,
} from 'lucide-react';
import { useFcSuggestion } from '../../../../hooks/use-fc-suggestion';

import {
  Gejala,
  FormData,
  SelectedGejala,
  SuggestedGejala,
} from '../../../../types/diagnosis';

import { CF_OPTIONS } from '../constants/cf-options';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  selectedGejala: SelectedGejala[];
  setSelectedGejala: Dispatch<SetStateAction<SelectedGejala[]>>;
  gejalas: Gejala[];
  formData: FormData;
  isLoading: boolean;
  error: string | null;
}

export default function Step3({
  onNext,
  onBack,
  selectedGejala,
  setSelectedGejala,
  gejalas,
  formData,
  isLoading,
  error,
}: Step3Props) {
  const { getSuggestedGejala, suggestions, isLoading: suggestLoading } = useFcSuggestion();
  const [loaded, setLoaded] = useState(false);

  const spesifikGejalas = gejalas.filter((g) => {
    if (g.kategori !== 'Gejala Spesifik') return false;
    if (g.jenis_kelamin && g.jenis_kelamin !== 'all' && g.jenis_kelamin !== formData.jenis_kelamin) return false;
    if (g.umur_kategori && g.umur_kategori !== 'all' && g.umur_kategori !== formData.umur_kategori) return false;
    return true;
  });

  useEffect(() => {
    if (!loaded && selectedGejala.length > 0) {
      setLoaded(true);

      const gejalaDenganCf = selectedGejala.map((g) => ({
        gejala_id: g.id,
        cf_user: g.cf_user,
      }));

      getSuggestedGejala({
        gejala: gejalaDenganCf,
        jenis_kelamin: formData.jenis_kelamin,
        umur_kategori: formData.umur_kategori,
      });
    }
  }, [loaded, selectedGejala, formData.jenis_kelamin, formData.umur_kategori, getSuggestedGejala]);

  const toggleGejala = (gejala: Gejala) => {
    setSelectedGejala((prev) => {
      const exists = prev.find((g) => g.id === gejala.id);
      if (exists) {
        return prev.filter((g) => g.id !== gejala.id);
      }
      return [...prev, { id: gejala.id, nama_gejala: gejala.nama_gejala, cf_user: 0.6 }];
    });
  };

  const updateCF = (id: number, cf_user: number) => {
    setSelectedGejala((prev) => prev.map((g) => (g.id === id ? { ...g, cf_user } : g)));
  };

  const spesifikCount = selectedGejala.filter((g) => spesifikGejalas.some((sg) => sg.id === g.id)).length;

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gejala Spesifik</h2>
            <p className="mt-1 text-sm text-gray-500">Pilih gejala spesifik yang terlihat atau lihat saran sistem.</p>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            {spesifikCount}/{spesifikGejalas.length}
          </div>
        </div>

        <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
          {spesifikGejalas.map((gejala) => {
            const selectedItem = selectedGejala.find((g) => g.id === gejala.id);
            const isSelected = Boolean(selectedItem);

            return (
              <div
                key={gejala.id}
                className={`rounded-2xl border p-4 transition ${
                  isSelected ? 'border-emerald-300 bg-emerald-50/50' : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleGejala(gejala)}
                    className="h-4 w-4 cursor-pointer rounded text-emerald-600"
                  />
                  <label className="flex-1 cursor-pointer text-sm font-medium text-gray-800">
                    <span className="text-xs text-gray-500">{gejala.kode_gejala}</span> {gejala.nama_gejala}
                  </label>
                </div>

                {isSelected && (
                  <div className="ml-7 mt-2 flex flex-wrap gap-1">
                    {CF_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateCF(gejala.id, option.value)}
                        className={`rounded px-2 py-1 text-xs font-medium transition ${
                          selectedItem?.cf_user === option.value
                            ? 'bg-emerald-600 text-white'
                            : 'border border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={18} /> Kembali
          </button>
          <button
            onClick={onNext}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Proses Diagnosis <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-2">
              <ClipboardList className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Ringkasan</h3>
              <p className="text-sm text-gray-500">Status gejala spesifik</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
              <span className="text-gray-600">Gejala dipilih</span>
              <span className="font-semibold text-emerald-700">{spesifikCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <span className="text-gray-600">Total gejala spesifik</span>
              <span className="font-semibold text-gray-900">{spesifikGejalas.length}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-100 bg-white/90 p-5 shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-100 p-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rekomendasi sistem</h3>
              <p className="text-sm text-gray-500">Berdasarkan gejala sebelumnya</p>
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-3">
            {suggestLoading ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader size={16} className="animate-spin text-yellow-600" />
                <span className="text-xs text-yellow-700">Loading...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-2">
                {suggestions.map((sug: SuggestedGejala) => {
                  const isSelected = selectedGejala.some((g) => g.id === sug.id);
                  return (
                    <button
                      key={sug.id}
                      onClick={() => {
                        if (!isSelected) {
                          setSelectedGejala((prev) => [...prev, { id: sug.id, nama_gejala: sug.nama_gejala, cf_user: 0.7 }]);
                        }
                      }}
                      disabled={isSelected}
                      className={`block w-full rounded-lg border p-3 text-left text-xs transition ${
                        isSelected
                          ? 'border-emerald-300 bg-emerald-50 font-medium text-emerald-700 cursor-default'
                          : 'border-yellow-200 bg-white text-gray-700 hover:border-yellow-400 hover:bg-yellow-100'
                      }`}
                    >
                      <span className="font-semibold">{sug.kode_gejala}</span>
                      <div className="text-xs">{sug.nama_gejala}</div>
                      <div className="text-[10px] text-gray-500">CF: {(sug.cf_score * 100).toFixed(0)}%</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-xs text-yellow-700">Belum ada saran</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white/90 p-5 shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-sky-100 p-2">
              <Info className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Panduan singkat</h3>
              <p className="text-sm text-gray-500">Pengingat saat memilih gejala</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3 rounded-2xl bg-gray-50 p-3">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              Pilih gejala yang benar-benar sesuai kondisi sapi.
            </li>
            <li className="flex gap-3 rounded-2xl bg-gray-50 p-3">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              Gunakan rekomendasi sistem sebagai bantuan tambahan.
            </li>
            <li className="flex gap-3 rounded-2xl bg-gray-50 p-3">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              Jika ragu, lanjutkan setelah gejala paling dominan dipilih.
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}