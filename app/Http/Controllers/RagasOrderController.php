<?php

namespace App\Http\Controllers;

use App\Models\RagasOrder;
use Illuminate\Http\Request;

class RagasOrderController extends Controller
{
    public function ragasOrder(){
        $orders = RagasOrder::all();
        return response() -> json($orders,200);
    }
}
