<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteRequest;
use App\Models\Contestant;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(VoteRequest $request)
    {
        $voteData = $request->validated();
        $voteData["user_id"] = Auth::user()->id;
        $newVote = Vote::create($voteData);
        
        return Inertia::render("Dashboard", [
            "contestants"=>Contestant::all(),
            "votes"=>Vote::all()
        ]);
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
