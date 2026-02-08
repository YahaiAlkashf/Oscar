<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OutletController extends Controller
{
    public function index()
    {
        $outlet = Outlet::all();
        return response()->json($outlet);
    }
    public function store(Request $request)
    {
        $vailator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'location_url' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ],);
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        $outlet = Outlet::create($data);
        return response()->json($outlet);
    }
    public function update(Request $request, $id)
    {
        $vailator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'location_url' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ],);
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        $outlet = Outlet::findOrFail($id);
        $outlet->update($data);
        return response()->json($outlet);
    }
    public function destroy(Request $request, $id)
    {
        $outlet = Outlet::findOrFail($id);
        $outlet->delete();
        return response()->json(['message' => 'تم حذف المكتب بنجاح'], 200);
    }
}
