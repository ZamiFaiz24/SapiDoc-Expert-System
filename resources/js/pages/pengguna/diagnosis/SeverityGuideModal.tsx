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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-emerald-100 p-2.5 shadow-sm">
              <Info className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Panduan Tingkat Keparahan
              </h2>

              <p className="max-w-md text-sm text-gray-500">
                Pilih tingkat keparahan sesuai kondisi sapi.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Tutup modal panduan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <p className="text-sm leading-relaxed text-emerald-900">
              Pilih tingkat keparahan sesuai dengan kondisi sapi yang Anda
              amati. Semakin sesuai pilihan Anda, semakin baik sistem dalam
              memberikan hasil diagnosis.
            </p>
          </div>

          <div className="space-y-3">
            {severityLevels.map((level) => (
              <div
                key={level.title}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div className={`mt-1 h-4 w-4 rounded-full ${level.color} ring-4 ring-gray-50`} />

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">
                    {level.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {level.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>Tips:</strong> Pilih tingkat keparahan sesuai kondisi
              sebenarnya. Hindari memilih tingkat yang terlalu tinggi atau
              terlalu rendah agar hasil diagnosis lebih akurat.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50/60 p-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}