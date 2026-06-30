import { X, Info } from 'lucide-react';

interface SeverityGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const severityLevels = [
  {
    color: 'bg-red-500',
    title: 'Sangat Parah',
    description:
      'Gejala terlihat sangat jelas dan kondisi sapi sangat mengkhawatirkan.',
  },
  {
    color: 'bg-orange-500',
    title: 'Parah',
    description:
      'Gejala terlihat jelas dan mulai mengganggu aktivitas atau nafsu makan sapi.',
  },
  {
    color: 'bg-yellow-400',
    title: 'Sedang',
    description:
      'Gejala sudah terlihat dan mudah dikenali oleh peternak.',
  },
  {
    color: 'bg-lime-500',
    title: 'Ringan',
    description:
      'Gejala baru mulai muncul atau hanya terlihat sedikit.',
  },
  {
    color: 'bg-gray-400',
    title: 'Tidak Ada',
    description:
      'Gejala tersebut tidak terlihat pada sapi.',
  },
];

export default function SeverityGuideModal({
  open,
  onClose,
}: SeverityGuideModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2">
              <Info className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Panduan Tingkat Keparahan
              </h2>

              <p className="text-sm text-gray-500">
                Pilih tingkat keparahan sesuai kondisi sapi.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              Pilih tingkat keparahan sesuai dengan kondisi sapi yang Anda
              amati. Semakin sesuai pilihan Anda, semakin baik sistem dalam
              memberikan hasil diagnosis.
            </p>
          </div>

          {severityLevels.map((level) => (
            <div
              key={level.title}
              className="flex gap-4 rounded-xl border border-gray-100 p-4"
            >
              <div
                className={`mt-1 h-5 w-5 rounded-full ${level.color}`}
              />

              <div>
                <h3 className="font-semibold text-gray-900">
                  {level.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {level.description}
                </p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              💡 <strong>Tips:</strong> Pilih tingkat keparahan sesuai kondisi
              sebenarnya. Hindari memilih tingkat yang terlalu tinggi atau
              terlalu rendah agar hasil diagnosis lebih akurat.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}