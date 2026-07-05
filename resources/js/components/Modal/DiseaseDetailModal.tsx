import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Disease } from '@/types/disease';
import { Link } from '@inertiajs/react';

interface DiseaseDetailModalProps {
  isOpen: boolean;
  disease: Disease | null;
  onClose: () => void;
}

export default function DiseaseDetailModal({
  isOpen,
  disease,
  onClose,
}: DiseaseDetailModalProps) {
  if (!isOpen || !disease) return null;

  const hasImage = Boolean(disease.image);
  const hasSymptoms = Boolean(disease.symptoms?.length);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white">{disease.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-emerald-500 rounded-lg transition-colors text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Gambar */}
            <div className="flex justify-center">
              {hasImage ? (
                <img
                  src={disease.image}
                  alt={disease.name}
                  className="w-full max-w-sm h-48 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="flex h-48 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-500">
                  Gambar penyakit belum diisi
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Deskripsi
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {disease.fullDesc || 'Deskripsi penyakit belum tersedia.'}
              </p>
            </div>

            {disease.kategori_penyakit ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Kategori
                </h3>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                  {disease.kategori_penyakit}
                </span>
              </div>
            ) : null}

            {disease.penanganan_awal ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Penanganan Awal
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  {disease.penanganan_awal}
                </p>
              </div>
            ) : null}

            {/* Gejala */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Gejala yang Mungkin Timbul
              </h3>
              {hasSymptoms ? (
                <ul className="space-y-2">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
                  Gejala untuk penyakit ini belum diisi.
                </p>
              )}
            </div>

            {/* Tombol Modal Detail */}
            <div className="flex gap-3 border-t border-gray-200 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>

              <Link
                href="/diagnosis"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <ArrowRight size={18} />
                Mulai Diagnosis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
