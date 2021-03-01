<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {

                // DDS begin 23.02.2021 {
                if ($request->expectsJson()) {
                    return response()->json(['error' => 'Already authenticated.'], 200);
                }
                // } DDS end 23.02.2021
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
