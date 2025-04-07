<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteRequest;
use App\Models\AllowedVotes;
use App\Models\Contestant;
use App\Models\Vote;
use App\Models\User;
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
        return Inertia::render("Dashboard", [
            "contestants"=>Contestant::with("votes")->get(),
            "totalVotes"=>Vote::where("vote", 1)->count(),
            "totalMembers"=>User::where("role", "user")->count(),
            "totalMembersVoted"=>User::whereHas('vote', function ($query) {
                $query->where('vote', 1);
            })->count(),
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
            
            $votesAllowed = AllowedVotes::pluck("voteAllowed");
            
            //user already voted a candidate
            $alreadyVotedFor = Vote::where("contestant_id", $voteData["contestant_id"])
            ->where("user_id", Auth::user()->id)->first();
            
            if($alreadyVotedFor){
                return Inertia::render("Dashboard", [
                    "errors"=>"You have already voted for this candidate",
                    "contestants"=>Contestant::with("votes")->get(),
                    "voteCount"=>Vote::where("user_id", Auth::user()->id)->count(),
                    "voteAllowed"=>$votesAllowed
                ]); 
            }
            //count number of votes by a user
        $userVoteCount = Vote::where("user_id", Auth::user()->id)->count();
        foreach($votesAllowed as $voteAllowed){
            $totalAllowed = $voteAllowed;
        }
        if($userVoteCount === $totalAllowed){
            return Inertia::render("Dashboard", [
                "totalVoteReached"=>"You can only vote .'$totalAllowed'. candidates",
                //"message"=>"Thank You for Voting",
                //"contestants"=>Contestant::with("votes")->get(),
                "voteCount"=>Vote::where("user_id", Auth::user()->id)->count(),
                "voteAllowed"=>$votesAllowed
            ]); 
        }

            $voteComplete = $totalAllowed - 1;
            if(Vote::create($voteData) && $userVoteCount === $voteComplete){

                return Inertia::render("Dashboard", [
                    "totalVoteReached"=>"You can only vote $voteAllowed candidates",
                    //"contestants"=>Contestant::with("votes")->get(),
                    "voteCount"=>Vote::where("user_id", Auth::user()->id)->count(),
                    "voteAllowed"=>$votesAllowed
                ]); 
            }else{
                return Inertia::render("Dashboard", [
                    "contestants"=>Contestant::with("votes")->get(),
                    "voteCount"=>Vote::where("user_id", Auth::user()->id)->count(),
                    "voteAllowed"=>$votesAllowed
                ]); 
            }

            return Inertia::render("Dashboard", [
                "Falied"=>"Failed to Process vote, try again",
                "contestants"=>Contestant::withCount("votes")->get(),
                "voteCount"=>Vote::where("user_id", Auth::user()->id)->count(),
                "voteAllowed"=>$votesAllowed
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
