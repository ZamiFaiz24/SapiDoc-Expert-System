'use client';

import { useState, useEffect , type Dispatch, type SetStateAction } from 'react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Loader,
} from 'lucide-react';
import { useFcSuggestion } from '../../../../hooks/use-fc-suggestion';

import { 
  Gejala, 
  FormData, 
  SelectedGejala, 
  SuggestedGejala } from '../../../../types/diagnosis';

import {CF_OPTIONS} from '../constants/cf-options';

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

export default function Step3({ onNext, onBack, selectedGejala, setSelectedGejala, gejalas, formData, isLoading, error }: Step3Props) {
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

      getSuggestedGejala(gejalaDenganCf);
    }
  }, [loaded, selectedGejala]);

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
    <div className="w-full max-w-4xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gejala Spesifik</h2>
        <p className="mt-1 text-sm text-gray-500">Pilih gejala spesifik yang terlihat atau lihat saran sistem.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Browse Gejala Spesifik */}
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Gejala Spesifik ({spesifikCount}/{spesifikGejalas.length})</h3>
          </div>

          <div className="max-h-[500px] space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-3">
            {spesifikGejalas.map((gejala) => {
              const selectedItem = selectedGejala.find((g) => g.id === gejala.id);
              const isSelected = Boolean(selectedItem);

              return (
                <div
                  key={gejala.id}
                  className={`rounded-2xl border border-gray-200 p-4 transition ${
                    isSelected ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-white hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleGejala(gejala)}
                      className="h-4 w-4 cursor-pointer rounded text-emerald-600"
                    />
                    <label className="flex-1 cursor-pointer text-xs font-medium text-gray-800">
                      <span className="text-gray-500">{gejala.kode_gejala}</span> {gejala.nama_gejala}
                    </label>
                  </div>

                  {isSelected && (
                    <div className="ml-6 mt-2 flex flex-wrap gap-1">
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
        </div>

        {/* Suggested Gejala */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Rekomendasi Sistem
              </h3>

              <p className="text-xs text-gray-500">
                Berdasarkan gejala sebelumnya
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
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
                      className={`block w-full rounded p-2 text-left text-xs transition ${
                        isSelected
                          ? 'border border-emerald-300 bg-emerald-50 font-medium text-emerald-700 cursor-default'
                          : 'border border-yellow-200 bg-white text-gray-700 hover:border-yellow-400 hover:bg-yellow-100'
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
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        <button
          onClick={onNext}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
  );
}