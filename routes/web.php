<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\PenyakitController;
use App\Http\Controllers\GejalaController;
use App\Http\Controllers\AturanController;
use App\Models\Penyakit;

Route::get('/', function (PenyakitController $penyakitController) {
    return Inertia::render('pengguna/LandingPage', [
        'penyakits' => $penyakitController->forLandingPage(),
    ]);
})->name('home');

// Diagnosis routes
Route::get('/diagnosis', function () {
    return redirect('/diagnosis/create');
})->name('diagnosis.index');

Route::resource('diagnosis', DiagnosisController::class)->only(['create', 'store', 'show']);

// 2. Baru taruh route tambahan di bawahnya
Route::get('/diagnosis', function () {
    return redirect('/diagnosis/create');
})->name('diagnosis.index');

Route::post('/diagnosis/suggest-gejala', [DiagnosisController::class, 'suggestGejala']);

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Admin auth routes (separate names for admin login)
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware('guest')->prefix('admin')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('admin.login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('admin.login.store');
});

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout');

    // Admin dashboard
    Route::get('/', function () {
        return Inertia::render('admin/dashboard/page');
    })->name('admin.dashboard');

    // Admin API endpoints
    Route::get('/api/dashboard/stats', [DiagnosisController::class, 'getDashboardStats']);
    Route::get('/api/dashboard/diagnoses', [DiagnosisController::class, 'getRecentDiagnoses']);
    Route::get('/api/diagnosis/all', [DiagnosisController::class, 'getAllDiagnoses']);

    // Chart data API endpoints
    Route::get('/api/chart/top-penyakit', [DiagnosisController::class, 'getTopPenyakit']);
    Route::get('/api/chart/diagnosis-by-sapi', [DiagnosisController::class, 'getDiagnosisByJenisSapi']);
    Route::get('/api/chart/trend-diagnosis', [DiagnosisController::class, 'getTrendDiagnosis']);

    // Penyakit API endpoints
    Route::get('/api/penyakit', [PenyakitController::class, 'index']);
    Route::post('/api/penyakit', [PenyakitController::class, 'store']);
    Route::put('/api/penyakit/{penyakit}', [PenyakitController::class, 'update']);
    Route::delete('/api/penyakit/{penyakit}', [PenyakitController::class, 'destroy']);

    // Gejala API endpoints
    Route::get('/api/gejala', [GejalaController::class, 'index']);
    Route::post('/api/gejala', [GejalaController::class, 'store']);
    Route::put('/api/gejala/{gejala}', [GejalaController::class, 'update']);
    Route::delete('/api/gejala/{gejala}', [GejalaController::class, 'destroy']);

    // Aturan API endpoints
    Route::get('/api/aturan', [AturanController::class, 'index']);
    Route::get('/api/aturan/options', [AturanController::class, 'getOptions']);
    Route::post('/api/aturan', [AturanController::class, 'store']);
    Route::put('/api/aturan/{aturan}', [AturanController::class, 'update']);
    Route::delete('/api/aturan/{aturan}', [AturanController::class, 'destroy']);
});
