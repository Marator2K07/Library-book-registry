<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
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
    Route::get('/genres/{id}', [GenreController::class, 'show'])
        ->name('genres.show');
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
    Route::get('/authors/{id}', [AuthorController::class, 'show'])
        ->name('authors.show');
    Route::post('/authors', [AuthorController::class, 'store'])
        ->name('authors.store');
    Route::post('/authors/{author}', [AuthorController::class, 'update'])
        ->name('authors.update');
    Route::delete('/authors/{author}', [AuthorController::class, 'destroy'])
        ->name('authors.destroy');
});

Route::middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get('/books', [BookController::class, 'index'])
        ->name('books.index');
    Route::get('/books/show/{id}', [BookController::class, 'show'])
        ->name('books.show');
    Route::get('/books/search', [BookController::class, 'search'])
        ->name('books.search');
    Route::post('/books', [BookController::class, 'store'])
        ->name('books.store');
    Route::post('/books/{book}', [BookController::class, 'update'])
        ->name('books.update');
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
