<?php

namespace App\Http\Controllers;

use App\Models\Image_Project;
use App\Models\Project;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['images', 'real_states', 'category', 'location'])->get();
        return response()->json($projects);
    }

    public function show()
    {
        $project = Project::with(['images', 'real_states', 'category', 'location'])->first();
        return response()->json($project);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'image'    => 'يجب أن يكون الملف المرفوع صورة.',
            'mimes'    => 'الصورة يجب أن تكون من نوع: jpeg, png, jpg, gif.',
            'max'      => 'حجم :attribute كبير جداً، الحد الأقصى 10 ميجابايت.',
            'email'    => 'يرجى إدخال بريد إلكتروني صحيح.',
            'numeric'  => 'حقل :attribute يجب أن يكون رقماً.',
            'min'      => 'حقل :attribute يجب ألا يقل عن :min.',
        ];

        $attributes = [
            'name'            => 'اسم المشروع',
            'name_en'            => 'اسم المشروع الإنجليزية',
            'highest_price'   => 'أكبر سعر',
            'lowest_price'    => 'أقل سعر',
            'largest_area'    => 'أكبر مساحة',
            'smallest_area'   => 'أقل مساحة',
            'phone_number'    => 'رقم الهاتف',
            'whatsApp_number' => 'رقم الواتساب',
            'email'           => 'البريد الإلكتروني',
            'developer'       => 'المطور',
            'developer_en'       => ' المطور بالإنجليزية',
            'description'     => 'وصف المشروع',
            'description_en'     => ' وصف المشروع بالإنجليزية',
            'image'           => 'الصورة الأساسية',
        ];

        $validator = Validator::make($request->all(), [
            'name'            => ['required', 'string', 'max:255'],
            'name_en'            => ['required', 'string', 'max:255'],
            'highest_price'   => ['required', 'numeric', 'min:0'],
            'lowest_price'    => ['required', 'numeric', 'min:0'],
            'largest_area'    => ['required', 'numeric', 'min:0'],
            'smallest_area'   => ['required', 'numeric', 'min:0'],
            'phone_number'    => ['required', 'string'],
            'whatsApp_number' => ['required', 'string'],
            'email'           => ['nullable'],
            'developer'       => ['required', 'string'],
            'developer_en'       => ['required', 'string'],
            'description'     => ['nullable', 'string'],
            'description_en'     => ['nullable', 'string'],
            'image'           => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:10240'],
            'images'          => ['nullable'],
        ], $messages, $attributes);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);
        $mainImagePath = $request->file('image')->store('project_main', 'public');
        $data = $request->all();
        $nullableFields = [
            'category_id',
            'location_id',
            'delivery_date',
            'Payment'
        ];

        foreach ($nullableFields as $field) {
            if (
                !isset($data[$field]) ||
                $data[$field] === 'null' ||
                $data[$field] === ''
            ) {
                $data[$field] = null;
            }
        }
        if ($data['top'] == true) {
            $data['top'] = 1;
        } else {
            $data['top'] = 0;
        }
        $data['Residential_Coastal'] = $request->input('Residential_Coastal', 'residential');
        $data['Payment'] = $request->input('Payment', 'cash');
        $data['image'] = $mainImagePath;
        $project = Project::create([
            'name' => $data['name'] ?? 'No Name',
            'name_en' => $data['name_en'] ?? 'No Name',
            'highest_price' => $data['highest_price'] ?? 0,
            'lowest_price' => $data['lowest_price'] ?? 0,
            'largest_area' => $data['largest_area'] ?? 0,
            'smallest_area' => $data['smallest_area'] ?? 0,
            'phone_number' => $data['phone_number'] ?? '0000000000',
            'whatsApp_number' => $data['whatsApp_number'] ?? '0000000000',
            'email' => $data['email'] ?? 'example@example.com',
            'developer' => $data['developer'] ?? 'Unknown',
            'developer_en' => $data['developer_en'] ?? 'Unknown',
            'description' => $data['description'] ?? 'No description',
            'description_en' => $data['description_en'] ?? 'No description',
            'top' => $data['top'] ?? 0,
            'Residential_Coastal' => $data['Residential_Coastal'] ?? 'residential',
            'Payment' => $data['Payment'] ?? 'cash',
            'delivery_date' => $data['delivery_date'],
            'location_id' => $data['location_id'],
            'category_id' => $data['category_id'],
            'image' => $data['image'] ?? $mainImagePath
        ]);
        if ($request->hasFile("images")) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('projects_images', 'public');
                Image_Project::create([
                    'image'         => $path,
                    'project_id' => $project->id
                ]);
            }
        }
        return response()->json($project, 200);
    }

    public function top()
    {

        $projects = Project::with(['images', 'real_states', 'category', 'location'])->where('top', 1)->get();
        return response()->json($projects);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'image'    => 'يجب أن يكون الملف المرفوع صورة.',
            'mimes'    => 'الصورة يجب أن تكون من نوع: jpeg, png, jpg, gif.',
            'max'      => 'حجم :attribute كبير جداً، الحد الأقصى 10 ميجابايت.',
            'email'    => 'يرجى إدخال بريد إلكتروني صحيح.',
            'numeric'  => 'حقل :attribute يجب أن يكون رقماً.',
            'min'      => 'حقل :attribute يجب ألا يقل عن :min.',
        ];

        $attributes = [
            'name'            => 'اسم المشروع',
            'name_en'            => 'اسم المشروع الإنجليزية',
            'highest_price'   => 'أكبر سعر',
            'lowest_price'    => 'أقل سعر',
            'largest_area'    => 'أكبر مساحة',
            'smallest_area'   => 'أقل مساحة',
            'phone_number'    => 'رقم الهاتف',
            'whatsApp_number' => 'رقم الواتساب',
            'email'           => 'البريد الإلكتروني',
            'developer'       => 'المطور',
            'developer_en'       => ' المطور بالإنجليزية',
            'description'     => 'وصف المشروع',
            'description_en'     => ' وصف المشروع بالإنجليزية',
            'image'           => 'الصورة الأساسية',
        ];

        $validator = Validator::make($request->all(), [
            'name'            => ['required', 'string', 'max:255'],
            'name_en'            => ['required', 'string', 'max:255'],
            'highest_price'   => ['required', 'numeric', 'min:0'],
            'lowest_price'    => ['required', 'numeric', 'min:0'],
            'largest_area'    => ['required', 'numeric', 'min:0'],
            'smallest_area'   => ['required', 'numeric', 'min:0'],
            'phone_number'    => ['required', 'string'],
            'whatsApp_number' => ['required', 'string'],
            'email'           => ['nullable'],
            'developer'       => ['required'],
            'developer_en'       => ['required'],
            'description'     => ['nullable'],
            'description_en'     => ['nullable'],
            'image'           => ['nullable'],
            'images'          => ['nullable'],
        ], $messages, $attributes);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);
        $data = $request->all();
        $project = Project::findOrFail($id);
        $path = '';
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($project->image);
            $path = $request->file('image')->store('projects_main', 'public');
            $data['image'] = $path;
        }
        $nullableFields = ['category_id', 'location_id', 'delivery_date', 'Payment'];
        foreach ($nullableFields as $field) {
            if (!isset($data[$field]) || $data[$field] === 'null' || $data[$field] === '') {
                $data[$field] = null;
            }
        }
        $project->update([
            'name' => $data['name'] ?? 'No Name',
            'name_en' => $data['name_en'] ?? 'No Name',
            'highest_price' => $data['highest_price'] ?? 0,
            'lowest_price' => $data['lowest_price'] ?? 0,
            'largest_area' => $data['largest_area'] ?? 0,
            'smallest_area' => $data['smallest_area'] ?? 0,
            'phone_number' => $data['phone_number'] ?? '0000000000',
            'whatsApp_number' => $data['whatsApp_number'] ?? '0000000000',
            'email' => $data['email'] ?? 'example@example.com',
            'developer' => $data['developer'] ?? 'Unknown',
            'developer_en' => $data['developer_en'] ?? 'Unknown',
            'description' => $data['description'] ?? 'No description',
            'description_en' => $data['description_en'] ?? 'No description',
            'top' => $data['top'] ?? 0,
            'Residential_Coastal' => $data['Residential_Coastal'] ?? 'residential',
            'Payment' => $data['Payment'] ?? 'cash',
            'delivery_date' => $data['delivery_date'],
            'location_id' => $data['location_id'],
            'category_id' => $data['category_id'],
            'image' => $data['image'] ?? $project->image
        ]);
        if ($request->hasFile('images')) {
            $old_images = Image_Project::where('project_id', $id)->get();
            foreach ($old_images as $old_image) {
                Storage::disk('public')->delete($old_image->image);
                $old_image->delete();
            }
            foreach ($request->file('images') as $image) {
                $path = $image->store('real_estate_images', 'public');
                Image_Project::create([
                    'image'         => $path,
                    'project_id' => $project->id
                ]);
            }
        }

        return response()->json(['message' => 'تم تحديث البيانات والصور بنجاح'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $project = Project::with(['images', 'real_states'])->findOrFail($id);
        if ($project->real_states->count() > 0) {
            return response()->json(['error' => 'لا يمكن حذف المشروع لانة مرتبط بعقارات اخرى'], 422);
        }
        Storage::disk('public')->delete($project->image);
        foreach ($project->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }
        $project->delete();
        return response()->json(['message' => 'تم حذف المشروع بنجاح'], 200);
    }
}
