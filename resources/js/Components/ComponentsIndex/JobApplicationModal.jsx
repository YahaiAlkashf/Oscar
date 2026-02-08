import React from "react";
import {
    XMarkIcon,
    CloudArrowUpIcon,
    CheckIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function JobApplicationModal({ isOpen, onClose }) {
    const { t, i18n } = useTranslation();
    const { app_url } = usePage().props;
    const [jobOptions, setJobOptions] = useState([]);
    const [applcation, setApplication] = useState({
        name: "",
        phone_number: "",
        job_name_id: "",
        CV: "",
    });
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState(i18n.language || "ar");

    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const fetchJobNames = async () => {
        try {
            const response = await axios.get(`${app_url}/jop-name`);
            setJobOptions(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchJobNames();
    }, []);

    if (!isOpen) return null;

    const handelRequest = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            for (const key in applcation) {
                formData.append(key, applcation[key]);
            }
            const response = await axios.post(
                `${app_url}/job-applications`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            if (response.status === 200) {
                setSuccess(true);
            }
            setIsLoading(false);
            setApplication({
                name: "",
                phone_number: "",
                job_name_id: "",
                CV: "",
            });
        } catch (error) {
            setErrors(error.response?.data || {});
            console.log("Error:", error.response?.data);
            setIsLoading(false);
        }
    };
    const handleClose=()=>{
        onClose();
        setSuccess(false);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40 animate-in fade-in duration-300">
            <div
                className="bg-white dark:bg-[#0f0f0f] w-full max-w-xl rounded-[2.5rem] shadow-2xl relative border border-gray-100 dark:border-white/5 animate-in zoom-in-95 duration-300 h-[600px] overflow-auto"
                dir="rtl"
            >
                <div className="p-8 border-b border-gray-50 dark:border-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-black dark:text-white">
                            {t("نموذج التقديم")}
                        </h3>
                        <p className="text-sm text-gray-400 font-bold mt-1">
                            {t("نسعد بانضمامك إلينا")}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 dark:bg-white/5 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors dark:text-gray-400"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                {success ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-green-100 dark:bg-green-500/10 rounded-full animate-ping duration-1000"></div>
                            <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                                <CheckIcon className="w-12 h-12 text-white stroke-[3]" />
                            </div>
                        </div>

                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                            {t("تم إرسال طلبك")}{" "}
                            <span className="text-green-500">
                                {t("بنجاح!")}
                            </span>
                        </h3>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[300px] leading-relaxed mb-8">
                            {t(
                                "شكراً لاهتمامك بالانضمام إلينا. لقد استلمنا سيرتك الذاتية و",
                            )}{" "}
                            <span className="font-bold text-[#A86B06]">
                                {t("سنتواصل معك قريباً")}
                            </span>{" "}
                            {t("لتحديد موعد المقابلة.")}
                        </p>

                        <button
                            onClick={()=>{handleClose()}}
                            className="px-10 py-4 bg-gray-900 dark:bg-white dark:text-black text-white rounded-2xl font-bold hover:bg-[#A86B06] dark:hover:bg-[#A86B06] dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                        >
                            {t("إغلاق النافذة")}
                        </button>

                        <div className="mt-8 flex gap-2">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-green-500/20 rounded-full"
                                ></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <form
                        className="p-8 space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold dark:text-gray-300 mr-2">
                                    {t("الاسم بالكامل")}
                                </label>
                                <input
                                    type="text"
                                    value={applcation.name}
                                    onChange={(e) =>
                                        setApplication({
                                            ...applcation,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder={t("مثال: محمد أحمد")}
                                    className="w-full bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-[#A86B06] rounded-2xl p-3 transition-all dark:text-gray-100"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold dark:text-gray-300 mr-2">
                                    {t("رقم الهاتف")}
                                </label>
                                <input
                                    type="tel"
                                    placeholder={t("012xxxxxxxx")}
                                    value={applcation.phone_number}
                                    onChange={(e) =>
                                        setApplication({
                                            ...applcation,
                                            phone_number: e.target.value,
                                        })
                                    }
                                    className="w-full bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-[#A86B06] rounded-2xl p-3 transition-all dark:text-gray-100"
                                />
                                {errors.phone_number && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone_number[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold dark:text-gray-300 mr-2">
                                {t("الوظيفة المطلوبة")}
                            </label>
                            <select
                                className="w-full bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-[#A86B06] rounded-2xl p-3 px-8 transition-all dark:text-gray-400"
                                value={applcation.job_name_id}
                                onChange={(e) =>
                                    setApplication({
                                        ...applcation,
                                        job_name_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">{t("اختر وظيفة...")}</option>
                                {jobOptions.map((job, i) => (
                                    <option key={i} value={job.id}>
                                        {language === "en" && job.jop_name_en
                                            ? job.jop_name_en
                                            : job.jop_name}
                                    </option>
                                ))}
                            </select>
                            {errors.job_name_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.job_name_id[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold dark:text-gray-300 mr-2">
                                {t("السيرة الذاتية (CV)")}
                            </label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all duration-300 group
                                        ${
                                            applcation.CV
                                                ? "border-green-500 bg-green-50/30 dark:bg-green-500/5"
                                                : "border-gray-200 dark:border-white/10 hover:border-[#A86B06]"
                                        }`}
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setApplication({
                                                ...applcation,
                                                CV: e.target.files[0],
                                            });
                                        }
                                    }}
                                />

                                {!applcation.CV ? (
                                    <div className="animate-in fade-in duration-300">
                                        <CloudArrowUpIcon className="w-10 h-10 text-gray-300 group-hover:text-[#A86B06] mx-auto mb-2 transition-colors" />
                                        <p className="text-sm text-gray-400 font-bold">
                                            {t(
                                                "اسحب ملفك هنا أو اضغط لرفع الملف",
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-300 mt-1">
                                            {t("PDF, DOC (حد أقصى 5 ميجا)")}
                                        </p>
                                        {errors.CV && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.CV[0]}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                                        <div className="bg-green-500 rounded-full p-2 mb-2 shadow-lg shadow-green-500/20">
                                            <CheckIcon className="w-6 h-6 text-white stroke-[3]" />
                                        </div>
                                        <p className="text-sm font-black text-green-600 dark:text-green-400">
                                            {t("تم اختيار الملف بنجاح")}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-[250px]">
                                            {applcation.CV.name}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setApplication({
                                                    ...applcation,
                                                    CV: "",
                                                });
                                            }}
                                            className="mt-2 text-xs text-red-500 font-bold hover:underline relative z-20"
                                        >
                                            {t("حذف الملف")}
                                        </button>
                                        {errors.CV && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.CV[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="w-full bg-[#A86B06] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#A86B06]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            onClick={handelRequest}
                        >
                            {isLoading ? (
                                <div className="flex gap-2">
                                    <span>{t("جاري الإرسال...")}</span>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <>
                                    <span>{t("إرسال الطلب الآن")}</span>
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
