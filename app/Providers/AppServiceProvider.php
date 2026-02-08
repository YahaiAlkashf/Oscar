<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
               Vite::prefetch(concurrency: 3);
        Inertia::share([
            'app_url' => config('app.url'),
        ]);
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();

                return [
                    'user' => $user,
                    'system_type' => $user ? $user->system_type : null
                ];
            }
        ]);

    // if(env('FORCE_HTTPS', false) || request()->isSecure()) {
    //     URL::forceScheme('https');
    // }
    // if (str_contains(config('app.url'), 'ngrok-free.app')) {
    //     URL::forceScheme('https');
    //     $this->app['request']->server->set('HTTPS', 'on');
    // }

    }
}
