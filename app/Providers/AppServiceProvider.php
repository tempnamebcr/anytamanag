<?php

namespace App\Providers;

use App\Repositories\Eloquent\OrderRepository;
use App\Repositories\Eloquent\ProjectRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\IOrderRepository;
use App\Repositories\IProjectRepository;
use App\Repositories\IUserRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(IProjectRepository::class, ProjectRepository::class);
        $this->app->bind(IOrderRepository::class, OrderRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
