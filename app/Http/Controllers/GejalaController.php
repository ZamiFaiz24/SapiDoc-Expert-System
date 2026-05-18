<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use Illuminate\Http\Request;

class GejalaController extends Controller
{
    /**
     * Get all gejala - API endpoint with search & filter & pagination
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $kategori = $request->query('kategori', '');
        $page = $request->query('page', 1);
        $perPage = 10;

        $query = Gejala::orderBy('kode_gejala');

        // Search by nama_gejala or kode_gejala
        if ($search) {
            $query->where('nama_gejala', 'like', "%{$search}%")
                ->orWhere('kode_gejala', 'like', "%{$search}%");
        }

        // Filter by kategori
        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $gejalas = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $gejalas->items(),
            'pagination' => [
                'total' => $gejalas->total(),
                'per_page' => $gejalas->perPage(),
                'current_page' => $gejalas->currentPage(),
                'last_page' => $gejalas->lastPage(),
                'from' => $gejalas->firstItem(),
                'to' => $gejalas->lastItem(),
            ],
        ]);
    }

    /**
     * Store new gejala
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_gejala' => 'required|string|unique:gejalas,kode_gejala',
            'nama_gejala' => 'required|string|max:100',
            'kategori' => 'required|string|max:50',
            'keterangan' => 'required|string',
        ]);

        $gejala = Gejala::create($validated);

        return response()->json([
            'message' => 'Gejala berhasil ditambahkan',
            'data' => $gejala,
        ], 201);
    }

    /**
     * Update gejala
     */
    public function update(Request $request, Gejala $gejala)
    {
        $validated = $request->validate([
            'kode_gejala' => 'required|string|unique:gejalas,kode_gejala,' . $gejala->id,
            'nama_gejala' => 'required|string|max:100',
            'kategori' => 'required|string|max:50',
            'keterangan' => 'required|string',
        ]);

        $gejala->update($validated);

        return response()->json([
            'message' => 'Gejala berhasil diperbarui',
            'data' => $gejala,
        ]);
    }

    /**
     * Delete gejala
     */
    public function destroy(Gejala $gejala)
    {
        $gejala->delete();

        return response()->json([
            'message' => 'Gejala berhasil dihapus',
        ]);
    }
}
