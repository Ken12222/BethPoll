<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = ["contestant_id", "vote", "user_id"];

    public function  contestant(){
        return $this->belongsTo(Contestant::class);
    }

    public function voter(){
        return $this->belongsTo(User::class);
    }
}
