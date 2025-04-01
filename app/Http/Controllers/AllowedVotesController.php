<?php

namespace App\Http\Controllers;

use App\Models\AllowedVotes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllowedVotesController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render("Configuration/edit");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return Inertia::render("Configuration/edit");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            "voteAllowed"=>"required|integer"
        ]);

        $ifValueIsAlreadySet = AllowedVotes::where("id", $id)->first();
        //dd($updateData["voteAllowed"]);
        if($ifValueIsAlreadySet->voteAllowed == $updateData["voteAllowed"]){
            return Inertia::render("Configuration/edit", ["error"=>"This value is already Set As Default"]);
        }

        $newAllowedVoteValue = AllowedVotes::where("id", $id)->update($updateData);
        return Inertia::render("Configuration/edit", ["message"=>"Total votes allowed updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
