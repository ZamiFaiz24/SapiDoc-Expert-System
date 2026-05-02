import { X } from 'lucide-react';
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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-emerald-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">{disease.name}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
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
                className="w-full h-64 object-cover rounded-lg"
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
                      <span className="text-emerald-600 font-bold mt-1">
                        •
                      </span>
                      <span className="text-gray-600">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tombol Mulai Diagnosa */}
          <div className="mt-8 pt-8 border-t">
            <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Mulai Diagnosa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
