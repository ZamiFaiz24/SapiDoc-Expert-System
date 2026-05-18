<?php

namespace App\Http\Controllers;

use App\Models\Penyakit;
use Illuminate\Http\Request;

class PenyakitController extends Controller
{
    /**
     * Get all penyakit - API endpoint
     */
    public function index()
    {
        $penyakits = Penyakit::orderBy('kode_penyakit')->get();

        return response()->json([
            'data' => $penyakits,
        ]);
    }

    /**
     * Store new penyakit
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_penyakit' => 'required|string|unique:penyakits,kode_penyakit',
            'nama_penyakit' => 'required|string|max:100',
            'deskripsi' => 'required|string',
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
            'nama_penyakit' => 'required|string|max:100',
            'deskripsi' => 'required|string',
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
}
