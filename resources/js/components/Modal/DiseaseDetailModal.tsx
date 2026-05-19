import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Disease } from '@/types/disease';

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
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full max-w-sm h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Deskripsi
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {disease.fullDesc}
              </p>
            </div>

            {/* Gejala */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Gejala yang Mungkin Timbul
              </h3>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tombol Mulai Diagnosa */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button className="
                flex-1
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                py-2.5
                rounded-lg
                font-semibold
                transition-colors
                inline-flex
                items-center
                justify-center
                gap-2
                ">
                <ArrowRight size={18} />
                Mulai Diagnosa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
