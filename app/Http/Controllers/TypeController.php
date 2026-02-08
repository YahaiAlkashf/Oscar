<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function index()
    {
        $type = Type::all();
        return response()->json($type);
    }
    public function store(Request $request)
    {
        $data = $request->all();
        $type = Type::create($data);
        return response()->json($type);
    }
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $type = Type::findOrFail($id);
        $type->update($data);
        return response()->json($type);
    }
    public function destroy(Request $request, $id)
    {
        $type = Type::findOrFail($id);
        if($type->real_states->count()>0){
            return response()->json(['error' => 'لا يمكن حذف القسم لانة مرتبط بعقارات اخرى'], 422);
        }
        $type->delete();
        return response()->json(['message' => 'تم حذف القسم بنجاح'], 200);
    }
}
