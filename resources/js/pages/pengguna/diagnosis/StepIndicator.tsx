import { STEP_META } from '../diagnosis/constants/step-meta';

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="mb-8 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
      <div className="flex items-start justify-center gap-2 md:gap-4">
        {STEP_META.map((step, idx) => (
          <div key={step.id} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1 text-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all md:h-10 md:w-10 md:text-sm ${
                  step.id <= currentStep
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {step.id}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-gray-800">{step.title}</p>
                <p className="text-[10px] text-gray-500">{step.subtitle}</p>
              </div>
            </div>
            {idx < STEP_META.length - 1 && (
              <div
                className={`mt-2 h-1 flex-1 rounded-full transition-all md:mt-0 ${
                  step.id < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 text-center md:hidden">
        <p className="text-xs font-semibold text-gray-800">{STEP_META[currentStep - 1]?.title}</p>
        <p className="text-[10px] text-gray-500">{STEP_META[currentStep - 1]?.subtitle}</p>
      </div>
    </div>
  );
}