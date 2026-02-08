<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $category = Category::create($data);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $category = Category::findOrFail($id);
        $category->update($data);
        return response()->json($category);
    }

    public function destroy(Request $request, $id)
    {

        $category = Category::with('real_states')->findOrFail($id);
        if($category->real_states->count()>0){
            return response()->json(['error' => 'لا يمكن حذف القسم لانة مرتبط بعقارات اخرى'], 422);
        }
        $category->delete();
        return response()->json(['message' => 'تم حذف القسم بنجاح'], 200);
    }
}
