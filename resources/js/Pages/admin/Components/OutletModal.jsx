import React, { useState } from "react";
import axios from "axios";

export default function OutletModal({ closeModal, refresh, data, mode }) {
    const [formData, setFormData] = useState({
        name: data?.name || "",
        name_en: data?.name_en || "",
        location_url: data?.location_url || ""
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'edit') {
                await axios.put(`/outlets/${data.id}`, formData);
            } else {
                await axios.post(`/outlets`, formData);
            }
            refresh();
            closeModal();
        } catch (err) {
            if (err.response?.status === 422) setErrors(err.response.data);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 text-right" dir="rtl">
                <h3 className="text-xl font-bold mb-4">{mode === 'edit' ? 'تعديل مكتب' : 'إضافة مكتب جديد'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4 text-right">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">اسم المكتب (عربي)</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Name (English)</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg p-2 dark:bg-gray-700 text-left dark:text-white"
                                value={formData.name_en}
                                onChange={e => setFormData({...formData, name_en: e.target.value})}
                            />
                            {errors.name_en && <p className="text-red-500 text-xs">{errors.name_en[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">رابط الموقع (Google Maps URL)</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 dark:bg-gray-700 text-left"
                            value={formData.location_url}
                            onChange={e => setFormData({...formData, location_url: e.target.value})}
                        />
                        {errors.location_url && <p className="text-red-500 text-xs">{errors.location_url[0]}</p>}
                    </div>
                    <div className="flex justify-start gap-2 pt-4">
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg">حفظ</button>
                        <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
