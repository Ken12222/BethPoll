<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contestant extends Model
{
    protected $fillable = [ "firstName", "lastName", "position"];

    public function votes(){
        return $this->hasMany(Vote::class);
    }
}
