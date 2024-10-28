<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/greetings', function () {
    return Inertia::render('Greetings');
})->middleware(['auth', 'verified'])->name('greetings');

Route::middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get('/genres', [GenreController::class, 'index'])
        ->name('genres.index');
    Route::post('/genres', [GenreController::class, 'store'])
        ->name('genres.store');
    Route::post('/genres/{genre}', [GenreController::class, 'update'])
        ->name('genres.update');
    Route::delete('/genres/{genre}', [GenreController::class, 'destroy'])
        ->name('genres.destroy');
});

Route::middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get('/authors', [AuthorController::class, 'index'])
        ->name('authors.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__ . '/auth.php';
