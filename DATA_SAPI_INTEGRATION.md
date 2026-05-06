# 🐄 INTEGRASI DATA SAPI KE DALAM FORM DIAGNOSIS

## Perubahan yang Dilakukan

### 1️⃣ Database Migration

**File:** `2026_05_06_152037_add_data_sapi_to_diagnoses_table.php`

```php
Schema::table('diagnoses', function (Blueprint $table) {
    $table->string('jenis_sapi')->after('no_hp_user');
    $table->string('jenis_kelamin')->after('jenis_sapi');
    $table->string('umur_kategori')->after('jenis_kelamin');
});
```

**Kolom yang ditambahkan:**

- `jenis_sapi` - Tipe sapi (potong, perah, kerja)
- `jenis_kelamin` - Jenis kelamin (jantan/betina)
- `umur_kategori` - Kategori umur (anak/muda/produktif/tua)

---

### 2️⃣ Model Update

**File:** `app/Models/Diagnosis.php`

#### Updated `$fillable`:

```php
protected $fillable = [
    'nama_user',
    'alamat_user',
    'no_hp_user',
    'jenis_sapi',          // ← NEW
    'jenis_kelamin',       // ← NEW
    'umur_kategori',       // ← NEW
    'penyakit_id',
    'nama_penyakit_snap',
    'cf_final',
    'diagnosis_banding',
    'gejala_input',
];
```

#### Helper Methods (NEW):

```php
public static function getJenisSapi(): array
{
    return [
        'sapi_potong' => 'Sapi Potong',
        'sapi_perah' => 'Sapi Perah',
        'sapi_kerja' => 'Sapi Kerja',
    ];
}

public static function getJenisKelamin(): array
{
    return [
        'jantan' => 'Jantan',
        'betina' => 'Betina',
    ];
}

public static function getUmurKategori(): array
{
    return [
        'anak' => 'Anak (< 1 tahun)',
        'muda' => 'Muda (1-3 tahun)',
        'produktif' => 'Produktif (3-7 tahun)',
        'tua' => 'Tua (> 7 tahun)',
    ];
}
```

---

### 3️⃣ Controller Update

**File:** `app/Http/Controllers/DiagnosisController.php`

#### Method `create()` - Mengirim data untuk form:

```php
public function create()
{
    $gejalas = Gejala::orderBy('kode_gejala')->get();

    return inertia('Diagnosis/Create', [
        'gejalas' => $gejalas,
        'jenisSapi' => Diagnosis::getJenisSapi(),      // ← NEW
        'jenisKelamin' => Diagnosis::getJenisKelamin(), // ← NEW
        'umurKategori' => Diagnosis::getUmurKategori(), // ← NEW
    ]);
}
```

#### Method `store()` - Validasi data:

```php
$validated = $request->validate([
    // Data Peternak
    'nama_user' => 'required|string|max:100',
    'alamat_user' => 'required|string|max:255',
    'no_hp_user' => 'required|string|max:20',

    // Data Sapi ← NEW
    'jenis_sapi' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getJenisSapi())),
    'jenis_kelamin' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getJenisKelamin())),
    'umur_kategori' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getUmurKategori())),

    // Data Gejala
    'gejala' => 'required|array|min:1',
    'gejala.*.gejala_id' => 'required|integer|exists:gejalas,id',
    'gejala.*.cf_user' => 'required|numeric|min:0|max:1',
]);
```

#### Penyimpanan data (dalam `store()`):

```php
$diagnosis = Diagnosis::create([
    'nama_user' => $validated['nama_user'],
    'alamat_user' => $validated['alamat_user'],
    'no_hp_user' => $validated['no_hp_user'],
    'jenis_sapi' => $validated['jenis_sapi'],           // ← NEW
    'jenis_kelamin' => $validated['jenis_kelamin'],     // ← NEW
    'umur_kategori' => $validated['umur_kategori'],     // ← NEW
    'penyakit_id' => $diagnosisUtama['penyakit_id'],
    'nama_penyakit_snap' => $diagnosisUtama['nama_penyakit'],
    'cf_final' => $diagnosisUtama['cf'],
    'diagnosis_banding' => $diagnosisBanding,
    'gejala_input' => $validated['gejala'],
]);
```

---

## 📋 Format Request (Postman/API Client)

```json
{
    "nama_user": "Petani Budi",
    "alamat_user": "Jl. Raya No. 123, Yogyakarta",
    "no_hp_user": "08123456789",

    "jenis_sapi": "sapi_potong",
    "jenis_kelamin": "betina",
    "umur_kategori": "produktif",

    "gejala": [
        { "gejala_id": 1, "cf_user": 0.9 },
        { "gejala_id": 4, "cf_user": 1.0 },
        { "gejala_id": 5, "cf_user": 0.7 }
    ]
}
```

---

## 🎨 Form Structure (Frontend)

### Tiga Section Utama:

#### 1. Data Peternak (Biru)

```
📋 Data Peternak
├─ Nama Peternak
├─ No. HP
└─ Alamat
```

#### 2. Data Sapi (Hijau) - BARU

```
🐄 Data Sapi
├─ Jenis Sapi (Dropdown)
│  ├─ Sapi Potong
│  ├─ Sapi Perah
│  └─ Sapi Kerja
├─ Jenis Kelamin (Dropdown)
│  ├─ Jantan
│  └─ Betina
└─ Kategori Umur (Dropdown)
   ├─ Anak (< 1 tahun)
   ├─ Muda (1-3 tahun)
   ├─ Produktif (3-7 tahun)
   └─ Tua (> 7 tahun)
```

#### 3. Gejala & Tingkat Keparahan

```
🩺 Pilih Gejala & Tingkat Keparahan
├─ Gejala 1
│  ├─ Severity Buttons (0.0 - 1.0)
│  └─ Progress Bar
├─ Gejala 2
│  ├─ Severity Buttons
│  └─ Progress Bar
└─ ... dst
```

---

## ✅ Validasi yang Dilakukan

| Field                | Tipe    | Rules                       | Error Message                          |
| -------------------- | ------- | --------------------------- | -------------------------------------- |
| `nama_user`          | String  | required, max:100           | Nama harus diisi, max 100 karakter     |
| `alamat_user`        | String  | required, max:255           | Alamat harus diisi, max 255 karakter   |
| `no_hp_user`         | String  | required, max:20            | No. HP harus diisi, max 20 karakter    |
| `jenis_sapi`         | String  | required, in:values         | Pilih salah satu jenis sapi yang valid |
| `jenis_kelamin`      | String  | required, in:values         | Pilih salah satu jenis kelamin         |
| `umur_kategori`      | String  | required, in:values         | Pilih salah satu kategori umur         |
| `gejala`             | Array   | required, min:1             | Minimal 1 gejala harus dipilih         |
| `gejala.*.gejala_id` | Integer | required, exists:gejalas,id | Gejala harus valid di database         |
| `gejala.*.cf_user`   | Numeric | required, min:0, max:1      | CF user harus antara 0-1               |

---

## 📊 Data yang Disimpan ke Database

```sql
INSERT INTO diagnoses (
    nama_user,
    alamat_user,
    no_hp_user,
    jenis_sapi,           ← NEW
    jenis_kelamin,        ← NEW
    umur_kategori,        ← NEW
    penyakit_id,
    nama_penyakit_snap,
    cf_final,
    diagnosis_banding,
    gejala_input,
    created_at,
    updated_at
) VALUES (...)
```

---

## 🔍 Contoh Response pada Show Diagnosis

```json
{
  "diagnosis": {
    "id": 1,
    "nama_user": "Petani Budi",
    "alamat_user": "Jl. Raya No. 123",
    "no_hp_user": "08123456789",
    "jenis_sapi": "sapi_potong",
    "jenis_kelamin": "betina",
    "umur_kategori": "produktif",
    "penyakit_id": 1,
    "nama_penyakit_snap": "Penyakit Mulut dan Kuku (PMK)",
    "cf_final": 0.9696,
    "diagnosis_banding": [...],
    "gejala_input": [...],
    "created_at": "2026-05-06T15:20:37Z",
    "updated_at": "2026-05-06T15:20:37Z"
  }
}
```

---

## 🚀 Testing dengan cURL

```bash
curl -X POST http://localhost:8000/diagnosis \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nama_user": "Petani Budi",
    "alamat_user": "Jl. Raya No. 123, Yogyakarta",
    "no_hp_user": "08123456789",
    "jenis_sapi": "sapi_potong",
    "jenis_kelamin": "betina",
    "umur_kategori": "produktif",
    "gejala": [
      {"gejala_id": 1, "cf_user": 0.9},
      {"gejala_id": 4, "cf_user": 1.0},
      {"gejala_id": 5, "cf_user": 0.7}
    ]
  }'
```

---

## 📝 Implementasi pada Frontend

**File yang perlu diupdate:** `resources/js/pages/pengguna/diagnosis/Create.tsx`

```tsx
// Terima props dari backend
<DiagnosisCreate
  gejalas={gejalas}
  jenisSapi={jenisSapi}
  jenisKelamin={jenisKelamin}
  umurKategori={umurKategori}
/>

// Buat form dengan 3 section:
// 1. Data Peternak
// 2. Data Sapi (NEW)
// 3. Pilih Gejala

// Kirim data dengan format:
const formData = {
  nama_user,
  alamat_user,
  no_hp_user,
  jenis_sapi,     // ← NEW
  jenis_kelamin,  // ← NEW
  umur_kategori,  // ← NEW
  gejala: [
    { gejala_id, cf_user },
    ...
  ]
}

post('/diagnosis', formData)
```

---

## ✨ Fitur Tambahan di Frontend

### 1. Validasi Real-time

- Disable tombol submit jika data sapi belum lengkap
- Disable tombol submit jika belum ada gejala

### 2. Summary Section

- Display data peternak yang diisi
- Display data sapi yang dipilih
- Display jumlah dan daftar gejala terpilih

### 3. Visual Feedback

- Badge dengan warna berbeda untuk setiap section
- Progress bar untuk CF user setiap gejala
- Icon emoji untuk memudahkan identifikasi section

---

## 📌 Checklist Implementasi

- ✅ Migration untuk menambah kolom `jenis_sapi`, `jenis_kelamin`, `umur_kategori`
- ✅ Model Diagnosis updated dengan helper methods
- ✅ Controller validasi dan penyimpanan data
- ✅ Contoh Frontend form (example-create-updated.tsx)
- ⏳ **TODO:** Jalankan migration
- ⏳ **TODO:** Update actual form di `resources/js/pages/pengguna/diagnosis/Create.tsx`
- ⏳ **TODO:** Test form dengan data lengkap

---

## 🔗 Relasi Data

```
Diagnosis
├─ nama_user          (String)
├─ alamat_user        (String)
├─ no_hp_user         (String)
├─ jenis_sapi         (String)  ← NEW
├─ jenis_kelamin      (String)  ← NEW
├─ umur_kategori      (String)  ← NEW
├─ penyakit_id        (Foreign Key → Penyakit)
├─ nama_penyakit_snap (String)
├─ cf_final           (Float)
├─ diagnosis_banding  (JSON Array)
├─ gejala_input       (JSON Array)
└─ timestamps
```

---

## 💡 Tips Pengembangan Selanjutnya

1. **Tambah Laporan**: Buat laporan diagnosis berdasarkan data sapi

    - Filter diagnosis by jenis_sapi, jenis_kelamin, umur_kategori
    - Analisis penyakit yang sering menyerang sapi muda, tua, dll

2. **Notifikasi**: Alert jika sapi dengan kategori tertentu berisiko tinggi

    - Sapi produktif (3-7 tahun) → risiko mastitis tinggi
    - Sapi bunting → risiko hipokalsemia tinggi

3. **Rekomendasi Manajemen**: Berdasarkan umur & jenis kelamin

    - Sapi betina muda → monitoring reproduksi
    - Sapi jantan tua → monitoring performa

4. **Export Data**: Laporan diagnosis dengan data sapi detail

---
