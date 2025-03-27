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
        return Inertia::render("/dashboard", [
            "contestants"=>Contestant::all(),
            "votes"=>Vote::all()
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
    public function store(VoteRequest $request)
    {
        if(Auth::user()->role === "user"){
            $voteData = $request->validated();
            $voteData["user_id"] = Auth::user()->id;
            
            //user already voted a candidate
            $alreadyVotedFor = Vote::where("contestant_id", $voteData["contestant_id"])
            ->where("user_id", Auth::user()->id)->first();
            
            //count number of votes by a user
            $userVoteCount = Vote::where("user_id", Auth::user()->id)->count();
            if($alreadyVotedFor){
                return Inertia::render("Dashboard", [
                    "errors"=>"You have already voted for this candidate",
                    "contestants"=>Contestant::with("votes")->get(),
                    "voteCount"=>Vote::withCount("Vote")->where("user_id", Auth::user()->id)->get()
                ]); 
        }
        if($userVoteCount === 10){
            return Inertia::render("Dashboard", [
                "error"=>"You can only vote 10 candidates",
                "message"=>"Thank You for Voting",
                "contestants"=>Contestant::with("votes")->get(),
                "voteCount"=>Vote::withCount("Vote")->where("user_id", Auth::user()->id)->get()
            ]); 
        }

            $newVote = Vote::create($voteData);
            if($newVote){
                return Inertia::render("Dashboard", [
                    "message"=>"You have successfully voted",
                    "contestants"=>Contestant::with("votes")->get(),
                    "voteCount"=>Vote::withCount("Vote")->where("user_id", Auth::user()->id)->get()
                ]); 
            }
            return Inertia::render("dashboard", [
                "contestants"=>Contestant::withCount("votes")->get(),
                "voteCount"=>Vote::withCount("Vote")->where("user_id", Auth::user()->id)->get()
            ]); 
    }



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
