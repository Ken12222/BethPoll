<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContestantRequest;
use App\Models\Contestant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;


class ContestantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contestants = Contestant::withCount("votes")->latest()->get();

        return Inertia::render("Contestant/Index", [
            "contestants"=>$contestants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contestant/create');
    }

    /**
     * Store a newly created resource in storage
     */
    public function store(ContestantRequest $request)
    {
        $contestantData = $request->validated();

        $checkifContestantExists = Contestant::where("firstName", $contestantData["firstName"])
        ->where("lastName", $contestantData["lastName"])->first();

        if($checkifContestantExists){
            return Inertia::render('/createContestant', ['error'=>'Candidate already exists.']);
        }

        if($request->hasFile("image")){
            $file = $request->file("image");

            $fileExtension = $file->getClientOriginalExtension();
            $extensionToLower = strtolower($fileExtension);
            $fileName = time().".".$extensionToLower;
            $path = $file->storeAs('upload', $fileName, 'public');
            Storage::disk('public')->put("upload", $fileName);

            $imageUrl = asset('storage/upload/'.$fileName); 

            $contestantData["image"] = $imageUrl;
        }

        $newContestant = Contestant::create($contestantData);

        return Inertia::render('Contestant/Index',['success', 'Post created successfully.',
        "contestants"=>Contestant::withCount("votes")->get(),
    ]);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $contestant = Contestant::withCount("votes")->findOrfail($id);
        return Inertia::render("Contestant/show", [
            "contestant"=>$contestant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Contestant/edit', ["id"=>$id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        $updateData = $request->validate(
            [
                "firstName"=>"required|string|max:255",
                "lastName"=>"required|string|max:255",
                "image"=>"sometimes|mimes:png,jpg,jpeg|max:2048",
            ]
        );

        //dd($updateData);

        if(!$updateData){
            return Inertia::render("Contestant/edit", ["error"=>"Failed to update Data. Try again later"]);
        }

        if($request->hasFile("image")){
            $file = $request->file("image");

            $fileExtension = $file->getClientOriginalExtension();
            $extensionToLower = strtolower($fileExtension);
            $fileName = time().".".$extensionToLower;
            $path = $file->storeAs('upload', $fileName, 'public');
            Storage::disk('public')->put("upload", $fileName);

            $imageUrl = asset('storage/upload/'.$fileName); 

            $updateData["image"] = $imageUrl;
        }

        $updatedContestant = Contestant::findOrFail($id);
        $updatedContestant->update($updateData);
        return Inertia::render('Contestant/Index',['message', 'Candidate updated successfully.',
        "contestants"=>Contestant::withCount("votes")->get()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contestant = Contestant::findorFail($id);

        if($contestant){
            $contestant->delete();
            $contestants = Contestant::latest()->get();
            return Inertia::render("Contestant/Index", ["message"=>"Contestant Delete Successfully",
        "contestants"=>$contestants,]);
        }
        else{
            return Inertia::render("Contestant/show", [
            
            "message"=>"failed to delete contestant"]);
        }
    }
}
