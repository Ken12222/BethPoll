<?php

namespace App\Http\Controllers;

use App\Models\AllowedVotes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Contestant;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->role === "user"){

        return Inertia::render("Dashboard", [
            "contestants"=>Contestant::with("votes")->get(),
            "votesCount"=>Vote::where("user_id", Auth::user()->id)->count(),
            "vote"=>Vote::where("user_id", Auth::user()->id)->get(),
            "voteAllowed"=>AllowedVotes::pluck("voteAllowed")
        ]);
        }

        return Inertia::render("Dashboard", [
            "contestants"=>Contestant::with("votes")->get(),
            "votesCount"=>Vote::where("user_id", Auth::user()->id)->count(),
            "totalVotes"=>Vote::where("vote", 1)->with("user")->count(),
            "totalMembers"=>User::where("role", "user")->count(),
            "totalMembersVoted"=>User::whereHas('vote', function ($query) {
                $query->where('vote', 1);
            })->count()

            //"votes"=>Vote::where("user_id", Auth::user()->id)->get()
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
