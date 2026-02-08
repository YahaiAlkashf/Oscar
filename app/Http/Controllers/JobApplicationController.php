<?php

namespace App\Http\Controllers;

use App\Mail\RequestMail;
use App\Models\Job_application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    public function index()
    {
        $jop_applications = Job_application::with('job_name')->latest()->get();
        return response()->json($jop_applications);
    }

    public function store(Request $request)
    {
        $vailator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone_number' => ['required'],
            'CV' => ['required', 'file','max:5120'],
            'job_name_id' => ['required'],
        ], [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'max'=>'حجم الملف كبير جداً، الحد الأقصى 5 ميجابايت.',
            'file'=>'يجب ان يكون ملف '
        ], );
        if ($vailator->fails())
            return response()->json($vailator->errors(), 422);
        $data = $request->all();
        if($request->hasFile('CV')){
            $path = $request->file('CV')->store('cv', 'public');
            $data['CV'] = $path;
        }
        $jop_application = Job_application::create($data);
        $message=" تم ارسال طلب وظيفة فى موقعك الإلكترونى يمكنك الإطلاع على التفاصيل من هنا  ";
        $url=url('/admin/job-applications');
        $toEmail = 'yeheimohmed@gmail.com';
        Mail::to($toEmail)->send(new RequestMail($message,$url));
        return response()->json($jop_application, 200);
    }

    public function destroy(Request $request, $id)
    {
        $jop_application = Job_application::findOrFail($id);
        $jop_application->delete();
        return response()->json(['message' => 'تم حذف الوظيفة بنجاح'], 200);
    }

}
