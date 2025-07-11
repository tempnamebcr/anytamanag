<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
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

Route::get('/dashboard', [UserController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('users', UserController::class);
    Route::post('users/change-role/{id}', [UserController::class, 'changeRole'])->name('users.changeRole');
    Route::resource('projects', ProjectController::class);
    Route::resource('orders', OrderController::class);
    Route::post('orders/change-status/{id}', [OrderController::class, 'changeStatus'])->name('orders.changeStatus');
    Route::resource('permissions', PermissionController::class);
    Route::post('permissions/updateRole', [PermissionController::class, 'updateRole'])->name('permissions.updateRole');
});

require __DIR__.'/auth.php';
