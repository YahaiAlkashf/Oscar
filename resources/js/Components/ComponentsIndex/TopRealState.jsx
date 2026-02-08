import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PropertyCard from "../ComponentsRealState/PropertyCard";
import { useTranslation } from "react-i18next";

export default function TopRealState() {
    const { t } = useTranslation();
    const { app_url } = usePage().props;
    const [topRealState, setTopRealState] = useState([]);
    const [activeFilter, setActiveFilter] = useState("residential");
    const [loading, setLoading] = useState(true);

    const fetchTopRealState = async () => {
        try {
            const response = await axios.get(`${app_url}/real-estate/top`);
            setTopRealState(response.data.top || []);
        } catch (error) {
            console.error("Error fetching top real estate:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopRealState();
    }, []);

    // ترشيح العقارات حسب النوع المحدد
    const filteredProperties = topRealState.filter(
        (item) => item.Residential_Coastal === activeFilter
    );

    if (loading) {
        return (
            <div className="flex flex-col bg-primary-dark dark:bg-primary justify-center items-center p-10 m-2 rounded-lg min-h-[400px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white text-lg">
                        {t("جاري تحميل العقارات...")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-primary-dark dark:bg-primary justify-center items-center p-10 m-2 rounded-lg">
            <div className="text-center mb-8">
                <h1 className="text-white font-bold text-4xl mb-4">
                    {t("عقاراتنا المميزة")}
                </h1>
                <p className="text-white/80 text-lg max-w-3xl mb-8">
                    {t("اكتشف مجموعة مختارة من أرقى العقارات السكنية والساحلية التي نقدمها لعملائنا")}
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 p-4 mb-8">
                <button
                    onClick={() => setActiveFilter("residential")}
                    className={`px-6 py-3 rounded-xl text-base font-bold transition-all ${activeFilter === "residential" ? "bg-white text-primary-dark shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}
                >
                    {t("عقارات سكنية")}
                </button>
                <button
                    onClick={() => setActiveFilter("coastal")}
                    className={`px-6 py-3 rounded-xl text-base font-bold transition-all ${activeFilter === "coastal" ? "bg-white text-primary-dark shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}
                >
                    {t("عقارات ساحلية")}
                </button>
            </div>

            <div className="w-full">
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {filteredProperties.map((item) => (
                            <PropertyCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-white/70 text-xl mb-2">
                            {activeFilter === "residential"
                                ? t("لا توجد عقارات سكنية مميزة حالياً")
                                : t("لا توجد عقارات ساحلية مميزة حالياً")
                            }
                        </p>
                        <p className="text-white/50">
                            {t("سيتم إضافة عقارات جديدة قريباً")}
                        </p>
                    </div>
                )}
            </div>

            {/* View All Link */}
            {filteredProperties.length > 0 && (
                <div className="mt-12 text-center">
                    <a
                        href="/realestate"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
                    >
                        <span>{t("عرض جميع العقارات")}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
}
