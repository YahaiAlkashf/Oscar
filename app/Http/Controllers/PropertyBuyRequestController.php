<?php

namespace App\Http\Controllers;

use App\Mail\RequestMail;
use App\Models\Property_buy_request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PropertyBuyRequestController extends Controller
{
    public function index()
    {
        $property_buy_request = Property_buy_request::latest()->get();
        return response()->json($property_buy_request);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone_number' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
        ], );
        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $data = $request->all();
        $property_buy_request = Property_buy_request::create($data);
        $message=" تم ارسال طلب شراء  فى موقعك الإلكترونى يمكنك الإطلاع على التفاصيل من هنا  ";
        $url=url('/admin/buy-requests');
        $toEmail = 'yeheimohmed@gmail.com';
        Mail::to($toEmail)->send(new RequestMail($message,$url));
        return response()->json($property_buy_request);
    }
    public function destroy(Request $request, $id)
    {
        $property_buy_request = Property_buy_request::findOrFail($id);
        $property_buy_request->delete();
        return response()->json(['message' => 'تم حذف الطلب بنجاح'], 200);
    }
}
