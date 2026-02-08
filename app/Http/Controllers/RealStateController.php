<?php

namespace App\Http\Controllers;

use App\Models\Image_real_state;
use App\Models\Real_state;
use App\Models\Realstate_feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Nette\Utils\Image;
use Symfony\Polyfill\Intl\Idn\Info;

class RealStateController extends Controller
{
    public function index()
    {
        $real_estate = Real_state::with(['images', 'category', 'location', 'type', 'features'])->get();
        return response()->json($real_estate);
    }

    public function show(Request $request, $id)
    {
        $real_estate = Real_state::with(['images', 'category', 'location', 'type', 'features'])->where('id', $id)->first();
        return response()->json($real_estate);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'image'    => 'يجب أن يكون الملف المرفوع صورة.',
            'mimes'    => 'الصورة يجب أن تكون من نوع: jpeg, png, jpg, gif.',
            'max'      => 'حجم :attribute كبير جداً، الحد الأقصى 10 ميجابايت.',
            'email'    => 'يرجى إدخال بريد إلكتروني صحيح.',
            'array'    => 'حقل :attribute يجب أن يكون على شكل مصفوفة.',
        ];

        $attributes = [
            'name' => 'اسم العقار',
            'name_en' => 'اسم العقار بالإنجليزية',
            'unit_code' => 'كود الوحدة',
            'broker_name' => 'اسم الوكيل',
            'broker_name_en' => 'اسم الوكيل بالإنجليزية',
            'email' => 'البريد الإلكتروني',
            'view' => 'الإطلالة',
            'view_en' => 'الإطلالة بالإنجليزية',
            'finishing_type' => 'نوع التشطيب',
            'finishing_type_en' => 'نوع التشطيب بالإنجليزية',
            'area' => 'المساحة',
            'description' => 'وصف العقار',
            'description_en' => 'وصف العقار بالإنجليزية',
            'rooms' => 'عدد الغرف',
            'bathrooms' => 'عدد الحمامات',
            'price' => 'السعر',
            'rent_or_sale' => 'نوع المعاملة',
            'phone_number' => 'رقم الهاتف',
            'whatsapp_number' => 'رقم الواتساب',
            'category_id' => 'القسم',
            'location_id' => 'الموقع',
            'type_id' => 'نوع العقار',
            'image' => 'الصورة الأساسية',
            'images' => 'الصور الإضافية',
            'features' => 'المميزات',
            'features_en' => 'المميزات بالإنجليزية',
            'immediate_delivery' => 'التسليم الفوري',
        ];

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'rooms' => ['required'],
            'bathrooms' => ['required'],
            'price' => ['required'],
            'area' => ['required'],
            'rent_or_sale' => ['required'],
            'phone_number' => ['required'],
            'whatsapp_number' => ['required'],
            'category_id' => ['required'],
            'location_id' => ['required'],
            'type_id' => ['required'],
            'unit_code'          => ['required'],
            'broker_name'        => ['nullable'],
            'email'              => ['nullable'],
            'view'               => ['nullable'],
            'view_en'            => ['nullable'],
            'finishing_type'     => ['nullable'],
            'finishing_type_en'     => ['nullable'],
            'description'        => ['nullable'],
            'description_en'        => ['nullable'],
            'immediate_delivery' => ['nullable'],
            'features' => ['nullable'],
            'features_en' => ['nullable'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:10240'],
            'images' => ['nullable'],
            'images.*' => ['nullable'],
        ], $messages, $attributes);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $mainImagePath = $request->file('image')->store('real_estate_main', 'public');

        $data = $request->all();

        if (isset($data['features']) && is_string($data['features'])) {
            $data['features'] = json_decode($data['features'], true);
        }

        if (isset($data['features_en']) && is_string($data['features_en'])) {
            $data['features_en'] = json_decode($data['features_en'], true);
        }

        // تأكد أنها array
        $featuresAr = isset($data['features']) && is_array($data['features']) ? $data['features'] : [];
        $featuresEn = isset($data['features_en']) && is_array($data['features_en']) ? $data['features_en'] : [];

        // تنظيف المصفوفات من القيم الفارغة
        $featuresAr = array_filter($featuresAr, function ($value) {
            return !is_null($value) && $value !== '';
        });

        $featuresEn = array_filter($featuresEn, function ($value) {
            return !is_null($value) && $value !== '';
        });

        if ($data['top'] == true) {
            $data['top'] = 1;
        } else {
            $data['top'] = 0;
        }

        if (
            !isset($data['delivery_date']) ||
            $data['delivery_date'] === 'null' ||
            $data['delivery_date'] === ''
        ) {
            $data['delivery_date'] = null;
        }

        $data['image'] = $mainImagePath;

        $real_estate = Real_state::create([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'unit_code' => $request->unit_code,
            'broker_name' => $request->broker_name ?? null,
            'broker_name_en' => $request->broker_name_en ?? null,
            'email' => $request->email ?? null,
            'view' => $request->view ?? null,
            'view_en' => $request->view_en ?? null,
            'finishing_type' => $request->finishing_type ?? null,
            'finishing_type_en' => $request->finishing_type_en ?? null,
            'area' => $request->area,
            'description' => $request->description ?? null,
            'description_en' => $request->description_en ?? null,
            'rooms' => $request->rooms,
            'bathrooms' => $request->bathrooms,
            'price' => $request->price,
            'rent_or_sale' => $request->rent_or_sale,
            'phone_number' => $request->phone_number,
            'whatsapp_number' => $request->whatsapp_number,
            'category_id' => $request->category_id,
            'location_id' => $request->location_id,
            'type_id' => $request->type_id,
            'image' => $mainImagePath,
            'top' => $request->top == true ? 1 : 0,
            'immediate_delivery' => $request->immediate_delivery ?? 0,
            'delivery_date' => $request->delivery_date ?? null,
        ]);

        if (!empty($featuresAr) || !empty($featuresEn)) {
            $count = max(count($featuresAr), count($featuresEn));

            for ($i = 0; $i < $count; $i++) {
                Realstate_feature::create([
                    'real_state_id' => $real_estate->id,
                    'feature' => $featuresAr[$i] ?? '',
                    'feature_en' => $featuresEn[$i] ?? '',
                ]);
            }
        }

        if ($request->hasFile("images")) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('real_estate_images', 'public');
                Image_real_state::create([
                    'image'         => $path,
                    'real_state_id' => $real_estate->id
                ]);
            }
        }

        return response()->json(['message' => 'تم اضافة العقار بنجاح'], 200);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => 'حقل :attribute مطلوب ولا يمكن تركه فارغاً.',
            'image'    => 'يجب أن يكون الملف المرفوع صورة.',
            'mimes'    => 'الصورة يجب أن تكون من نوع: jpeg, png, jpg, gif.',
            'max'      => 'حجم :attribute كبير جداً، الحد الأقصى 10 ميجابايت.',
            'email'    => 'يرجى إدخال بريد إلكتروني صحيح.',
            'array'    => 'حقل :attribute يجب أن يكون على شكل مصفوفة.',
            'numeric'  => 'حقل :attribute يجب أن يكون رقماً.',
            'integer'  => 'حقل :attribute يجب أن يكون عدداً صحيحاً.',
            'in'       => 'القيمة المحددة لـ :attribute غير صالحة.',
        ];

        $attributes = [
            'name' => 'اسم العقار',
            'name_en' => 'اسم العقار بالإنجليزية',
            'unit_code' => 'كود الوحدة',
            'broker_name' => 'اسم الوكيل',
            'broker_name_en' => 'اسم الوكيل بالإنجليزية',
            'email' => 'البريد الإلكتروني',
            'view' => 'الإطلالة',
            'view_en' => 'الإطلالة بالإنجليزية',
            'finishing_type' => 'نوع التشطيب',
            'finishing_type_en' => 'نوع التشطيب بالإنجليزية',
            'area' => 'المساحة',
            'description' => 'وصف العقار',
            'description_en' => 'وصف العقار بالإنجليزية',
            'rooms' => 'عدد الغرف',
            'bathrooms' => 'عدد الحمامات',
            'price' => 'السعر',
            'rent_or_sale' => 'نوع المعاملة',
            'phone_number' => 'رقم الهاتف',
            'whatsapp_number' => 'رقم الواتساب',
            'category_id' => 'القسم',
            'location_id' => 'الموقع',
            'type_id' => 'نوع العقار',
            'image' => 'الصورة الأساسية',
            'images' => 'الصور الإضافية',
            'features' => 'المميزات',
            'features_en' => 'المميزات بالإنجليزية',
            'immediate_delivery' => 'التسليم الفوري',
        ];

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'name_en' => ['required'],
            'unit_code' => ['required', 'string'],
            'broker_name' => ['nullable'],
            'broker_name_en' => ['nullable'],
            'email' => ['nullable'],
            'view' => ['nullable', 'string'],
            'view_en' => ['nullable', 'string'],
            'finishing_type' => ['nullable'],
            'finishing_type_en' => ['nullable'],
            'area' => ['required'],
            'description' => ['nullable'],
            'description_en' => ['nullable'],
            'rooms' => ['required'],
            'bathrooms' => ['required'],
            'price' => ['required'],
            'rent_or_sale' => ['required', 'in:sale,rent'],
            'phone_number' => ['required'],
            'whatsapp_number' => ['required'],
            'category_id' => ['required'],
            'location_id' => ['required'],
            'type_id' => ['required'],
            'project_id' => ['nullable'],
            'Residential_Coastal' => ['nullable', 'in:residential,coastal'],
            'delivery_date' => ['nullable'],
            'top' => ['nullable'],
            'immediate_delivery' => ['nullable'],
            'features' => ['nullable'],
            'image' => ['nullable'],
            'images' => ['nullable'],

        ], $messages, $attributes);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $data = $request->all();


        if (isset($data['features']) && is_string($data['features'])) {
            $data['features'] = json_decode($data['features'], true);
        }

        if (isset($data['features_en']) && is_string($data['features_en'])) {
            $data['features_en'] = json_decode($data['features_en'], true);
        }


        $featuresAr = isset($data['features']) && is_array($data['features']) ? $data['features'] : [];
        $featuresEn = isset($data['features_en']) && is_array($data['features_en']) ? $data['features_en'] : [];

        if ($data['top'] == true) {
            $data['top'] = 1;
        } else {
            $data['top'] = 0;
        }

        if (
            !isset($data['project_id']) ||
            $data['project_id'] === 'null' ||
            $data['project_id'] === ''
        ) {
            $data['project_id'] = null;
        }

        if (
            !isset($data['delivery_date']) ||
            $data['delivery_date'] === 'null' ||
            $data['delivery_date'] === ''
        ) {
            $data['delivery_date'] = null;
        }

        $real_estate = Real_state::findOrFail($id);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($real_estate->image);
            $path = $request->file('image')->store('real_estate_main', 'public');
            $data['image'] = $path;
        }

        $real_estate->update([
            'name' => $data['name'],
            'name_en' => $data['name_en'],
            'unit_code' => $data['unit_code'],
            'broker_name' => $data['broker_name'] ?? null,
            'broker_name_en' => $data['broker_name_en'] ?? null,
            'email' => $data['email'] ?? null,
            'view' => $data['view'] ?? null,
            'view_en' => $data['view_en'] ?? null,
            'finishing_type' => $data['finishing_type'] ?? null,
            'finishing_type_en' => $data['finishing_type_en'] ?? null,
            'area' => $data['area'],
            'description' => $data['description'] ?? null,
            'description_en' => $data['description_en'] ?? null,
            'rooms' => $data['rooms'],
            'bathrooms' => $data['bathrooms'],
            'price' => $data['price'],
            'rent_or_sale' => $data['rent_or_sale'],
            'phone_number' => $data['phone_number'],
            'whatsapp_number' => $data['whatsapp_number'],
            'category_id' => $data['category_id'],
            'location_id' => $data['location_id'],
            'type_id' => $data['type_id'],
            'project_id' => $data['project_id'] ?? null,
            'Residential_Coastal' => $data['Residential_Coastal'] ?? null,
            'delivery_date' => $data['delivery_date'] ?? null,
            'top' => $data['top'] ?? 0,
            'immediate_delivery' => $data['immediate_delivery'] ?? 0,
            'image' => $data['image'] ?? $real_estate->image
        ]);


        if (!empty($featuresAr) || !empty($featuresEn)) {
            Realstate_feature::where('real_state_id', $id)->delete();

            $count = max(count($featuresAr), count($featuresEn));

            for ($i = 0; $i < $count; $i++) {
                Realstate_feature::create([
                    'real_state_id' => $id,
                    'feature' => $featuresAr[$i] ?? '',
                    'feature_en' => $featuresEn[$i] ?? '',
                ]);
            }
        }

        if ($request->hasFile('images')) {
            $old_images = Image_real_state::where('real_state_id', $id)->get();
            foreach ($old_images as $old_image) {
                Storage::disk('public')->delete($old_image->image);
                $old_image->delete();
            }

            foreach ($request->file('images') as $image) {
                $path = $image->store('real_estate_images', 'public');
                Image_real_state::create([
                    'image'         => $path,
                    'real_state_id' => $real_estate->id
                ]);
            }
        }

        return response()->json(['message' => 'تم تحديث البيانات والصور بنجاح'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $real_estate = Real_state::findOrFail($id);
        Storage::disk('public')->delete($real_estate->image);
        $images = Image_real_state::where('real_state_id', $id)->get();
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }
        $real_estate->delete();
        return response()->json(['message' => 'تم حذف العقار بنجاح'], 200);
    }

    public function top()
    {
        $top = Real_state::where('top', 1)->get();
        return response()->json([
            'top' => $top,
            'message' => 'hello'
        ]);
    }
}
