'use client';

import { useState } from 'react';

import { Link } from '@inertiajs/react';
import { ClipboardCheck, ChevronLeft } from 'lucide-react';

import { useFormSubmission } from '../../../hooks/use-form-submission';

import Navbar from './NavbarDiagnosis';
import SeverityGuideModal from './SeverityGuideModal';
import LandingSection from './LandingSection';
import StepIndicator from './StepIndicator';
import Step1 from './step/Step1Data';
import Step2 from './step/Step2Umum';
import Step3 from './step/Step3Spesifik';

import { 
  PageProps,
  FormData, 
  SelectedGejala, 
  SuggestedGejala } from '../../../types/diagnosis';


export default function DiagnosisPage({
  gejalas,
  jenisSapi,
  jenisKelamin,
  umurKategori,
}: PageProps) {

  // =========================
  // STATE
  // =========================

  const [currentStep, setCurrentStep] = useState(0);

  const [openGuide, setOpenGuide] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nama_user: '',
    alamat_user: '',
    no_hp_user: '',
    jenis_sapi: '',
    jenis_kelamin: '',
    umur_kategori: '',
  });

  const [selectedGejala, setSelectedGejala] = useState<
    SelectedGejala[]
  >([]);

  const {
    submitDiagnosis,
    isLoading,
    error,
  } = useFormSubmission();

  // =========================
  // HANDLER
  // =========================

  const handleStartDiagnosis = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    const submissionData = {
      nama_user: formData.nama_user,
      alamat_user: formData.alamat_user,
      no_hp_user: formData.no_hp_user,
      jenis_sapi: formData.jenis_sapi,
      jenis_kelamin: formData.jenis_kelamin,
      umur_kategori: formData.umur_kategori,

      gejala: selectedGejala.map((g) => ({
        gejala_id: g.id,
        cf_user: g.cf_user,
      })),
    };

    await submitDiagnosis(submissionData);
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="relative min-h-screen bg-white">

      {/* Background Blur */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      {/* Navbar */}
        <Navbar
            onOpenGuide={() => setOpenGuide(true)}
        />
      
      <div className="relative mx-auto w-full max-w-5xl mt-6">

        {/* Landing */}
        {currentStep === 0 ? (
          <LandingSection
            onStart={handleStartDiagnosis}
          />
        ) : (
          <>
            {/* Progress */}
            <StepIndicator currentStep={currentStep} />

            {/* Content */}
            <div className="flex justify-center">

              {currentStep === 1 && (
                <Step1
                  onNext={() => setCurrentStep(2)}
                  formData={formData}
                  setFormData={setFormData}
                  jenisSapi={jenisSapi}
                  jenisKelamin={jenisKelamin}
                  umurKategori={umurKategori}
                />
              )}

              {currentStep === 2 && (
                <Step2
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                  selectedGejala={selectedGejala}
                  setSelectedGejala={setSelectedGejala}
                  gejalas={gejalas}
                />
              )}

              {currentStep === 3 && (
                <Step3
                  onNext={handleSubmit}
                  onBack={() => setCurrentStep(2)}
                  selectedGejala={selectedGejala}
                  setSelectedGejala={setSelectedGejala}
                  gejalas={gejalas}
                  formData={formData}
                  isLoading={isLoading}
                  error={error}
                />
              )}

            </div>
          </>
        )}

      </div>
      <SeverityGuideModal
          open={openGuide}
          onClose={() => setOpenGuide(false)}
      />
    </div>
  );
}