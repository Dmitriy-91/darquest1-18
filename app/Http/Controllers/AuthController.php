<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Auth;

class AuthController extends Controller
{
    public function user(){
        return new UserResource(Auth::user());
    }
}
