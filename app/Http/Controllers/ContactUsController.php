<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactUsController extends Controller
{
    // Store contact form data
    public function store(Request $request)
    {
        // Validate request input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'mobile' => 'required|string|max:255',
            'queries' => 'required|string|max:255'
        ]);

        // Create new ContactUs record
        $ContactUs = new ContactUs;
        $ContactUs->name = $request->input('name');
        $ContactUs->email = $request->input('email');
        $ContactUs->mobile = $request->input('mobile');
        $ContactUs->queries = $request->input('queries');
        $ContactUs->save();

        return response()->json(['data' => 'SUCCESS'], 200);
    }

    // Show all contact information
    public function index()
    {
        try{
        $companyId = Auth::user()->company_id;
        $contactUs = ContactUs::where('company_id', $companyId)->get();
            return response() -> json($contactUs,200);

        }catch (\Exception $e) {
            // \Log::error('Error fetching sidebar settings: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred.'
            ], 500);
        }
    }

    //Tipic Contact Us
    public function tipicContactUs()
    {
            $contactUs = ContactUs::where('company_id', 1)->get();
            return response() -> json($contactUs,200);
    }    

            //Svatol Contact Us
    public function svatolContactUs()
    {
            $contactUs = ContactUs::where('company_id', 2)->get();
            return response() -> json($contactUs,200);
    }
            //Ragas Contact Us
    public function ragasContactUs(){
        $contactUs = ContactUs::where('company_id',3)->get();
        return response() -> json($contactUs,200);
    }
        //Nilesh Lanke Contact Us
    public function nileshContactUs(){
        $contactUs = ContactUs::where('company_id',4)->get();
        return response() -> json($contactUs,200);
    }

      //Prabhuram Contact us
      public function prabhuramContactUs()
      {
              $contactUs = ContactUs::where('company_id', 5)->get();
              return response() -> json($contactUs,200);
      }
}
