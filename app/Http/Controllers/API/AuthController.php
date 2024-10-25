<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Запрос на авторизацию
     */
    public function login(Request $request)
    {
        // получаем данные для проверки из строки запроса
        $credentials = $request->only('email', 'password');
        // пытаемся получить токен подключения
        if (Auth::attempt($credentials)) {
            $user = User::findByEmail($request->input('email'));
            $token = $user->createToken('Access token')->plainTextToken;
            return response()->json(['message' => 'Access granted', 'token' => $token]);
        } else {
            return response()->json(['error' => 'Wrong user credentials'], 401);
        }
    }

}
