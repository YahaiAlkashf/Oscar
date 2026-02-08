import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ProjectDetailsModel({
    selectedProject,
    closeModal,
    app_url,
}) {
    const formatDate = (dateString) => {
        if (!dateString) return "غير محدد";
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getProjectTypeText = (type) => {
        if (type === "residential") return "سكني";
        if (type === "coastal") return "ساحلي";
        return "غير محدد";
    };

    const getPaymentText = (payment) => {
        if (payment === "cash") return "كاش";
        if (payment === "installments") return "تقسيط";
        if (payment === "cash_and_installments") return "كاش وتقسيط";
        return "غير محدد";
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800">

                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                        تفاصيل المشروع: {selectedProject.name || "بدون اسم"}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar text-right" dir="rtl">

                    <div className="mb-6 rounded-xl overflow-hidden border dark:border-gray-700 bg-gray-100">
                        <img
                            src={selectedProject.image ? `${app_url}/storage/${selectedProject.image}` : "/placeholder.png"}
                            className="w-full h-48 object-cover"
                            alt="main"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">تفاصيل المشروع</h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">المطور العقاري:</span>
                                <span className="font-semibold dark:text-white">{selectedProject.developer || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">المطور العقاري بالانجليزية: </span>
                                <span className="font-semibold dark:text-white">{selectedProject.developer_en || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">نوع المشروع:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProject.Residential_Coastal === "coastal" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
                                    {getProjectTypeText(selectedProject.Residential_Coastal)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">طريقة الدفع:</span>
                                <span className="font-semibold dark:text-white">{getPaymentText(selectedProject.Payment)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">تاريخ التسليم:</span>
                                <span className="font-semibold dark:text-white">{formatDate(selectedProject.delivery_date)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">تمييز المشروع:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProject.top == 1 ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}>
                                    {selectedProject.top == 1 ? "مميز" : "عادي"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">التسعير والمساحة</h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">أقل سعر:</span>
                                <span className="font-bold text-green-600">{selectedProject.lowest_price || "0"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">أعلى سعر:</span>
                                <span className="font-bold text-green-600">{selectedProject.highest_price || "0"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">أصغر مساحة:</span>
                                <span className="font-semibold dark:text-white">{selectedProject.smallest_area || "0"} م²</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">أكبر مساحة:</span>
                                <span className="font-semibold dark:text-white">{selectedProject.largest_area || "0"} م²</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">معلومات الاتصال</h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">البريد الإلكتروني:</span>
                                <span className="font-semibold dark:text-white text-sm" dir="ltr">{selectedProject.email || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">رقم الهاتف:</span>
                                <span className="font-semibold dark:text-white" dir="ltr">{selectedProject.phone_number || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">واتساب:</span>
                                <span className="font-semibold text-green-500" dir="ltr">{selectedProject.whatsApp_number || "غير محدد"}</span>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">التصنيف والموقع</h4>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">الفئة:</span>
                                <span className="font-semibold dark:text-white">{selectedProject.category?.category || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">الموقع:</span>
                                <span className="font-semibold dark:text-white">{selectedProject.location?.location || "غير محدد"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">وصف المشروع</h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedProject.description|| "لا يوجد وصف للمشروع."}
                        </p>
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 border-b pb-2 mb-3">  وصف المشروع بالإنجليزية</h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedProject.description_en || "لا يوجد وصف للمشروع."}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <PhotoIcon className="h-5 w-5 text-purple-600" /> معرض صور المشروع
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {selectedProject.images?.map((img, i) => (
                                <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border dark:border-gray-700 hover:ring-2 hover:ring-purple-500 transition-all">
                                    <img
                                        src={`${app_url}/storage/${img.image}`}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                                        alt="gallery"
                                    />
                                </div>
                            ))}
                        </div>
                        {(!selectedProject.images || selectedProject.images.length === 0) && (
                            <p className="text-gray-500 text-center py-4">لا توجد صور إضافية للمشروع.</p>
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
