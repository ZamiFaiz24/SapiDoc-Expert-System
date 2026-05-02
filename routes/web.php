<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pengguna/LandingPage');
})->name('home');

Route::get('/diagnosis', function () {
    return Inertia::render('pengguna/diagnosis/page');
})->name('pengguna.diagnosis');

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
});
