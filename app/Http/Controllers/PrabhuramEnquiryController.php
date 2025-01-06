<?php

namespace App\Http\Controllers;

use App\Models\PrabhuramEnquiry;
use Illuminate\Http\Request;

class PrabhuramEnquiryController extends Controller
{
    public function index(){
        $reponse = PrabhuramEnquiry::all();
        return response() -> json($reponse,200);
    }
}
