<?php

namespace App\Http\Controllers;

use App\Models\Penyakit;
use Illuminate\Http\Request;

class PenyakitController extends Controller
{
    /**
     * Get all penyakit - API endpoint with search & pagination
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);
        $perPage = 10;

        $query = Penyakit::orderBy('kode_penyakit');

        // Search by nama_penyakit, kode_penyakit, or kategori_penyakit
        if ($search) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('nama_penyakit', 'like', "%{$search}%")
                    ->orWhere('kode_penyakit', 'like', "%{$search}%")
                    ->orWhere('kategori_penyakit', 'like', "%{$search}%");
            });
        }

        $penyakits = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $penyakits->items(),
            'pagination' => [
                'total' => $penyakits->total(),
                'per_page' => $penyakits->perPage(),
                'current_page' => $penyakits->currentPage(),
                'last_page' => $penyakits->lastPage(),
                'from' => $penyakits->firstItem(),
                'to' => $penyakits->lastItem(),
            ],
        ]);
    }

    /**
     * Store new penyakit
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_penyakit' => 'required|string|unique:penyakits,kode_penyakit',
            'kategori_penyakit' => 'nullable|string|max:100',
            'gambar' => 'nullable|string|max:255',
            'nama_penyakit' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'penanganan_awal' => 'nullable|string',
        ]);

        $penyakit = Penyakit::create($validated);

        return response()->json([
            'message' => 'Penyakit berhasil ditambahkan',
            'data' => $penyakit,
        ], 201);
    }

    /**
     * Update penyakit
     */
    public function update(Request $request, Penyakit $penyakit)
    {
        $validated = $request->validate([
            'kode_penyakit' => 'required|string|unique:penyakits,kode_penyakit,' . $penyakit->id,
            'kategori_penyakit' => 'nullable|string|max:100',
            'gambar' => 'nullable|string|max:255',
            'nama_penyakit' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'penanganan_awal' => 'nullable|string',
        ]);

        $penyakit->update($validated);

        return response()->json([
            'message' => 'Penyakit berhasil diperbarui',
            'data' => $penyakit,
        ]);
    }

    /**
     * Delete penyakit
     */
    public function destroy(Penyakit $penyakit)
    {
        $penyakit->delete();

        return response()->json([
            'message' => 'Penyakit berhasil dihapus',
        ]);
    }

    public function forLandingPage()
    {
        $penyakits = Penyakit::with('gejalas')
            ->orderBy('kode_penyakit')
            ->take(10)
            ->get(['id', 'kode_penyakit', 'nama_penyakit', 'deskripsi', 'gambar', 'kategori_penyakit', 'penanganan_awal'])
            ->map(function ($p) {
                $deskripsi = $p->deskripsi ?: 'Deskripsi belum tersedia.';
                $shortDesc = strlen($deskripsi) > 110
                    ? rtrim(substr($deskripsi, 0, 110)) . '...'
                    : $deskripsi;

                return [
                    'id' => $p->kode_penyakit,
                    'name' => $p->nama_penyakit,
                    'kategori_penyakit' => $p->kategori_penyakit ?: null,
                    'shortDesc' => $shortDesc,
                    'fullDesc' => $deskripsi,
                    'image' => $p->gambar ?: '',
                    'penanganan_awal' => $p->penanganan_awal ?: null,
                    'symptoms' => $p->gejalas
                        ->pluck('nama_gejala')
                        ->toArray(),
                ];
            });

        return $penyakits;
    }
}
