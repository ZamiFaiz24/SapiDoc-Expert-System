'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Link } from '@inertiajs/react';
import {
  AlertCircle,
  ChevronRight,
  MapPin,
  Phone,
  UserRound,
  CalendarClock,
  Layers,
  VenusAndMars,
} from 'lucide-react';
import { useFormSubmission } from '../../../../hooks/use-form-submission';
import { useFcSuggestion } from '../../../../hooks/use-fc-suggestion';

import { 
  Gejala,
  PageProps,
  FormData } from '../../../../types/diagnosis';

// Step 1: Data Peternak & Sapi
interface Step1Props {
  onNext: () => void;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  jenisSapi: Record<string, string>;
  jenisKelamin: Record<string, string>;
  umurKategori: Record<string, string>;
}

export default function Step1({
  onNext,
  formData,
  setFormData,
  jenisSapi,
  jenisKelamin,
  umurKategori,
}: Step1Props) {
  const [error, setError] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '');
    handleChange('no_hp_user', onlyDigits);
  };

  const handleNext = () => {
    if (!formData.nama_user.trim()) {
      setError('Nama wajib diisi');
      return;
    }
    if (!formData.alamat_user.trim()) {
      setError('Alamat wajib diisi');
      return;
    }
    if (!formData.no_hp_user.trim()) {
      setError('No HP wajib diisi');
      return;
    }
    if (!/^\d+$/.test(formData.no_hp_user)) {
      setError('No HP harus berupa angka');
      return;
    }
    if (formData.no_hp_user.length < 10) {
      setError('No HP terlalu pendek');
      return;
    }
    if (!formData.jenis_sapi) {
      setError('Jenis sapi wajib dipilih');
      return;
    }
    if (!formData.jenis_kelamin) {
      setError('Jenis kelamin wajib dipilih');
      return;
    }
    if (!formData.umur_kategori) {
      setError('Umur kategori wajib dipilih');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Data Peternak & Sapi</h2>
        <p className="mt-1 text-sm text-gray-500">Lengkapi informasi berikut untuk memulai diagnosis.</p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              Data Peternak
          </h3>
          <div className="space-y-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserRound size={16} className="text-emerald-600" />
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nama_user}
                onChange={(e) => handleChange('nama_user', e.target.value)}
                placeholder="Nama Anda"
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone size={16} className="text-emerald-600" />
                No HP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.no_hp_user}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="08xx xxxx xxxx"
                maxLength={15}
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin size={16} className="text-emerald-600" />
                Alamat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.alamat_user}
                onChange={(e) => handleChange('alamat_user', e.target.value)}
                placeholder="Alamat Anda"
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              Data Sapi
          </h3>
          <div className="space-y-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layers size={16} className="text-emerald-600" />
                Jenis Sapi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jenis_sapi}
                onChange={(e) => handleChange('jenis_sapi', e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">-- Pilih --</option>
                {Object.entries(jenisSapi).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <VenusAndMars size={16} className="text-emerald-600" />
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jenis_kelamin}
                onChange={(e) => handleChange('jenis_kelamin', e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">-- Pilih --</option>
                {Object.entries(jenisKelamin).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <CalendarClock size={16} className="text-emerald-600" />
                Kategori Umur <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.umur_kategori}
                onChange={(e) => handleChange('umur_kategori', e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">-- Pilih --</option>
                {Object.entries(umurKategori).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <button
        onClick={handleNext}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Lanjut <ChevronRight size={18} />
      </button>
    </div>
  );
}