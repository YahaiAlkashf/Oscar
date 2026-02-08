<?php

namespace App\Http\Controllers;

use App\Mail\RequestMail;
use App\Models\Image_real_state;
use App\Models\Image_Sell_Request;
use App\Models\Property_sale_request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PropertySaleRequestController extends Controller
{

    public function index(){
        $property_sale_request = Property_sale_request::with('images')->latest()->get();
        return response()->json($property_sale_request);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone_number' => ['required'],
            'images' => ['nullable'],
            'images.*' => ['max:10240'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'max' => 'حجم الصورة كبير جداً، الحد الأقصى 2 ميجابايت.',
        ], );
        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $property_sale_request = Property_sale_request::create([
            'name'=>$request->name,
            'phone_number' => $request->phone_number,
        ]);
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                if ($image->isValid()) {
                $path = $image->store('property_sale_images', 'public');
                Image_Sell_Request::create([
                    'image' => $path,
                    'property_sale_request_id' => $property_sale_request->id
                ]);
            }
            }
        }
        $message=" تم ارسال طلب بيع  فى موقعك الإلكترونى يمكنك الإطلاع على التفاصيل من هنا  ";
        $url=url('/admin/sell-requests');
        $toEmail = 'yeheimohmed@gmail.com';
        Mail::to($toEmail)->send(new RequestMail($message,$url));
        return response()->json($property_sale_request);
    }

    public function destroy(Request $request, $id){
        $property_sale_request = Property_sale_request::findOrFail($id);
        $images = Image_Sell_Request::where('property_sale_request_id', $id)->get();
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }
        $property_sale_request->delete();
        return response()->json(['message' => 'تم حذف الطلب بنجاح'], 200);
    }

}
