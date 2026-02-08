import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function RealstateDetailsModel({
    selectedProperty,
    closeModal,
    app_url,
}) {
    const formatDate = (dateString) => {
        if (!dateString) return "غير محدد";
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getPropertyTypeText = (type) => {
        if (type === "residential") return "سكني";
        if (type === "coastal") return "ساحلي";
        return "غير محدد";
    };

    const getSaleTypeText = (type) => {
        if (type === "sale") return "بيع";
        if (type === "rent") return "إيجار";
        return "غير محدد";
    };

    const getDeliveryStatus = (immediate) => {
        if (immediate == 1) return "تسليم فوري";
        return "تسليم في تاريخ محدد";
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                        تفاصيل العقار: {selectedProperty.name || "بدون اسم"}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div
                    className="p-6 overflow-y-auto custom-scrollbar text-right"
                    dir="rtl"
                >
                    <div className="mb-6 rounded-xl overflow-hidden border dark:border-gray-700 bg-gray-100">
                        <img
                            src={
                                selectedProperty.image
                                    ? `${app_url}/storage/${selectedProperty.image}`
                                    : "/placeholder.png"
                            }
                            className="w-full h-48 object-cover"
                            alt="main"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                                المواصفات الفنية
                            </h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    المساحة:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.area || "0"} م²
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    عدد الغرف:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.rooms || "0"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الحمامات:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.bathrooms || "0"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    نوع التشطيب:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.finishing_type ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    نوع التشطيب بالإنجليزية:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.finishing_type_en ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الاطلالة:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.view || "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الاطلالة بالإنجليزية:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.view_en || "غير محدد"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                                التسعير والغرض
                            </h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    السعر:
                                </span>
                                <span className="font-bold text-green-600 text-lg">
                                    {selectedProperty.price || "0"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الغرض:
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProperty.rent_or_sale === "sale" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}
                                >
                                    {getSaleTypeText(
                                        selectedProperty.rent_or_sale,
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    كود الوحدة:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.unit_code || "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    نوع العقار:
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProperty.Residential_Coastal === "coastal" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                                >
                                    {getPropertyTypeText(
                                        selectedProperty.Residential_Coastal,
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    تمييز العقار:
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProperty.top ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}
                                >
                                    {selectedProperty.top ? "مميز" : "عادي"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                                معلومات الاتصال
                            </h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    اسم الوكيل:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.broker_name || "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    اسم الوكيل بالإنجليزية:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.broker_name_en ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    البريد الإلكتروني:
                                </span>
                                <span
                                    className="font-semibold dark:text-white text-sm"
                                    dir="ltr"
                                >
                                    {selectedProperty.email || "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    رقم الهاتف:
                                </span>
                                <span
                                    className="font-semibold dark:text-white"
                                    dir="ltr"
                                >
                                    {selectedProperty.phone_number ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    واتساب:
                                </span>
                                <span
                                    className="font-semibold text-green-500"
                                    dir="ltr"
                                >
                                    {selectedProperty.whatsapp_number ||
                                        "غير محدد"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                                التصنيف والموقع
                            </h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الفئة:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.category?.category ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    الموقع:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.location?.location ||
                                        "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    النوع:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.type?.type || "غير محدد"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    المشروع:
                                </span>
                                <span className="font-semibold dark:text-white">
                                    {selectedProperty.project?.name ||
                                        "غير محدد"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                            تفاصيل التسليم
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    حالة التسليم:
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProperty.immediate_delivery == 1 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                                >
                                    {getDeliveryStatus(
                                        selectedProperty.immediate_delivery,
                                    )}
                                </span>
                            </div>
                            {selectedProperty.immediate_delivery != 1 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">
                                        تاريخ التسليم:
                                    </span>
                                    <span className="font-semibold dark:text-white">
                                        {formatDate(
                                            selectedProperty.delivery_date,
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                            مميزات العقار
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {selectedProperty.features &&
                            selectedProperty.features.length > 0 ? (
                                selectedProperty.features.map((feat, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full border dark:border-gray-600 dark:text-gray-200"
                                    >
                                        {typeof feat === "object"
                                            ? feat.feature
                                            : feat}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    لا توجد مميزات مضافة.
                                </p>
                            )}
                        </div>
                    </div>
                      <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                            مميزات العقار بالإنجليزية
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {selectedProperty.features &&
                            selectedProperty.features.length > 0 ? (
                                selectedProperty.features.map((feat, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full border dark:border-gray-600 dark:text-gray-200"
                                    >
                                        {typeof feat === "object"
                                            ? feat.feature_en
                                            : feat}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    لا توجد مميزات مضافة.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                            وصف العقار
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedProperty.description ||
                                "لا يوجد وصف للعقار."}
                        </p>
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">
                            وصف العقار بالإنجليزية
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedProperty.description_en ||
                                "لا يوجد وصف للعقار."}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <PhotoIcon className="h-5 w-5 text-purple-600" />{" "}
                            معرض صور العقار
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {selectedProperty.images?.map((img, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-square rounded-xl overflow-hidden border dark:border-gray-700 hover:ring-2 hover:ring-purple-500 transition-all"
                                >
                                    <img
                                        src={`${app_url}/storage/${img.image}`}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                                        alt="gallery"
                                    />
                                </div>
                            ))}
                        </div>
                        {(!selectedProperty.images ||
                            selectedProperty.images.length === 0) && (
                            <p className="text-gray-500 text-center py-4">
                                لا توجد صور إضافية للعقار.
                            </p>
                        )}
                    </div>
                </div>

                <div className="p-5 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
                    <button
                        onClick={closeModal}
                        className="w-full py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold"
                    >
                        إغلاق النافذة
                    </button>
                </div>
            </div>
        </div>
    );
}
