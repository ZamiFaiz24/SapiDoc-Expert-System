export interface Gejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  jenis_kelamin?: string;
  umur_kategori?: string;
}

export interface PageProps {
  gejalas: Gejala[];
  jenisSapi: Record<string, string>;
  jenisKelamin: Record<string, string>;
  umurKategori: Record<string, string>;
}

export interface FormData {
  nama_user: string;
  alamat_user: string;
  no_hp_user: string;
  jenis_sapi: string;
  jenis_kelamin: string;
  umur_kategori: string;
}

export interface SelectedGejala {
  id: number;
  nama_gejala: string;
  cf_user: number;
}

export interface SuggestedGejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
  kategori: string;
  cf_score: number;
}