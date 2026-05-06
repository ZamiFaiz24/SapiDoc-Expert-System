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
     * Proses diagnosis - hitung CF dan cari penyakit
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gejala_ids' => 'required|array|min:1',
            'gejala_ids.*' => 'integer|exists:gejalas,id',
            'nama_user' => 'required|string',
            'alamat_user' => 'required|string',
            'no_hp_user' => 'required|string',
        ]);

        // STEP 1: Jalankan inferensi Forward Chaining
        $hasil_inferensi = $this->inferensiService->inferensi($validated['gejala_ids']);

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
            'diagnosis_banding' => json_encode($diagnosis_banding),
        ]);

        return redirect()->route('diagnosis.show', $diagnosis->id);
    }

    /**
     * Tampilkan hasil diagnosis
     */
    public function show(Diagnosis $diagnosis)
    {
        // Ambil gejala yang diamati dari user
        $gejala_ids = request()->query('gejala_ids', []); // Jika ada query param

        $penyakit = $diagnosis->penyakit;
        $diagnosis_banding = json_decode($diagnosis->diagnosis_banding, true);

        // Jika ada gejala yang dipilih, tampilkan detail
        $detail_diagnosis = null;
        if (!empty($gejala_ids)) {
            $detail_diagnosis = $this->inferensiService->detailDiagnosis(
                is_array($gejala_ids) ? $gejala_ids : [$gejala_ids],
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
