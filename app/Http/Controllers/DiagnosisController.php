<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use App\Models\Diagnosis;
use App\Models\Penyakit;
use App\Models\Aturan;
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

        // Format diagnosis banding dengan struktur yang jelas
        $diagnosisBanding = array_map(function ($item) {
            return [
                'penyakit_id' => $item['penyakit_id'],
                'nama_penyakit' => $item['nama_penyakit'],
                'cf_score' => $item['cf'],
            ];
        }, array_slice($hasilInferensi, 1, 5));

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
    public function show($id) // Hapus "Diagnosis" di depan $id
    {
        // Cari data secara manual berdasarkan ID yang ada di URL
        // Kita gunakan with('penyakit') untuk mengambil detail penyakitnya sekalian
        $diagnosis = \App\Models\Diagnosis::with('penyakit')->findOrFail($id);

        // Sekarang kita coba dd lagi, pasti muncul datanya
        // dd($diagnosis->toArray()); 

        return inertia('pengguna/diagnosis/show', [
            'diagnosis' => $diagnosis,
            'penyakit' => $diagnosis->penyakit ?? [
                'nama_penyakit' => $diagnosis->nama_penyakit_snap,
                'deskripsi' => 'Informasi detail tidak tersedia.',
                'cara_penanganan' => 'Silahkan hubungi dokter hewan terdekat.'
            ],
            'diagnosis_banding' => $diagnosis->diagnosis_banding ?? [],
            'interpretasi' => $this->getInterpretasi($diagnosis->cf_final ?? 0),
        ]);
    }

    /**
     * Interpretasi nilai CF - return string untuk display
     */
    private function getInterpretasi(float $cf): string
    {
        if ($cf >= 0.8) {
            return 'Gejala yang diamati sangat cocok dengan penyakit ini. Disarankan untuk konsultasi dengan dokter hewan.';
        } elseif ($cf >= 0.6) {
            return 'Gejala menunjukkan kemungkinan penyakit ini. Monitoring kondisi sapi dan segera konsultasi dengan dokter hewan.';
        } elseif ($cf >= 0.4) {
            return 'Ada indikasi penyakit ini tetapi tidak terlalu kuat. Lakukan observasi lebih lanjut.';
        } else {
            return 'Gejala tidak menunjukkan penyakit ini dengan jelas. Cek gejala lainnya.';
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

    /**
     * API: Get dashboard statistics for admin
     */
    public function getDashboardStats()
    {
        $stats = [
            'total_penyakit' => Penyakit::count(),
            'total_gejala' => Gejala::count(),
            'total_aturan' => Aturan::count(),
            'total_diagnosis' => Diagnosis::count(),
        ];

        return response()->json($stats);
    }

    /**
     * API: Get recent diagnoses for admin dashboard
     */
    public function getRecentDiagnoses()
    {
        $diagnoses = Diagnosis::with('penyakit')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($diagnosis) {
                return [
                    'id' => $diagnosis->id,
                    'tanggal' => $diagnosis->created_at->format('Y-m-d'),
                    'user' => $diagnosis->nama_user,
                    'gejala' => count($diagnosis->gejala_input ?? []),
                    'hasil' => $diagnosis->nama_penyakit_snap,
                    'cf' => round($diagnosis->cf_final * 100) . '%',
                ];
            });

        return response()->json([
            'data' => $diagnoses,
        ]);
    }

    /**
     * API: Get all diagnoses for admin history page
     */
    public function getAllDiagnoses()
    {
        $diagnoses = Diagnosis::with('penyakit')
            ->latest()
            ->get()
            ->map(function ($diagnosis) {
                return [
                    'id' => $diagnosis->id,
                    'tanggal' => $diagnosis->created_at->format('Y-m-d'),
                    'user' => $diagnosis->nama_user,
                    'gejala' => count($diagnosis->gejala_input ?? []),
                    'hasil' => $diagnosis->nama_penyakit_snap,
                    'cf' => round($diagnosis->cf_final * 100),
                    'alamat' => $diagnosis->alamat_user,
                    'no_hp' => $diagnosis->no_hp_user,
                    'jenis_sapi' => $diagnosis->jenis_sapi,
                    'jenis_kelamin' => $diagnosis->jenis_kelamin,
                    'umur_kategori' => $diagnosis->umur_kategori,
                    'gejala_input' => $diagnosis->gejala_input ?? [],
                    'diagnosis_banding' => $diagnosis->diagnosis_banding ?? [],
                ];
            });

        return response()->json([
            'data' => $diagnoses,
        ]);
    }
}
