<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $searchQuery = $request->query("query");
        $query = User::query();
        $searchResult = $query->when($searchQuery, fn($que)=>$que->where("name", "LIKE", "%".$searchQuery."%"));

        return Inertia::render("Users/Index", [
            "users"=>$searchResult->get()
        ]); 
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Users/Create");
    }

    public function bulkUpload(Request $request)
    {
        // Validate file input
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

   
        $file = fopen($request->file('file')->getPathname(), 'r');
        $header = fgetcsv($file);

        $users = [];
        while ($row = fgetcsv($file)) {
            $users[] = array_combine($header, $row);
        }
        fclose($file);

        $validator = Validator::make($users, [
            '*.name' => 'required|string|max:255',
            '*.membership_id' => 'required|unique:users',
            '*.password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return Inertia::render("Users/Index", ['errors' => "failed"]);
        }

        // Insert into the database
        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'membership_id' => $user['membership_id'],
                'password' => Hash::make($user['password']),
            ]);
        }

        return Inertia::render("Users/Index", ['message' => 'Users uploaded successfully'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'membership_id' => 'required|string|lowercase|max:255|unique:'.User::class,
            'password' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'membership_id' => $request->membership_id,
            'password' => Hash::make($request->password),
        ]);

        return redirect(route('users.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where("id", $id)->first();
        return Inertia::render("Users/details", ["member"=>$user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render("Users/edit", ["id"=>$id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        $requestData = $request->validate([
            'name' => 'required|string|max:255',
            'membership_id' => 'sometimes|exclude_if:unique:users,membership_id,true|string|exists:lowercase|max:255'
        ]);
        
        $getUser = User::where("id", $id)->first();

        $updatedData = $getUser->update($requestData);

        if(!$updatedData){
            return Inertia::render("Users/edit", ["error"=>"Failed to update Data. Try again later"]);
        }

        return Inertia::render("Users/edit", ["message"=>"Data updated successfully"]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(User::where("id", $id)->delete()){
            return Inertia::render("Users/Index", ["message"=>"successfully member deleted"]);
        }

        return Inertia::render("Users/Index", ["message"=>"failed to delete member"]);



    }
}
