<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use App\Models\Diagnosis;
use App\Services\InferensiService;
use Illuminate\Http\Request;

class DiagnosisController extends Controller
{
    protected $inferensiService;

    public function __construct(InferensiService $inferensiService)
    {
        $this->inferensiService = $inferensiService;
    }

    /**
     * Tampilkan form diagnosa - pilih gejala & data sapi
     */
    public function create()
    {
        $gejalas = Gejala::orderBy('kode_gejala')->get();

        return inertia('pengguna/diagnosis/page', [
            'gejalas' => $gejalas,
            'jenisSapi' => Diagnosis::getJenisSapi(),
            'jenisKelamin' => Diagnosis::getJenisKelamin(),
            'umurKategori' => Diagnosis::getUmurKategori(),
        ]);
    }

    /**
     * Proses diagnosis - hitung CF dengan user confidence dan cari penyakit
     * 
     * Request body format:
     * {
     *     "gejala": [
     *         { "gejala_id": 1, "cf_user": 0.8 },
     *         { "gejala_id": 2, "cf_user": 0.5 }
     *     ],
     *     "nama_user": "Petani Budi",
     *     "alamat_user": "Jl. Raya No. 123",
     *     "no_hp_user": "08123456789",
     *     "jenis_sapi": "sapi_potong",
     *     "jenis_kelamin": "betina",
     *     "umur_kategori": "produktif"
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Data Peternak
            'nama_user' => 'required|string|max:100',
            'alamat_user' => 'required|string|max:255',
            'no_hp_user' => 'required|string|max:20',

            // Data Sapi
            'jenis_sapi' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getJenisSapi())),
            'jenis_kelamin' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getJenisKelamin())),
            'umur_kategori' => 'required|string|in:' . implode(',', array_keys(Diagnosis::getUmurKategori())),

            // Data Gejala
            'gejala' => 'required|array|min:1',
            'gejala.*.gejala_id' => 'required|integer|exists:gejalas,id',
            'gejala.*.cf_user' => 'required|numeric|min:0|max:1',
        ]);

        // STEP 1: Jalankan inferensi Forward Chaining dengan CF user
        $hasilInferensi = $this->inferensiService->inferensi($validated['gejala']);

        if (empty($hasilInferensi)) {
            return back()->with('error', 'Tidak ada penyakit yang cocok');
        }

        // STEP 2: Ambil diagnosis utama (CF tertinggi)
        $diagnosisUtama = $hasilInferensi[0];

        if (!$diagnosisUtama) {
            return back()->with('error', 'Tidak ada penyakit yang cocok dengan gejala yang dipilih');
        }

        // STEP 3: Ambil diagnosis banding (saran lainnya)
        $diagnosisBanding = array_slice($hasilInferensi, 1, 5); // Max 5 saran

        // STEP 4: Simpan hasil diagnosis ke database
        $diagnosis = Diagnosis::create([
            'nama_user' => $validated['nama_user'],
            'alamat_user' => $validated['alamat_user'],
            'no_hp_user' => $validated['no_hp_user'],
            'jenis_sapi' => $validated['jenis_sapi'],
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'umur_kategori' => $validated['umur_kategori'],
            'penyakit_id' => $diagnosisUtama['penyakit_id'],
            'nama_penyakit_snap' => $diagnosisUtama['nama_penyakit'],
            'cf_final' => $diagnosisUtama['cf'],
            'diagnosis_banding' => $diagnosisBanding,
            'gejala_input' => $validated['gejala'],
        ]);

        // Return JSON for API calls, redirect for form submissions
        if ($request->expectsJson()) {
            return response()->json([
                'diagnosis_id' => $diagnosis->id,
                'message' => 'Diagnosis berhasil disimpan',
            ]);
        }

        return redirect()->route('diagnosis.show', $diagnosis->id);
    }

    /**
     * Tampilkan hasil diagnosis dengan detail breakdown CF
     */
    public function show(Diagnosis $diagnosis)
    {
        $penyakit = $diagnosis->penyakit;
        $diagnosisBanding = $diagnosis->diagnosis_banding;

        // Ambil gejala dengan CF user dari session jika ada
        $gejalaDenganCf = $diagnosis->gejala_input ?? [];

        // Detail diagnosis - jika ada gejala yang dipilih
        $detailDiagnosis = null;
        if (!empty($gejalaDenganCf)) {
            $detailDiagnosis = $this->inferensiService->detailDiagnosis(
                $gejalaDenganCf,
                $diagnosis->penyakit_id
            );
        }

        return inertia('pengguna/diagnosis/example-show', [
            'diagnosis' => $diagnosis,
            'penyakit' => $penyakit,
            'diagnosis_banding' => $diagnosisBanding,
            'detail_diagnosis' => $detailDiagnosis,
            'interpretasi' => $this->getInterpretasi($diagnosis->cf_final ?? 0),
        ]);
    }

    /**
     * Interpretasi nilai CF
     */
    private function getInterpretasi(float $cf): array
    {
        if ($cf >= 0.8) {
            return [
                'level' => 'Sangat Mungkin',
                'persentase' => round($cf * 100, 1) . '%',
                'penjelasan' => 'Gejala yang diamati sangat cocok dengan penyakit ini. Disarankan untuk konsultasi dengan dokter hewan.',
                'color' => 'red',
            ];
        } elseif ($cf >= 0.6) {
            return [
                'level' => 'Mungkin',
                'persentase' => round($cf * 100, 1) . '%',
                'penjelasan' => 'Gejala menunjukkan kemungkinan penyakit ini. Monitoring kondisi sapi dan segera konsultasi dengan dokter hewan.',
                'color' => 'orange',
            ];
        } elseif ($cf >= 0.4) {
            return [
                'level' => 'Cukup Mungkin',
                'persentase' => round($cf * 100, 1) . '%',
                'penjelasan' => 'Ada indikasi penyakit ini tetapi tidak terlalu kuat. Lakukan observasi lebih lanjut.',
                'color' => 'yellow',
            ];
        } else {
            return [
                'level' => 'Tidak Pasti',
                'persentase' => round($cf * 100, 1) . '%',
                'penjelasan' => 'Gejala tidak menunjukkan penyakit ini dengan jelas. Cek gejala lainnya.',
                'color' => 'blue',
            ];
        }
    }

    /**
     * Get suggested gejala berdasarkan gejala yang dipilih (FC partial)
     */
    public function suggestGejala(Request $request)
    {
        $validated = $request->validate([
            'gejala' => 'required|array|min:1',
            'gejala.*.gejala_id' => 'required|integer|exists:gejalas,id',
            'gejala.*.cf_user' => 'required|numeric|min:0|max:1',
        ]);

        // Run FC partial untuk get suggested gejala
        $suggestedGejala = $this->inferensiService->suggestGejala($validated['gejala']);

        return response()->json([
            'suggestions' => $suggestedGejala,
        ]);
    }

    /**
     * Riwayat diagnosis
     */
    public function index()
    {
        $diagnoses = Diagnosis::with('penyakit')
            ->latest()
            ->paginate(10);

        return inertia('pengguna/diagnosis/example-create', [
            'diagnoses' => $diagnoses,
        ]);
    }
}
