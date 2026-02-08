import React, { useState } from "react";
import {
    XMarkIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function AddContactInfoModal({ title, data, handleSave, closeModal, errors, loading }) {
    const [formData, setFormData] = useState({
        phone_number: data.phone_number || "",
        wathsApp_number: data.wathsApp_number || "",
        email: data.email || ""
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
                    {/* Phone Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300 flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4" />
                            رقم الهاتف
                        </label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="أدخل رقم الهاتف"
                        />
                        {errors.phone_number && (
                            <p className="text-red-500 text-sm">{errors.phone_number[0]}</p>
                        )}
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300 flex items-center gap-2">
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                            رقم الواتساب
                        </label>
                        <input
                            type="text"
                            name="wathsApp_number"
                            value={formData.wathsApp_number}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="أدخل رقم الواتساب"
                        />
                        {errors.wathsApp_number && (
                            <p className="text-red-500 text-sm">{errors.wathsApp_number[0]}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold dark:text-gray-300 flex items-center gap-2">
                            <EnvelopeIcon className="w-4 h-4" />
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#b27000] focus:border-transparent dark:text-white"
                            placeholder="أدخل البريد الإلكتروني"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email[0]}</p>
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
