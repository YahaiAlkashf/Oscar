<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        return response()->json($user,200);
    }
    public function store(Request $request)
    {
        $vaildator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
            'password_confirmation' => ['required', 'same:password'],
        ]);
            if ($vaildator->fails())
            return response()->json($vaildator->errors(), 422);
        $user=User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' =>'admin'
        ]);
        return response()->json($user,201);
    }
    public function update(Request $request, $id)
    {
        $vaildator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email'],
        ]);
            if ($vaildator->fails())
            return response()->json($vaildator->errors(), 422);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user,202);
    }
    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'تم حذف المستخدم بنجاح'], 200);
    }
}
