<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AuthorController;
use App\Http\Controllers\API\BooksController;
use App\Http\Controllers\API\GenreController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    // для книг
    Route::get(
        constant('BOOKS_GET_START_PATH').'_with_author_name',
        [BooksController::class, 'indexWithAuthorName']
    );
    Route::get(
        constant('BOOKS_GET_START_PATH').'/{id}',
        [BooksController::class, 'show']
    );
    Route::post(
        constant('BOOKS_UPDATE_START_PATH').'/{id}',
        [BooksController::class, 'update']
    );
    Route::post(
        constant('BOOKS_DELETE_START_PATH').'/{id}',
        [BooksController::class, 'destroy']
    );
    // для авторов
    Route::get(
        constant('AUTHORS_GET_START_PATH'),
        [AuthorController::class, 'index']
    );
    Route::get(
        constant('AUTHORS_GET_START_PATH').'_with_books_count',
        [AuthorController::class, 'indexWithBooksCount']
    );
    Route::get(
        constant('AUTHORS_GET_START_PATH').'/{id}_with_books',
        [AuthorController::class, 'showWithBooks']
    );
    Route::post(
        constant('AUTHORS_UPDATE_START_PATH').'/{id}',
        [AuthorController::class, 'update']
    );
    // для жанров
    Route::get(
        constant('GENRES_GET_START_PATH').'_with_books',
        [GenreController::class, 'indexWithBooks']
    );
    // для авторизации
    Route::post(
        constant('AUTHORS_AUTH_PATH').'/login',
        [AuthController::class, 'login']
    );
});
