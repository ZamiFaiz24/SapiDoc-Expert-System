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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b bg-white text-white p-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900">{disease.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gambar di kiri */}
            <div className="flex items-start justify-center">
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full h-64 object-cover rounded-2xl shadow-md"
              />
            </div>

            {/* Teks di kanan */}
            <div className="space-y-6">
              {/* Deskripsi */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Deskripsi
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {disease.fullDesc}
                </p>
              </div>

              {/* Gejala */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Gejala
                </h3>
                <ul className="space-y-2">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3">
                       <CheckCircle className="text-emerald-600 mt-1" size={20} />
                      <span className="text-gray-600">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tombol Mulai Diagnosa */}
          <div className="mt-8 pt-8 border-t">
            <button className="
              w-full
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              py-4
              rounded-2xl
              font-semibold
              transition
              inline-flex
              items-center
              justify-center
              gap-2
              shadow-lg shadow-emerald-200
              ">
              Mulai Diagnosa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
