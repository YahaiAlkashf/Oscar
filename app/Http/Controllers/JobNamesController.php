<?php

namespace App\Http\Controllers;

use App\Models\Job_name;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobNamesController extends Controller
{
    public function index()
    {
        $job_names = Job_name::all();
        return response()->json($job_names);
    }
    public function store(Request $request)
    {
        $vailator = Validator::make($request->all(), [
            'jop_name' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ], );
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        $job_name = Job_name::create($data);
        return response()->json($job_name);
    }
    public function update(Request $request, $id)
    {
     $vailator = Validator::make($request->all(), [
            'jop_name' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ], );
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        $job_name = Job_name::findOrFail($id);
        $job_name->update($data);
        return response()->json($job_name);
    }
    public function destroy(Request $request, $id)
    {
        $job_name = Job_name::findOrFail($id);
        $job_name->delete();
        return response()->json(['message' => 'تم حذف الوظيفة بنجاح'], 200);
    }
}
