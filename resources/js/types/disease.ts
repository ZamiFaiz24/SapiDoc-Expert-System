export interface Disease {
  id: string;
  name: string;
  kategori_penyakit?: string;
  shortDesc: string;
  image: string;
  fullDesc: string;
  penanganan_awal?: string;
  symptoms: string[];
}
