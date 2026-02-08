<?php

namespace App\Http\Controllers;

use App\Models\Contact_Information;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactInformationController extends Controller
{
    public function index()
    {
        $contact_information = Contact_Information::all();
        return response()->json($contact_information);
    }
    public function store(Request $request){
        $vaildator = Validator::make($request->all(), [
            'wathsApp_number' => ['required'],
            'email' => ['required'],
            'phone_number' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ], );
        if ($vaildator->fails())
            return response()->json($vaildator->errors(), 422);
        $data = $request->all();
        $contact_information = Contact_Information::create($data);
        return response()->json($contact_information);

    }
    public function update(Request $request, $id){
        $vaildator = Validator::make($request->all(), [
            'wathsApp_number' => ['required'],
            'email' => ['required'],
            'phone_number' => ['required'],
        ],[
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ], );
                if ($vaildator->fails())
            return response()->json($vaildator->errors(), 422);
        $data = $request->all();
        $contact_information = Contact_Information::findOrFail($id);
        $contact_information->update($data);
        return response()->json($contact_information);
    }
    public function  destroy(Request $request, $id){
        $outlet = Contact_Information::findOrFail($id);
        $outlet->delete();
        return response()->json(['message' => 'تم حذف المكتب بنجاح'], 200);
    }
}
