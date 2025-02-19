<?php

use App\Http\Controllers\ContestantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use App\Models\Contestant;
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

Route::get('/dashboard', [DashboardController::class, "index"])
->middleware(['auth', 'verified'])->name('dashboard');


//contestant routes
Route::get('/contestants', [ContestantController::class, "index"]
)->middleware(['auth', 'verified'])->name('contestant.Index');

Route::get('/contestants/create', [ContestantController::class, "create"]
)->middleware(['auth', 'verified'])->name('contestant.create');

Route::post('/contestants', [ContestantController::class, "store"]
)->middleware(['auth', 'verified'])->name('contestant.store');

Route::get('/contestants/{contestant}', [ContestantController::class, "show"]
)->middleware(['auth', 'verified'])->name('contestant.show');

Route::get('/contestants/edit', [ContestantController::class, "edit"]
)->middleware(['auth', 'verified'])->name('contestant.edit');

Route::delete('/contestants/{contestant}', [ContestantController::class, "destroy"]
)->middleware(['auth', 'verified'])->name('contestant.destroy');

//contestant routes

//Vote routes
Route::get('/votes.index', [ContestantController::class, "index"]
)->middleware(['auth', 'verified'])->name('votes.index');
Route::post("/votes", [VoteController::class, "store"])->middleware(['auth', 'verified'])->name('vote.store');

//Vote routes


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
