import { STEP_META } from '../diagnosis/constants/step-meta';

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-center justify-center">

        {STEP_META.map((step, idx) => (
          <div key={step.id} className="flex items-center">

            {/* Step */}
            <div className="flex flex-col items-center text-center min-w-[90px]">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  step.id <= currentStep
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {step.id}
              </div>

              <div className="mt-2 hidden md:block">
                <p className="text-xs font-semibold text-gray-800">
                  {step.title}
                </p>

                <p className="text-[11px] text-gray-500">
                  {step.subtitle}
                </p>
              </div>
            </div>

            {/* Line */}
            {idx < STEP_META.length - 1 && (
              <div
                className={`mx-2 h-[3px] w-16 rounded-full transition-all duration-300 ${
                  step.id < currentStep
                    ? 'bg-emerald-600'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}

      </div>

      {/* Mobile */}
      <div className="mt-4 text-center md:hidden">
        <p className="text-sm font-semibold text-gray-800">
          {STEP_META[currentStep - 1]?.title}
        </p>

        <p className="text-xs text-gray-500">
          {STEP_META[currentStep - 1]?.subtitle}
        </p>
      </div>
    </div>
  );
}