<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class HandleAPIRequests
{
    public function handle(Request $request, Closure $next): Response
    {
        // если запрос к АПИ идет по путям, не требующих авторизации
        $requestPath = $request->path();
        if (
            strpos($requestPath, constant('BOOKS_GET_START_PATH')) !== false
            || strpos($requestPath, constant('AUTHORS_GET_START_PATH')) !== false
            || strpos($requestPath, constant('GENRES_GET_START_PATH')) !== false
            || strpos($requestPath, constant('AUTHORS_AUTH_START_PATH')) !== false
        ) {
            return $next($request);
        }
        // (все остальные пути требуют авторизации)
        // пытаемся получить экземпляр токена
        $tokenValue = $request->header('Authorization');
        $token = PersonalAccessToken::findToken(explode(" ", $tokenValue)[1]);
        if (!$tokenValue || !$token) {
            return response()->json(['error' => 'Unauthorized access attempt'], 401);
        }
        // если все успешно - то пишем важные данные аутентификации в заголовки
        // и обновляем последнее использование токена
        $request->headers->set('Auth-User', User::find($token->tokenable_id));
        $token->last_used_at = now();
        $token->save();

        return $next($request);
    }
}
