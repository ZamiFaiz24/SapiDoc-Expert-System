<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use Illuminate\Http\Request;

class GejalaController extends Controller
{
    /**
     * Get all gejala - API endpoint
     */
    public function index()
    {
        $gejalas = Gejala::orderBy('kode_gejala')->get();

        return response()->json([
            'data' => $gejalas,
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
