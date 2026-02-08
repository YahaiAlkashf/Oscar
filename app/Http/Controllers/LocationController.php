<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $location = Location::all();
        return response()->json($location);
    }
    public function store(Request $request)
    {
        $data = $request->all();
        $location = Location::create($data);
        return response()->json($location);
    }
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $location = Location::findOrFail($id);
        $location->update($data);
        return response()->json($location);
    }
    public function destroy(Request $request, $id)
    {
        $location = Location::with('real_states')->findOrFail($id);
        if($location->real_states->count()>0){
            return response()->json(['error' => 'لا يمكن حذف القسم لانة مرتبط بعقارات اخرى'], 422);
        }
        $location->delete();
        return response()->json(['message' => 'تم حذف القسم بنجاح'], 200);
    }
}
