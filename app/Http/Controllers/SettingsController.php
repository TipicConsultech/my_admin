<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function getSidebarSettings()
{
    try {
        $companyId = Auth::user()->company_id;

        $settings = Setting::join('company_info','settings.company_id','=','company_info.company_id')
            ->where('settings.company_id', $companyId)
            // ->pluck('component','icon','to','name')
            ->where('yes_or_no', 1)
            ->select('settings.component', 'settings.to', 'settings.name','company_info.company_name','company_info.logo')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $settings
        ], 200);
    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => $e
        ], 500);
    }
}

}
