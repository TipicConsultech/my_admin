<?php

namespace App\Http\Controllers;

use App\Models\nileshDonation;
use Illuminate\Http\Request;

class nileshDonationController extends Controller
{
    public function nileshDonation(){
        $donation = nileshDonation::all();
        return response() -> json($donation,200);
    }
}
