<?php

namespace App\Http\Controllers;

use App\Models\PrabhuramAdmission;
use Illuminate\Http\Request;

class PrabhuramAdmissionController extends Controller
{
    public function index(){
        $admission = PrabhuramAdmission::all();
        return response() -> json($admission,200);
    }
}
