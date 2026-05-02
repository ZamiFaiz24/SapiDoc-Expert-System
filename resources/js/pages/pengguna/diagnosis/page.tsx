'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Link } from '@inertiajs/react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  Phone,
  RefreshCcw,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

interface FormData {
  nama: string;
  noHp: string;
  lokasi: string;
}

interface SelectedGejala {
  id: string;
  nama: string;
  cf: number;
}

interface PenyakitResult {
  id: string;
  nama: string;
  cf: number;
  deskripsi: string;
  saran: string;
}

const GEJALA_LIST = [
  { id: '1', nama: 'Nafsu makan menurun' },
  { id: '2', nama: 'Demam' },
  { id: '3', nama: 'Produksi susu menurun' },
  { id: '4', nama: 'Pembengkakan ambing' },
  { id: '5', nama: 'Lesu' },
  { id: '6', nama: 'Diare' },
  { id: '7', nama: 'Kepincangan' },
  { id: '8', nama: 'Batuk' },
];

const CF_OPTIONS = [
  { value: 0, label: 'Tidak' },
  { value: 0.25, label: 'Ringan' },
  { value: 0.5, label: 'Sedang' },
  { value: 0.75, label: 'Parah' },
  { value: 1, label: 'Sangat Parah' },
];

const PENYAKIT_RESULTS: PenyakitResult[] = [
  {
    id: '1',
    nama: 'Mastitis',
    cf: 0.87,
    deskripsi: 'Peradangan pada ambing ternak yang disebabkan oleh infeksi bakteri.',
    saran:
      'Segera konsultasi dengan dokter hewan. Lakukan pembersihan area ambing dan berikan antibiotik sesuai resep.',
  },
  {
    id: '2',
    nama: 'Diare Menular',
    cf: 0.72,
    deskripsi: 'Penyakit pencernaan yang disebabkan oleh virus atau bakteri patogen.',
    saran:
      'Isolasi ternak yang sakit. Berikan cairan elektrolit untuk mencegah dehidrasi dan obat antidiare.',
  },
  {
    id: '3',
    nama: 'Demam Berdarah Ternak',
    cf: 0.65,
    deskripsi: 'Penyakit infeksi yang ditularkan melalui nyamuk dan vektor lainnya.',
    saran:
      'Tingkatkan kebersihan kandang dan sekitarnya. Konsultasikan dengan dokter hewan untuk pengobatan spesifik.',
  },
];

const STEP_META = [
  { id: 1, title: 'Data Diri', subtitle: 'Isi informasi peternak' },
  { id: 2, title: 'Pilih Gejala', subtitle: 'Tentukan gejala dan tingkatnya' },
  { id: 3, title: 'Hasil', subtitle: 'Lihat analisis diagnosis' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
      <div className="flex items-start justify-center gap-4 md:gap-8">
        {STEP_META.map((step, idx) => (
          <div key={step.id} className="flex flex-1 items-center gap-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all md:h-11 md:w-11 ${
                  step.id <= currentStep
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {step.id}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
            </div>

            {idx < STEP_META.length - 1 && (
              <div
                className={`mt-5 h-1 flex-1 rounded-full transition-all ${
                  step.id < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center md:hidden">
        <p className="text-sm font-semibold text-gray-800">{STEP_META[currentStep - 1].title}</p>
        <p className="text-xs text-gray-500">{STEP_META[currentStep - 1].subtitle}</p>
      </div>
    </div>
  );
}

interface Step1Props {
  onNext: () => void;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

function Step1({ onNext, formData, setFormData }: Step1Props) {
  const [error, setError] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!formData.nama.trim()) {
      setError('Nama wajib diisi');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Langkah 1</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Data Diri Peternak</h2>
        <p className="mt-1 text-sm text-gray-500">
          Lengkapi data berikut untuk menyimpan riwayat hasil diagnosis.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <UserRound size={16} className="text-emerald-600" />
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => handleChange('nama', e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
          {error && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <AlertCircle size={16} /> {error}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Phone size={16} className="text-emerald-600" />
            No HP
          </label>
          <input
            type="tel"
            value={formData.noHp}
            onChange={(e) => handleChange('noHp', e.target.value)}
            placeholder="08xx xxxx xxxx"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <MapPin size={16} className="text-emerald-600" />
            Lokasi
          </label>
          <input
            type="text"
            value={formData.lokasi}
            onChange={(e) => handleChange('lokasi', e.target.value)}
            placeholder="Masukkan lokasi atau alamat"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Lanjut ke Gejala <ChevronRight size={18} />
      </button>
    </div>
  );
}

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  selectedGejala: SelectedGejala[];
  setSelectedGejala: Dispatch<SetStateAction<SelectedGejala[]>>;
}

function Step2({ onNext, onBack, selectedGejala, setSelectedGejala }: Step2Props) {
  const toggleGejala = (id: string) => {
    setSelectedGejala((prev) => {
      const exists = prev.find((g) => g.id === id);
      if (exists) {
        return prev.filter((g) => g.id !== id);
      }
      const gejala = GEJALA_LIST.find((g) => g.id === id);
      return gejala ? [...prev, { ...gejala, cf: 0 }] : prev;
    });
  };

  const updateCF = (id: string, cf: number) => {
    setSelectedGejala((prev) => prev.map((g) => (g.id === id ? { ...g, cf } : g)));
  };

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Langkah 2</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Pilih Gejala</h2>
          <p className="mt-1 text-sm text-gray-500">
            Tandai gejala yang ditemukan, lalu pilih tingkat keparahan masing-masing gejala.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          Dipilih: {selectedGejala.length}
        </div>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {GEJALA_LIST.map((gejala) => {
          const selectedItem = selectedGejala.find((g) => g.id === gejala.id);
          const isSelected = Boolean(selectedItem);

          return (
            <div
              key={gejala.id}
              className={`rounded-2xl border p-4 transition ${
                isSelected
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : 'border-gray-200 bg-white hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`gejala-${gejala.id}`}
                  checked={isSelected}
                  onChange={() => toggleGejala(gejala.id)}
                  className="h-5 w-5 cursor-pointer rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor={`gejala-${gejala.id}`}
                  className="flex-1 cursor-pointer font-medium text-gray-800"
                >
                  {gejala.nama}
                </label>
              </div>

              {isSelected && (
                <div className="ml-8 mt-4 flex flex-wrap gap-2">
                  {CF_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateCF(gejala.id, option.value)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        selectedItem?.cf === option.value
                          ? 'bg-emerald-600 text-white shadow'
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        <button
          onClick={onNext}
          disabled={selectedGejala.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Proses Diagnosa <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

interface Step3Props {
  formData: FormData;
  selectedGejala: SelectedGejala[];
  result: PenyakitResult;
  onBack: () => void;
  onReset: () => void;
}

function Step3({ formData, selectedGejala, result, onBack, onReset }: Step3Props) {
  const cfPercentage = Math.round(result.cf * 100);

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/70 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Langkah 3</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Hasil Diagnosa</h2>
          <p className="mt-1 text-sm text-gray-500">
            Berikut estimasi penyakit berdasarkan gejala yang Anda pilih.
          </p>
        </div>
        <ShieldCheck className="h-8 w-8 text-emerald-600" />
      </div>

      <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Kemungkinan Tertinggi</p>
        <h3 className="mt-1 text-2xl font-bold">{result.nama}</h3>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-5xl font-extrabold leading-none">{cfPercentage}%</span>
          <span className="mb-1 text-emerald-100">Tingkat Keyakinan (CF)</span>
        </div>
        <p className="mt-4 text-emerald-50">{result.deskripsi}</p>
      </div>

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <h4 className="mb-2 font-semibold text-blue-900">Saran Penanganan</h4>
        <p className="text-blue-800">{result.saran}</p>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h4 className="mb-3 font-semibold text-gray-900">Ringkasan Diagnosis</h4>
        <div className="grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          <p>
            <span className="font-semibold">Nama Peternak:</span> {formData.nama || '-'}
          </p>
          <p>
            <span className="font-semibold">No HP:</span> {formData.noHp || '-'}
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold">Lokasi:</span> {formData.lokasi || '-'}
          </p>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="font-semibold text-gray-900">Gejala Terpilih ({selectedGejala.length})</p>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            {selectedGejala.map((gejala) => (
              <p key={gejala.id}>- {gejala.nama} (CF: {gejala.cf})</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <RefreshCcw size={18} /> Ulangi Diagnosa
        </button>
      </div>
    </div>
  );
}

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    noHp: '',
    lokasi: '',
  });
  const [selectedGejala, setSelectedGejala] = useState<SelectedGejala[]>([]);
  const [result, setResult] = useState<PenyakitResult>(PENYAKIT_RESULTS[0]);

  const handleNextFromStep2 = () => {
    const randomResult =
      PENYAKIT_RESULTS[Math.floor(Math.random() * PENYAKIT_RESULTS.length)];
    setResult(randomResult);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({ nama: '', noHp: '', lokasi: '' });
    setSelectedGejala([]);
    setResult(PENYAKIT_RESULTS[0]);
  };

  const handleStartDiagnosis = () => {
    setCurrentStep(1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4fbf7] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-6 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur md:p-6">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                Diagnosis Awal Penyakit Sapi
              </h1>
              <p className="text-sm text-gray-600">
                Isi data, pilih gejala, lalu lihat hasil analisis berbasis Certainty Factor.
              </p>
            </div>
            <div className="ml-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <ChevronLeft size={16} /> Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>

        {currentStep === 0 && (
          <div className="mx-auto w-full max-w-2xl">
            <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-xl md:p-10">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 p-4">
                  <ClipboardCheck className="h-16 w-16 text-emerald-600" />
                </div>
              </div>

              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Selamat Datang! 👋
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Diagnosis Awal Penyakit Sapi
                </p>
              </div>

              <div className="mb-8 space-y-4">
                <p className="text-gray-700">
                  Sistem pakar ini dirancang untuk membantu Anda mengidentifikasi penyakit pada sapi ternak dengan lebih cepat dan akurat.
                </p>

                <div className="space-y-3 rounded-2xl bg-emerald-50 p-5">
                  <h3 className="font-semibold text-gray-900">Bagaimana cara kerjanya?</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                        1
                      </span>
                      <span>Isi data diri peternak (nama, nomor HP, lokasi)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                        2
                      </span>
                      <span>Pilih gejala yang terlihat pada sapi Anda beserta tingkat keparahannya</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                        3
                      </span>
                      <span>Dapatkan hasil diagnosis dengan saran penanganan dari ahli</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                  💡 <span className="font-medium">Tips:</span> Pastikan Anda telah mengamati sapi dengan teliti sebelum mengisi gejala.
                </div>
              </div>

              <button
                onClick={handleStartDiagnosis}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-emerald-700 hover:to-teal-600"
              >
                Mulai Diagnosis Sekarang <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {currentStep > 0 && <StepIndicator currentStep={currentStep} />}

        <div className="flex justify-center">
          {currentStep === 1 && (
            <Step1
              onNext={() => setCurrentStep(2)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <Step2
              onNext={handleNextFromStep2}
              onBack={() => setCurrentStep(1)}
              selectedGejala={selectedGejala}
              setSelectedGejala={setSelectedGejala}
            />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              selectedGejala={selectedGejala}
              result={result}
              onBack={() => setCurrentStep(2)}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
