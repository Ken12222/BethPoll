<?php

use App\Http\Controllers\AllowedVotesController;
use App\Http\Controllers\ContestantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\UserController;
use App\Models\Contestant;
use App\Models\User;
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


//Users data for admin
Route::get('users/index', [UserController::class, "index"])
->middleware(['auth', 'verified'])->name('users.index');
Route::get('users/create', [UserController::class, "create"])
->middleware(['auth', 'verified'])->name('users.create');
Route::post('/users/store', [UserController::class, "store"])
->middleware(['auth', 'verified'])->name('users.store');
Route::get('users/{users}', [UserController::class, "show"])
->middleware(["auth", "verified"])->name("users.show");
Route::delete('users/{users}', [UserController::class, "destroy"])
->middleware(["auth", "verified"])->name("users.destroy");
Route::get('users/{users}/edit', [UserController::class, "edit"])
->middleware(["auth", "verified"])->name("users.edit");
Route::put('users/{users}', [UserController::class, "update"])
->middleware(["auth", "verified"])->name("users.update");

//upload
Route::post('/users/bulk-upload', [UserController::class, 'bulkUpload']);


//Dashboard Route
Route::get('Dashboard', [DashboardController::class, "index"])
->middleware(['auth', 'verified'])->name('dashboard');
//Dashboard Route


//Vote Configuration Route
Route::get('/Configuration/{Configuration}/edit', [AllowedVotesController::class, "edit"])
->middleware(['auth', 'verified'])->name('Configuration.edit');
Route::get('/Configuration/{Configuration}', [AllowedVotesController::class, "show"])
->middleware(['auth', 'verified'])->name('Configuration.show');
Route::POST('/Configuration/{Configuration}', [AllowedVotesController::class, "update"])
->middleware(['auth', 'verified'])->name('Configuration.update');
//Vote Configuration Route

//contestant routes
Route::get('/contestants', [ContestantController::class, "index"]
)->middleware(['auth', 'verified'])->name('contestant.Index');

Route::get('/contestants/create', [ContestantController::class, "create"]
)->middleware(['auth', 'verified'])->name('contestant.create');

Route::post('/contestants', [ContestantController::class, "store"]
)->middleware(['auth', 'verified'])->name('contestant.store');

Route::get('/contestants/{contestant}', [ContestantController::class, "show"]
)->middleware(['auth', 'verified'])->name('contestant.show');

Route::get('/contestants/{contestants}/edit', [ContestantController::class, "edit"]
)->middleware(['auth', 'verified'])->name('contestant.edit');

Route::delete('/contestants/{contestant}', [ContestantController::class, "destroy"]
)->middleware(['auth', 'verified'])->name('contestant.destroy');

//contestant routes

//Vote routes
Route::get('/votes', [ContestantController::class, "index"]
)->middleware(['auth', 'verified'])->name('votes.index');

Route::post("/votes", [VoteController::class, "store"])->middleware(['auth', 'verified'])->name('vote.store');

//Vote routes


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
