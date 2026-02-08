import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function SearchByArea({
    filters,
    setFilters,
    handleSearch
}) {
    const { t, i18n } = useTranslation();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // الحصول على اللغة الحالية
    const [language, setLanguage] = useState(i18n.language || "ar");

    // تحديث حالة اللغة عند تغييرها
    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("/locations");
            setLocations(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching locations:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleAreasearch = (id) => {
        const filters = { matchLocation: id };
        sessionStorage.setItem('searchFilters', JSON.stringify(filters));
        router.visit('/realestate');
    };

    if (loading) return null;

    const handleAreaSearch = (id) => {
        const updated = { ...filters, location_id: id };
        setFilters(updated);
        handleSearch(null, updated);
    };

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-[#A86B06]/10 rounded-2xl mb-4">
                        <MapPinIcon className="w-6 h-6 text-[#A86B06]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-3">
                        {t("ابحث في")} <span className="text-[#A86B06]">{t("أرقى المناطق")}</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        {t("اختر المنطقة المفضلة لديك لاستعراض العقارات المتاحة بها واكتشف وحدتك القادمة")}
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-5 max-w-5xl">
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                onClick={() => handleAreaSearch(loc.id)}
                                className="group relative flex items-center gap-4 bg-white dark:bg-[#111] border-none px-7 py-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#A86B06]/20 transition-all duration-300 hover:-translate-y-1.5"
                            >
                                <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl group-hover:bg-[#A86B06] transition-colors duration-300">
                                    <MapPinIcon className="w-5 h-5 text-[#A86B06] group-hover:text-white" />
                                </div>

                                <span className="text-lg font-extrabold text-gray-800 dark:text-gray-200 group-hover:text-[#A86B06] dark:group-hover:text-[#A86B06] transition-colors">
                                    {/* هنا التعديل: اختيار الحقل المناسب بناءً على اللغة */}
                                    {language === "en" && loc.location_en ? loc.location_en : loc.location}
                                </span>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#A86B06] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                            </button>
                        ))}

                        {locations.length === 0 && (
                            <div className="animate-pulse text-gray-400 font-bold italic">
                                {t("جاري تحميل المناطق...")}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => router.visit('/realestate')}
                        className="group inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold text-gray-400 hover:text-[#A86B06] hover:bg-[#A86B06]/5 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                        {t("عرض كافة العقارات في جميع المناطق")}
                    </button>
                </div>
            </div>
        </section>
    );
}
