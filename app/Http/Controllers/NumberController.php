<?php

namespace App\Http\Controllers;

use App\Models\Number;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NumberController extends Controller
{
    public function index()
    {
        $number = Number::all();
        return response()->json($number);
    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'number' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ],);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);
        $number = Number::create([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'number' => $request->number
        ]);
        return response()->json($number);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'number' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ]);
        if ($validator->fails())
            return response()->json($validator->errors(), 422);
        $number = Number::findOrFail($id);
        $number->update([
            'name' => $request->name,
            'name_en'=> $request->name_en,
            'number' => $request->number
        ]);
        return response()->json($number);
    }
    public function destroy(Request $request, $id)
    {
        $number = Number::findOrFail($id);
        $number->delete();
        return response()->json(['message' => 'تم حذف الرقم بنجاح'], 200);
    }
}
