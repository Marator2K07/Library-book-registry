<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BooksController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::get(
        constant('BOOKS_GET_START_PATH').'_with',
        [BooksController::class, 'indexWith']
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
        constant('AUTHORS_AUTH_START_PATH').'/login',
        [AuthController::class, 'login']
    );
});
