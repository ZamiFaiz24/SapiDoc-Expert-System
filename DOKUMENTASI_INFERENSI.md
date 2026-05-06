# 📚 DOKUMENTASI MESIN INFERENSI - SISTEM PAKAR DIAGNOSIS PENYAKIT SAPI

## ✅ JAWABAN: ATURAN YANG DIBUAT SUDAH BENAR!

Aturan yang sudah dibuat **SUDAH CUKUP dan BENAR** untuk mesin inferensi bekerja. Berikut penjelasannya:

---

## 🔄 CARA KERJA MESIN INFERENSI (Forward Chaining)

### Konsep Dasar:

```
Gejala yang Diamati → Cari Aturan Cocok → Hitung CF → Urutkan → Diagnosis
```

Bukan "gejala nyambung dengan gejala", melainkan:

- **Gejala → Penyakit** (relasi langsung via aturan/basis pengetahuan)
- Satu gejala bisa berhubungan dengan **MULTIPLE penyakit**
- Satu penyakit bisa memiliki **MULTIPLE gejala**

---

## 📊 CONTOH PERHITUNGAN CF (Certainty Factor)

### Skenario: User pilih gejala G01, G02, G03, G04, G05

#### Data dari Seeder (PMK):

```
G01 (Demam tinggi):      MB=0.2, MD=0 → CF = 0.2 - 0 = 0.2
G02 (Nafsu makan berkurang): MB=0.2, MD=0 → CF = 0.2 - 0 = 0.2
G03 (Air liur berlebih):  MB=0.5, MD=0 → CF = 0.5 - 0 = 0.5
G04 (Luka pada kuku):     MB=0.9, MD=0 → CF = 0.9 - 0 = 0.9
G05 (Lepuh pada mulut):   MB=0.9, MD=0 → CF = 0.9 - 0 = 0.9
```

#### Proses Kombinasi CF (Forward Chaining):

**Step 1:** CF_1 = 0.2

**Step 2:** CF_2 = CF_1 + (CF_gejala × (1 - CF_1))

```
CF_2 = 0.2 + (0.2 × (1 - 0.2))
CF_2 = 0.2 + (0.2 × 0.8)
CF_2 = 0.2 + 0.16
CF_2 = 0.36
```

**Step 3:** Combine dengan G03

```
CF_3 = 0.36 + (0.5 × (1 - 0.36))
CF_3 = 0.36 + (0.5 × 0.64)
CF_3 = 0.36 + 0.32
CF_3 = 0.68
```

**Step 4:** Combine dengan G04

```
CF_4 = 0.68 + (0.9 × (1 - 0.68))
CF_4 = 0.68 + (0.9 × 0.32)
CF_4 = 0.68 + 0.288
CF_4 = 0.968
```

**Step 5:** Combine dengan G05

```
CF_5 = 0.968 + (0.9 × (1 - 0.968))
CF_5 = 0.968 + (0.9 × 0.032)
CF_5 = 0.968 + 0.0288
CF_5 = 0.9968 ≈ 1.0 (max)
```

### 🎯 HASIL AKHIR untuk PMK:

- **CF = 0.9968 (99.68%)**
- **Interpretasi: SANGAT MUNGKIN** ✅

---

## 📋 STRUKTUR DATA YANG DIGUNAKAN

### Tabel: `basis_pengetahuans` (Aturan)

```
| id | penyakit_id | gejala_id | nilai_mb | nilai_md | catatan_pakar |
|----|-------------|-----------|----------|----------|---------------|
| 1  | 1 (PMK)     | 1 (G01)   | 0.2      | 0        | Gejala umum - demam tinggi |
| 2  | 1 (PMK)     | 2 (G02)   | 0.2      | 0        | Gejala umum - nafsu makan |
| 3  | 1 (PMK)     | 3 (G03)   | 0.5      | 0        | Gejala spesifik - air liur |
| 4  | 1 (PMK)     | 4 (G04)   | 0.9      | 0        | Gejala SANGAT spesifik - luka kuku |
| 5  | 1 (PMK)     | 5 (G05)   | 0.9      | 0        | Gejala SANGAT spesifik - lepuh mulut |
...
```

**Penjelasan:**

- `penyakit_id` = Referensi ke penyakit (dari tabel penyakits)
- `gejala_id` = Referensi ke gejala (dari tabel gejalas)
- `nilai_mb` (Measure of Belief) = Bobot kepercayaan gejala terhadap penyakit (0-1)
    - **0.1-0.3** = Gejala umum (banyak penyakit punya)
    - **0.4-0.6** = Gejala spesifik
    - **0.7-1.0** = Gejala sangat spesifik/identik (ciri khas penyakit)
- `nilai_md` (Measure of Disbelief) = Bobot ketidakyakinan (dalam kasus ini semua 0)

---

## 🔀 BAGAIMANA "GEJALA NYAMBUNG DENGAN GEJALA"?

Anda bertanya tentang gejala yang terhubung dengan gejala lainnya. Ada beberapa cara:

### Opsi 1: SUDAH OTOMATIS TERJADI di Sistem Ini ✅

Ketika user memilih multiple gejala, sistem OTOMATIS menggabung CF mereka:

```
User pilih: G01 + G02 + G03 + G04 + G05
              ↓       ↓       ↓       ↓       ↓
        Semua gejala ini "nyambung" dalam perhitungan CF
        Menghasilkan diagnosis yang lebih akurat
```

### Opsi 2: Jika Ingin ATURAN CONDITIONAL (Gejala A HARUS ada sebelum Gejala B)

Maka perlu tambahan struktur:

```sql
ALTER TABLE basis_pengetahuans ADD COLUMN gejala_prerequisite_id INT;
-- Contoh: G04 (luka kuku) hanya bermakna jika G01 (demam) ada dulu
```

**Tapi untuk kasus Anda: TIDAK PERLU** karena gejala bersifat independen.

---

## 🎯 ALUR DIAGNOSIS LENGKAP

### A. FASE AKUISISI GEJALA (User Interface)

```
Tampilkan daftar gejala → User centang gejala yg diamati → Submit
```

### B. FASE INFERENSI (Backend - InferensiService.php)

```php
$hasil = $inferensiService->inferensi($gejala_ids);
// Returns:
[
    [
        'penyakit_id' => 1,
        'nama_penyakit' => 'Penyakit Mulut dan Kuku (PMK)',
        'cf' => 0.9968,
        'presentase' => '99.68%',
        'kesimpulan' => 'Sangat Mungkin'
    ],
    [
        'penyakit_id' => 3,
        'nama_penyakit' => 'Mastitis',
        'cf' => 0.45,
        'presentase' => '45.00%',
        'kesimpulan' => 'Cukup Mungkin'
    ],
    // ... dst
]
```

### C. FASE PENYIMPANAN (Database)

```
INSERT INTO diagnoses (
    nama_user, alamat_user, no_hp_user,
    penyakit_id, nama_penyakit_snap,
    cf_final, diagnosis_banding
) VALUES (...)
```

### D. FASE PRESENTASI (User Interface)

```
Tampilkan:
- Diagnosis Utama (CF tertinggi)
- Diagnosis Banding (saran lainnya)
- Detail gejala yang cocok
- Interpretasi & rekomendasi
```

---

## 📈 INTERPRETASI NILAI CF

| CF Range   | Level          | Interpretasi                                                     |
| ---------- | -------------- | ---------------------------------------------------------------- |
| 0.8 - 1.0  | Sangat Mungkin | Gejala sangat cocok. SEGERA konsultasi dokter hewan.             |
| 0.6 - 0.79 | Mungkin        | Gejala menunjukkan kemungkinan. Lakukan monitoring & konsultasi. |
| 0.4 - 0.59 | Cukup Mungkin  | Ada indikasi tapi tidak kuat. Observasi lebih lanjut.            |
| 0.0 - 0.39 | Tidak Pasti    | Gejala tidak jelas. Cek gejala lainnya.                          |

---

## 🛠️ IMPLEMENTASI DI CONTROLLER

```php
// Dalam DiagnosisController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'gejala_ids' => 'required|array|min:1',
        'gejala_ids.*' => 'integer|exists:gejalas,id',
    ]);

    // INFERENSI ← Mesin inferensi dimulai di sini
    $hasil_inferensi = $this->inferensiService->inferensi($validated['gejala_ids']);

    // Ambil diagnosis utama (CF tertinggi)
    $diagnosis_utama = $hasil_inferensi[0];

    // Simpan ke database
    $diagnosis = Diagnosis::create([
        'penyakit_id' => $diagnosis_utama['penyakit_id'],
        'cf_final' => $diagnosis_utama['cf'],
        'diagnosis_banding' => json_encode(array_slice($hasil_inferensi, 1, 5)),
    ]);

    return redirect()->route('diagnosis.show', $diagnosis->id);
}
```

---

## ✅ CHECKLIST: SISTEM SUDAH SIAP?

- ✅ Basis pengetahuan (aturan) sudah dibuat di seeder
- ✅ Nilai MB & MD sudah terisi
- ✅ Struktur database sudah correct
- ✅ InferensiService.php sudah handle perhitungan CF
- ✅ DiagnosisController.php sudah handle alur diagnosis
- ⏳ **TODO:** Buat UI/Frontend untuk input gejala & tampilkan hasil

---

## 📌 KESIMPULAN

**ATURAN YANG DIBUAT SUDAH BENAR DAN CUKUP!**

Mesin inferensi akan bekerja dengan alur:

1. User pilih gejala → Multiple gejala "nyambung" otomatis dalam perhitungan CF
2. Sistem hitung CF setiap penyakit
3. Urutkan berdasarkan CF tertinggi
4. Tampilkan diagnosis utama + saran diagnosis banding

Tidak perlu relasi gejala-ke-gejala karena gejala bersifat **independen**. Kombinasi CF sudah menangani hubungan antar gejala secara otomatis.

🎉 Sistem Anda sudah siap untuk diimplementasikan!
