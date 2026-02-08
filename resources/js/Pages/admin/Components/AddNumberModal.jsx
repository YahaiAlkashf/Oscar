import React, { useState } from "react";
import { XMarkIcon, HashtagIcon } from "@heroicons/react/24/outline";

export default function AddNumberModal({ title, data, handleSave, closeModal, errors, loading }) {
    const [formData, setFormData] = useState({
        name: data.name || "",
        name_en: data.name_en || "",
        number: data.number || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl relative border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold dark:text-white">{title}</h3>
                    <button
                        onClick={closeModal}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors dark:text-white"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Arabic Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300">
                            الاسم (عربي)
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="مثال: رقم الطوارئ"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name[0]}</p>
                        )}
                    </div>

                    {/* English Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300">
                            الاسم (إنجليزي)
                        </label>
                        <input
                            type="text"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="مثال: Emergency Number"
                        />
                        {errors.name_en && (
                            <p className="text-red-500 text-sm">{errors.name_en[0]}</p>
                        )}
                    </div>

                    {/* Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300 flex items-center gap-2">
                            <HashtagIcon className="w-4 h-4" />
                            الرقم
                        </label>
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="أدخل الرقم"
                        />
                        {errors.number && (
                            <p className="text-red-500 text-sm">{errors.number[0]}</p>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-[#b27000] text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? "جاري الحفظ..." : "حفظ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
