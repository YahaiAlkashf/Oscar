<?php

namespace App\Http\Controllers;

use App\Mail\RequestMail;
use App\Models\Contact;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(){
        $contact = Contact::latest()->get();
        return response()->json($contact);
    }
    public function store(Request $request){
        $vailator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email'],
            'phone_number' => ['required'],
            'message' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'email' => 'البريد الإلكتروني غير صالح.',
        ], );
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        $contact = Contact::create($data);
        $message=" تم ارسال طلب تواصل  فى موقعك الإلكترونى يمكنك الإطلاع على التفاصيل من هنا  ";
        $url=url('/admin/contact');
        $toEmail = 'yeheimohmed@gmail.com';
        Mail::to($toEmail)->send(new RequestMail($message,$url));
        return response()->json($contact);
    }
    public function destroy(Request $request, $id){
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'تم حذف الرسالة بنجاح'], 200);
    }

}
