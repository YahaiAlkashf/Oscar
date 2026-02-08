import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ChevronLeftIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function RealEstateAllocation({
    filters,
    setFilters,
    handleSearch
}) {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState(i18n.language || "ar");

    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/categories");
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategorySelect = (id) => {
        const filters = { matchCategory: id };
        sessionStorage.setItem('searchFilters', JSON.stringify(filters));
        router.visit('/realestate');
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            </div>
        </div>
    );

    const handleCategorySearch = (id) => {
        const updated = { ...filters, category_id: id };
        setFilters(updated);
        handleSearch(null, updated);
    };

    return (
        <section className="py-20 bg-[#b0a9a9] dark:bg-[#080808] overflow-hidden rounded-lg m-2" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center items-center flex-col mb-12">
                    <h2 className="text-4xl font-black dark:text-white mb-4 leading-tight text-center">
                        {t("تصفح العقارات حسب")} <span className="text-[#A86B06]">{t("الفئة")}</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg text-center max-w-3xl">
                        {t("سواء كنت تبحث عن سكن مريح أو استثمار تجاري، اختر نوع العقار المناسب لتبدأ رحلتك.")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-8">
                    {categories.map((cat, index) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategorySearch(cat.id)}
                            className="group relative items-center bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#A86B06]/10 hover:-translate-y-2"
                        >
                            <span className="absolute -top-4 -left-4 text-9xl font-black text-gray-50 dark:text-white/[0.02] transition-colors group-hover:text-[#A86B06]/5 pointer-events-none">
                                {index + 1}
                            </span>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="mb-8">
                                    <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#A86B06] transition-colors duration-500">
                                        <Squares2X2Icon className="w-7 h-7 text-[#A86B06] group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black dark:text-white group-hover:text-[#A86B06] transition-colors">
                                        {/* Conditional rendering based on language */}
                                        {language === "en" && cat.category_en ? cat.category_en : cat.category}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-bold text-[#A86B06] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                    <span>{t("استكشف الوحدات")}</span>
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-br from-[#A86B06]/0 to-[#A86B06]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
