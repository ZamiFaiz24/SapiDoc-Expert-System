<?php

namespace App\Http\Controllers;

use App\Models\Aturan;
use App\Models\Penyakit;
use App\Models\Gejala;
use Illuminate\Http\Request;

class AturanController extends Controller
{
    /**
     * Get all aturan - API endpoint
     */
    public function index()
    {
        $aturans = Aturan::with(['penyakit', 'gejala'])
            ->orderBy('penyakit_id')
            ->get()
            ->map(function ($aturan) {
                return [
                    'id' => $aturan->id,
                    'penyakit_id' => $aturan->penyakit_id,
                    'gejala_id' => $aturan->gejala_id,
                    'penyakit' => $aturan->penyakit->nama_penyakit ?? 'N/A',
                    'gejala' => $aturan->gejala->nama_gejala ?? 'N/A',
                    'nilai_mb' => $aturan->nilai_mb,
                    'nilai_md' => $aturan->nilai_md,
                    'catatan_pakar' => $aturan->catatan_pakar,
                ];
            });

        return response()->json([
            'data' => $aturans,
        ]);
    }

    /**
     * Get dropdown options for penyakit and gejala
     */
    public function getOptions()
    {
        $penyakits = Penyakit::orderBy('nama_penyakit')->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'nama_penyakit' => $p->nama_penyakit,
            ];
        });

        $gejalas = Gejala::orderBy('nama_gejala')->get()->map(function ($g) {
            return [
                'id' => $g->id,
                'nama_gejala' => $g->nama_gejala,
            ];
        });

        return response()->json([
            'penyakits' => $penyakits,
            'gejalas' => $gejalas,
        ]);
    }

    /**
     * Store new aturan
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'penyakit_id' => 'required|integer|exists:penyakits,id',
            'gejala_id' => 'required|integer|exists:gejalas,id',
            'nilai_mb' => 'required|numeric|min:0|max:1',
            'nilai_md' => 'required|numeric|min:0|max:1',
            'catatan_pakar' => 'nullable|string',
        ]);

        // Check if combination already exists
        $exists = Aturan::where('penyakit_id', $validated['penyakit_id'])
            ->where('gejala_id', $validated['gejala_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Kombinasi penyakit dan gejala sudah ada',
            ], 422);
        }

        $aturan = Aturan::create($validated);

        return response()->json([
            'message' => 'Aturan berhasil ditambahkan',
            'data' => $aturan,
        ], 201);
    }

    /**
     * Update aturan
     */
    public function update(Request $request, Aturan $aturan)
    {
        $validated = $request->validate([
            'penyakit_id' => 'required|integer|exists:penyakits,id',
            'gejala_id' => 'required|integer|exists:gejalas,id',
            'nilai_mb' => 'required|numeric|min:0|max:1',
            'nilai_md' => 'required|numeric|min:0|max:1',
            'catatan_pakar' => 'nullable|string',
        ]);

        // Check if combination already exists (excluding current record)
        $exists = Aturan::where('penyakit_id', $validated['penyakit_id'])
            ->where('gejala_id', $validated['gejala_id'])
            ->where('id', '!=', $aturan->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Kombinasi penyakit dan gejala sudah ada',
            ], 422);
        }

        $aturan->update($validated);

        return response()->json([
            'message' => 'Aturan berhasil diperbarui',
            'data' => $aturan,
        ]);
    }

    /**
     * Delete aturan
     */
    public function destroy(Aturan $aturan)
    {
        $aturan->delete();

        return response()->json([
            'message' => 'Aturan berhasil dihapus',
        ]);
    }
}
