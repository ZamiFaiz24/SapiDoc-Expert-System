import { useState } from 'react';

interface GejalaData {
  gejala_id: number;
  cf_user: number;
}

interface SuggestedGejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  cf_score: number;
}

export function useFcSuggestion() {
  const [suggestions, setSuggestions] = useState<SuggestedGejala[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestedGejala = async (selectedGejala: GejalaData[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/diagnosis/suggest-gejala', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          gejala: selectedGejala,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan saran gejala');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      return data.suggestions || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
      console.error('Suggestion error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { getSuggestedGejala, suggestions, isLoading, error };
}
