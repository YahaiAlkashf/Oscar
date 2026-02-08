import React, { useState } from "react";
import { BriefcaseIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import JobApplicationModal from "./JobApplicationModal";
import { useTranslation } from "react-i18next";

export default function JoinTeamSection() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-20 bg-gray-50 dark:bg-[#050505] overflow-hidden transition-colors duration-500" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative bg-white dark:bg-[#0a0a0a] rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#A86B06]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex-1 text-center md:text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A86B06]/10 text-[#A86B06] rounded-full text-sm font-bold mb-6">
                            <RocketLaunchIcon className="w-5 h-5" />
                            <span>{t("نحن نوظف الآن!")}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-6 leading-tight">
                            {t("انضم إلي")} <span className="text-[#A86B06]">{t("فريق العمل")}</span>
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl leading-[1.8]">
                            {t("نحن نعمل فقط مع أفضل الشركات في جميع أنحاء العالم لإجراء الاستطلاع، ونبحث دائماً عن المبدعين لإحداث فرق حقيقي.")}
                        </p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative inline-flex items-center gap-4 bg-[#111] dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-[#A86B06] hover:text-white transition-all duration-300"
                        >
                            <BriefcaseIcon className="w-6 h-6" />
                            {t("للتقديم على وظيفة")}
                            <div className="absolute inset-0 rounded-2xl border-2 border-[#A86B06] scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all"></div>
                        </button>
                    </div>

                    <div className="relative flex-1 flex justify-center items-center">
                        <div className="relative w-full max-w-md aspect-square bg-[#A86B06]/10 rounded-[4rem] rotate-3 overflow-hidden">
                            <img
                                src="https://img.freepik.com/free-photo/smiling-businessman-holding-miniature-house_23-2148813233.jpg"
                                alt={t("انضم إلى فريق العمل")}
                                className="w-full h-full object-cover -rotate-3 scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                        </div>

                        <div className="absolute -bottom-6 -left-6 grid grid-cols-5 gap-2 opacity-20">
                            {[...Array(25)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-[#A86B06] rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <JobApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
