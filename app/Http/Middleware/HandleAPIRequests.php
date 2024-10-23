<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HandleAPIRequests
{
    public function handle(Request $request, Closure $next): Response
    {
        $requestPath = $request->path();

        // если запрос к АПИ идет по путям, не требующих авторизации
        if (
            strpos($requestPath, constant('BOOKS_GET_START_PATH')) !== false
            || strpos($requestPath, constant('AUTHORS_GET_START_PATH')) !== false
            || strpos($requestPath, constant('GENRES_GET_START_PATH')) !== false
        ) {
            return $next($request);
        }
        // все остальные пути требуют авторизации
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
