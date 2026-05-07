import { useState } from 'react';

interface GejalaSubmission {
  gejala_id: number;
  cf_user: number;
}

interface DiagnosisSubmissionData extends Record<string, any> {
  nama_user: string;
  alamat_user: string;
  no_hp_user: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
  gejala: GejalaSubmission[];
}

interface SubmissionResponse {
  diagnosis_id: number;
  message: string;
}

export function useFormSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDiagnosis = async (data: DiagnosisSubmissionData) => {
    setIsLoading(true);
    setError(null);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: SubmissionResponse = await response.json();
      
      // Redirect to diagnosis show page
      window.location.href = `/diagnosis/${result.diagnosis_id}`;
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Gagal memproses diagnosis');
      setIsLoading(false);
    }
  };

  return {
    submitDiagnosis,
    isLoading,
    error,
  };
}