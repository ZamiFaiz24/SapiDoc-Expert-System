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
     * Tampilkan form diagnosa - pilih gejala
     */
    public function create()
    {
        $gejalas = Gejala::orderBy('kode_gejala')->get();

        return inertia('Diagnosis/Create', [
            'gejalas' => $gejalas,
        ]);
    }

    /**
     * Proses diagnosis - hitung CF dengan user confidence dan cari penyakit
     * 
     * Request body format:
     * {
     *     "gejala": [
     *         { "gejala_id": 1, "cf_user": 0.8 },   // Gejala jelas (80%)
     *         { "gejala_id": 2, "cf_user": 0.5 },   // Gejala kurang jelas (50%)
     *         { "gejala_id": 4, "cf_user": 0.9 }    // Gejala sangat jelas (90%)
     *     ],
     *     "nama_user": "Petani Budi",
     *     "alamat_user": "Jl. Raya No. 123",
     *     "no_hp_user": "08123456789"
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gejala' => 'required|array|min:1',
            'gejala.*.gejala_id' => 'required|integer|exists:gejalas,id',
            'gejala.*.cf_user' => 'required|numeric|min:0|max:1',
            'nama_user' => 'required|string',
            'alamat_user' => 'required|string',
            'no_hp_user' => 'required|string',
        ]);

        // STEP 1: Jalankan inferensi Forward Chaining dengan CF user
        $hasil_inferensi = $this->inferensiService->inferensi($validated['gejala']);

        // STEP 2: Ambil diagnosis utama (CF tertinggi)
        $diagnosis_utama = $hasil_inferensi[0] ?? null;

        if (!$diagnosis_utama) {
            return back()->with('error', 'Tidak ada penyakit yang cocok dengan gejala yang dipilih');
        }

        // STEP 3: Ambil diagnosis banding (saran lainnya)
        $diagnosis_banding = array_slice($hasil_inferensi, 1, 5); // Max 5 saran

        // STEP 4: Simpan hasil diagnosis ke database
        $diagnosis = Diagnosis::create([
            'nama_user' => $validated['nama_user'],
            'alamat_user' => $validated['alamat_user'],
            'no_hp_user' => $validated['no_hp_user'],
            'penyakit_id' => $diagnosis_utama['penyakit_id'],
            'nama_penyakit_snap' => $diagnosis_utama['nama_penyakit'],
            'cf_final' => $diagnosis_utama['cf'],
            'diagnosis_banding' => $diagnosis_banding,
            'gejala_input' => $validated['gejala'], 
        ]);

        return redirect()->route('diagnosis.show', $diagnosis->id);
    }

    /**
     * Tampilkan hasil diagnosis dengan detail breakdown CF
     */
    public function show(Diagnosis $diagnosis)
    {
        $penyakit = $diagnosis->penyakit;
        $diagnosis_banding = $diagnosis->diagnosis_banding;

        // Ambil gejala dengan CF user dari session jika ada
        $gejala_dengan_cf = $diagnosis->gejala_input ?? [];
        
        // Detail diagnosis - jika ada gejala yang dipilih
        $detail_diagnosis = null;
        if (!empty($gejala_dengan_cf)) {
            $detail_diagnosis = $this->inferensiService->detailDiagnosis(
                $gejala_dengan_cf,
                $diagnosis->penyakit_id
            );
        }

        return inertia('Diagnosis/Show', [
            'diagnosis' => $diagnosis,
            'penyakit' => $penyakit,
            'diagnosis_banding' => $diagnosis_banding,
            'detail_diagnosis' => $detail_diagnosis,
            'interpretasi' => $this->getInterpretasi($diagnosis->cf_final),
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
     * Riwayat diagnosis
     */
    public function index()
    {
        $diagnoses = Diagnosis::with('penyakit')
            ->latest()
            ->paginate(10);

        return inertia('Diagnosis/Index', [
            'diagnoses' => $diagnoses,
        ]);
    }
}
