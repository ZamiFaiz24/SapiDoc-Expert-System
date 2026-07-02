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
    public function show($id)
    {
        // Cari data secara manual berdasarkan ID yang ada di URL
        // Kita gunakan with('penyakit') untuk mengambil detail penyakitnya sekalian
        $diagnosis = \App\Models\Diagnosis::with('penyakit')->findOrFail($id);

        // Sekarang kita coba dd lagi, pasti muncul datanya
        // dd($diagnosis->toArray()); 
        // dd($diagnosis->gejala_input);

        $gejalaDipilih = collect($diagnosis->gejala_input)
            ->map(function ($item) {

                $gejala = \App\Models\Gejala::find($item['gejala_id']);

                return [
                    'id' => $item['gejala_id'],
                    'kode_gejala' => $gejala?->kode_gejala,
                    'nama_gejala' => $gejala?->nama_gejala,
                    'cf_user' => $item['cf_user'],
                ];
            })
            ->values();

        return inertia('pengguna/diagnosis/show', [
            'diagnosis' => $diagnosis,
            'penyakit' => $diagnosis->penyakit ?? [
                'nama_penyakit' => $diagnosis->nama_penyakit_snap,
                'deskripsi' => 'Informasi detail tidak tersedia.',
                'kategori_penyakit' => null,
                'gambar' => null,
                'penanganan_awal' => 'Silahkan hubungi dokter hewan terdekat.'
            ],
            'gejala_dipilih' => $gejalaDipilih,
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

            'jenis_kelamin' => 'required|string',
            'umur_kategori' => 'required|string',
        ]);

        $suggestedGejala = $this->inferensiService->suggestGejala(
            $validated['gejala'],
            $validated['jenis_kelamin'],
            $validated['umur_kategori']
        );

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
     * API: Get all diagnoses for admin history page with search & filter & pagination
     */
    public function getAllDiagnoses(Request $request)
    {
        $search = $request->query('search', '');
        $jenisSapi = $request->query('jenis_sapi', '');
        $hasilPenyakit = $request->query('hasil_penyakit', '');
        $periode = $request->query('periode', '');
        $dateFrom = $request->query('date_from', '');
        $dateTo = $request->query('date_to', '');
        $page = $request->query('page', 1);
        $perPage = 10;

        $query = Diagnosis::with('penyakit')->latest();

        // Search by nama_user, alamat_user, atau no_hp_user
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_user', 'like', "%{$search}%")
                    ->orWhere('alamat_user', 'like', "%{$search}%")
                    ->orWhere('no_hp_user', 'like', "%{$search}%");
            });
        }

        // Filter by jenis_sapi
        if ($jenisSapi) {
            $query->where('jenis_sapi', $jenisSapi);
        }

        // Filter by hasil penyakit
        if ($hasilPenyakit) {
            $query->where('nama_penyakit_snap', $hasilPenyakit);
        }

        // Filter by periode (harian/mingguan/bulanan)
        if ($periode) {
            $now = now();
            switch ($periode) {
                case 'harian':
                    $query->whereDate('created_at', $now->toDateString());
                    break;
                case 'mingguan':
                    $query->whereBetween('created_at', [$now->copy()->subDays(7)->startOfDay(), $now->copy()->endOfDay()]);
                    break;
                case 'bulanan':
                    $query->whereBetween('created_at', [$now->copy()->subDays(30)->startOfDay(), $now->copy()->endOfDay()]);
                    break;
            }
        }

        // Filter by date range (manual, independen dari periode)
        if ($dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }
        if ($dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        }

        $diagnoses = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = array_map(function ($diagnosis) {
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
        }, $diagnoses->items());

        return response()->json([
            'data' => $formattedData,
            'pagination' => [
                'total' => $diagnoses->total(),
                'per_page' => $diagnoses->perPage(),
                'current_page' => $diagnoses->currentPage(),
                'last_page' => $diagnoses->lastPage(),
                'from' => $diagnoses->firstItem(),
                'to' => $diagnoses->lastItem(),
            ],
        ]);
    }

    /**
     * Get top 5 diseases for donut chart
     */
    public function getTopPenyakit()
    {
        $topPenyakit = Diagnosis::select('nama_penyakit_snap')
            ->whereNotNull('nama_penyakit_snap')
            ->groupBy('nama_penyakit_snap')
            ->selectRaw('nama_penyakit_snap, COUNT(*) as count')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(5)
            ->get();

        $data = $topPenyakit->map(fn($item) => [
            'name' => $item->nama_penyakit_snap ?? 'Unknown',
            'value' => $item->count,
        ])->toArray();

        return response()->json([
            'data' => $data,
            'total' => array_sum(array_column($data, 'value')),
        ]);
    }

    /**
     * Get diagnosis count by jenis sapi for bar chart
     */
    public function getDiagnosisByJenisSapi()
    {
        $byJenisSapi = Diagnosis::select('jenis_sapi')
            ->whereNotNull('jenis_sapi')
            ->groupBy('jenis_sapi')
            ->selectRaw('jenis_sapi, COUNT(*) as count')
            ->orderByRaw('COUNT(*) DESC')
            ->get();

        $data = $byJenisSapi->map(fn($item) => [
            'name' => $item->jenis_sapi ?? 'Unknown',
            'value' => $item->count,
        ])->toArray();

        return response()->json([
            'data' => $data,
            'total' => array_sum(array_column($data, 'value')),
        ]);
    }

    /**
     * Get trend diagnosis data (last 30 days) for line chart
     */
    public function getTrendDiagnosis()
    {
        $startDate = now()->subDays(30)->startOfDay();
        $endDate = now()->endOfDay();

        $trendData = Diagnosis::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get();

        // Create full date range (fill gaps with 0)
        $dateRange = collect();
        for ($i = 0; $i < 30; $i++) {
            $dateRange->push(now()->subDays(29 - $i)->format('Y-m-d'));
        }

        $data = $dateRange->map(function ($date) use ($trendData) {
            $record = $trendData->firstWhere('date', $date);
            return [
                'date' => $date,
                'count' => $record->count ?? 0,
            ];
        })->toArray();

        return response()->json([
            'data' => $data,
        ]);
    }
}
