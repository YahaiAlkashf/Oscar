import React, { useState, useEffect } from "react";
import {
    XMarkIcon,
    PhotoIcon,
    CheckCircleIcon,
    PaperAirplaneIcon,
    ArrowUpTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const ActionModal = ({ onClose, type, handleAccept, errors }) => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form_data, setForm_data] = useState({
        name: "",
        phone_number: "",
        images: [],
    });

    const [extraImagesPreviews, setExtraImagesPreviews] = useState([]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const flag = await handleAccept(form_data);
        setLoading(false);
        if (flag) {
            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
            }, 3000);
        }
    };

    useEffect(() => {
        if (form_data.images && form_data.images.length > 0) {
            const previews = form_data.images.map((img) =>
                URL.createObjectURL(img),
            );
            setExtraImagesPreviews(previews);

            return () => previews.forEach((url) => URL.revokeObjectURL(url));
        } else {
            setExtraImagesPreviews([]);
        }
    }, [form_data.images]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setForm_data({ ...form_data, images: [...form_data.images, ...files] });
    };

    const removeImage = (index) => {
        const updatedImages = form_data.images.filter((_, i) => i !== index);
        setForm_data({ ...form_data, images: updatedImages });
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-300"
            dir="rtl"
        >
            <div className="relative bg-white dark:bg-[#111] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                    onClick={onClose}
                    className="absolute top-6 left-6 text-gray-400 hover:text-[#A86B06] z-10 transition-colors"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>

                <div className="p-8 md:p-12">
                    {!submitted ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-[#A86B06]/10 rounded-3xl flex items-center justify-center mb-4 mx-auto rotate-3">
                                    {type === "sell" ? (
                                        <ArrowUpTrayIcon className="w-10 h-10 text-[#A86B06]" />
                                    ) : (
                                        <PaperAirplaneIcon className="w-10 h-10 text-[#A86B06]" />
                                    )}
                                </div>
                                <h3 className="text-3xl font-black dark:text-white">
                                    {type === "sell"
                                        ? t("بيع عقارك")
                                        : t("طلب شراء عقار")}
                                </h3>
                                <p className="text-gray-500 text-sm mt-2 font-medium">
                                    {t("برجاء ملء البيانات وسنتواصل معك فوراً")}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 mr-2">
                                        {t("الاسم بالكامل")}
                                    </label>
                                    <input
                                        type="text"
                                        value={form_data.name}
                                        onChange={(e) =>
                                            setForm_data({
                                                ...form_data,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A86B06] dark:text-white transition-all"
                                        placeholder={t("أدخل اسمك...")}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 mr-2">
                                        {t("رقم الهاتف")}
                                    </label>
                                    <input
                                        type="tel"
                                        value={form_data.phone_number}
                                        onChange={(e) =>
                                            setForm_data({
                                                ...form_data,
                                                phone_number: e.target.value,
                                            })
                                        }
                                        className="w-full bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A86B06] dark:text-white text-left transition-all font-mono"
                                        placeholder={t("01xxxxxxxxx")}
                                    />
                                    {errors.phone_number && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.phone_number[0]}
                                        </p>
                                    )}
                                </div>

                                {type === "sell" && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 mr-2">
                                            {t("صور العقار")}
                                        </label>

                                        {/* Dropzone */}
                                        <div className="relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-6 transition-all hover:border-[#A86B06]/50 bg-gray-50/50 dark:bg-black/20 group text-center">
                                            <input
                                                type="file"
                                                multiple
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                            />
                                            <PhotoIcon className="w-10 h-10 text-gray-300 mx-auto mb-2 group-hover:text-[#A86B06] transition-colors" />
                                            <p className="text-xs text-gray-400 font-bold">
                                                {t("اضغط لرفع الصور")}
                                            </p>
                                            {errors.images && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.images[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Previews Grid */}
                                        {extraImagesPreviews.length > 0 && (
                                            <div className="grid grid-cols-3 gap-3 mt-4">
                                                {extraImagesPreviews.map(
                                                    (src, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="relative group h-20 rounded-xl overflow-hidden border border-[#A86B06]/30 shadow-sm"
                                                        >
                                                            <img
                                                                src={src}
                                                                className="w-full h-full object-cover"
                                                                alt="Preview"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeImage(
                                                                        idx,
                                                                    )
                                                                }
                                                                className="absolute inset-0 bg-red-600/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <TrashIcon className="w-5 h-5 text-white" />
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    className="w-full bg-[#A86B06] hover:bg-[#8e5a05] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-[#A86B06]/20 transition-all mt-4 active:scale-95"
                                    disabled={loading}
                                >
                                    {loading
                                        ? t("جاري الحفظ...")
                                        : t("إرسال الطلب")}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-10 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <CheckCircleIcon className="w-16 h-16 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white mb-2">
                                {t("تم استلام طلبك!")}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {t(
                                    "سيتم التواصل معك قريباً من قبل فريق المبيعات المختص بـ",
                                )}
                                {type === "sell" ? t("البيع") : t("الشراء")}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
