import { useState } from 'react';
import { router } from '@inertiajs/react';

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

export function useFormSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDiagnosis = (data: DiagnosisSubmissionData) => {
    setIsLoading(true);
    setError(null);

    router.post('/diagnosis', data, {
      onError: (errors) => {
        console.error(errors);
        setError('Gagal memproses diagnosis');
        setIsLoading(false);
      },

      onSuccess: () => {
        setIsLoading(false);
      },

      onFinish: () => {
        setIsLoading(false);
      },
    });
  };

  return {
    submitDiagnosis,
    isLoading,
    error,
  };
}