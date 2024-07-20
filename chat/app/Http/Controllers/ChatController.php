<?php

namespace App\Http\Controllers;

use App\Events\Masssage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request)
    {
        event(new Masssage($request->input('username'), $request->input('message')));
        return[];
    }
}
