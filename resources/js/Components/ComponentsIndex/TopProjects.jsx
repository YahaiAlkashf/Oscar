import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProjectCard from "../ComponentsProjects/ProjectCard";
import { useTranslation } from "react-i18next";

export default function TopProjects() {
    const { t } = useTranslation();
    const { app_url } = usePage().props;
    const [TopProjects, setTopProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTopProjects = async () => {
        try {
            const response = await axios.get(`${app_url}/projects/top`);
            setTopProjects(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col bg-primary-dark dark:bg-primary justify-center items-center p-10 m-2 rounded-lg min-h-[400px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white text-lg">
                        {t("جاري تحميل المشاريع...")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-primary-dark dark:bg-primary justify-center items-center p-10 m-2 rounded-lg">
            <div className="text-center mb-10">
                <h1 className="text-white font-bold text-4xl mb-4">
                    {t("مشاريعنا المميزة")}
                </h1>
                <p className="text-white/80 text-lg max-w-3xl">
                    {t(
                        "اكتشف أبرز مشاريعنا العقارية التي تجمع بين الفخامة والموقع المتميز والتصميم الحديث",
                    )}
                </p>
            </div>

            <div className="w-full">
                {TopProjects && TopProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {TopProjects.map((item) => (
                            <ProjectCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-white/70 text-xl">
                            {t("لا توجد مشاريع مميزة حالياً")}
                        </p>
                        <p className="text-white/50 mt-2">
                            {t("سيتم إضافة مشاريع جديدة قريباً")}
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-12 text-center">
                <a
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
                >
                    <span>{t("عرض جميع المشاريع")}</span>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
