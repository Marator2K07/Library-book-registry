<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckForAdminRequests
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->isAdmin()) {
            return redirect('/greetings');
        }

        return $next($request);
    }
}
