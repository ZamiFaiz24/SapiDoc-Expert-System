import { useState } from 'react';
import { router } from '@inertiajs/react';

interface GejalaSubmission {
  gejala_id: number;
  cf_user: number;
}

interface DiagnosisSubmissionData {
  nama_user: string;
  alamat_user: string;
  no_hp_user: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
  gejala: GejalaSubmission[];
}

export function useFormSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDiagnosis = async (data: DiagnosisSubmissionData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memproses diagnosis');
      }

      const result = await response.json();
      
      // Redirect ke hasil diagnosis
      if (result.diagnosis_id) {
        router.visit(`/diagnosis/${result.diagnosis_id}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses diagnosis';
      setError(message);
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitDiagnosis, isLoading, error };
}
