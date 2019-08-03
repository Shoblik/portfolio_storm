<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drinks;

class Landing extends Controller
{
    public function view() {
        return View('landing');
    }
}
