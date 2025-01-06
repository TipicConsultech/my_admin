<?php

namespace App\Http\Controllers;

use App\Models\SvatolAppoinement;
use Illuminate\Http\Request;

class SvatolAppoinementController extends Controller
{
    public function Index(){
        $enquiry = SvatolAppoinement::all();
        return response() -> json($enquiry,200);
    }
}
