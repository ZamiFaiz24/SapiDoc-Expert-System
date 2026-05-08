'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { 
  Gejala, 
  SelectedGejala } from '../../../../types/diagnosis';


const CF_OPTIONS = [
  { value: 0, label: 'Tidak Tahu / Tidak Ada' },
  { value: 0.4, label: 'Mungkin' },
  { value: 0.6, label: 'Cukup Yakin' },
  { value: 0.8, label: 'Yakin' },
  { value: 1, label: 'Sangat Yakin' },
];

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  selectedGejala: SelectedGejala[];
  setSelectedGejala: Dispatch<SetStateAction<SelectedGejala[]>>;
  gejalas: Gejala[];
}

export default function Step3({ onNext, onBack, selectedGejala, setSelectedGejala, gejalas }: Step3Props) {
  const umumGejalas = gejalas.filter((g) => g.kategori === 'Gejala Umum');

  const toggleGejala = (gejala: Gejala) => {
    setSelectedGejala((prev) => {
      const exists = prev.find((g) => g.id === gejala.id);
      if (exists) {
        return prev.filter((g) => g.id !== gejala.id);
      }
      return [...prev, { id: gejala.id, nama_gejala: gejala.nama_gejala, cf_user: 0.5 }];
    });
  };

  const updateCF = (id: number, cf_user: number) => {
    setSelectedGejala((prev) => prev.map((g) => (g.id === id ? { ...g, cf_user } : g)));
  };

  const umumCount = selectedGejala.filter((g) => umumGejalas.some((ug) => ug.id === g.id)).length;

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gejala Umum</h2>
          <p className="mt-1 text-sm text-gray-500">Pilih gejala umum yang terlihat pada sapi Anda.</p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          {umumCount}/{umumGejalas.length}
        </div>
      </div>

      <div className="max-h-[350px] space-y-2 overflow-y-auto pr-1 mb-6">
        {umumGejalas.map((gejala) => {
          const selectedItem = selectedGejala.find((g) => g.id === gejala.id);
          const isSelected = Boolean(selectedItem);

          return (
            <div
              key={gejala.id}
              className={`rounded-lg border p-3 transition ${
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

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        <button
          onClick={onNext}
          disabled={umumCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Lanjut <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}