import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { HomeModernIcon } from "@heroicons/react/24/outline";

export default function StatisticsSection() {
    const { t, i18n } = useTranslation();
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(true);

    const language = i18n.language || 'ar';

    // Function to get appropriate icon based on number name - MOVED UP
    const getIconForNumber = (name) => {
        const nameLower = name.toLowerCase();

        // Map of icon names to JSX elements
        const icons = {
            property: <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        </div>
                    </div>,
            project: <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                        </div>
                    </div>,
            client: <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        </div>
                    </div>,
            building: <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        </div>
                    </div>,
            default: <div className="w-12 h-12 bg-gray-500/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-gray-500 rounded"></div>
                        </div>
                    </div>
        };

        // Check for keywords in the name
        if (nameLower.includes('عقار') || nameLower.includes('property') ||
            nameLower.includes('وحدة') || nameLower.includes('unit')) {
            return icons.property;
        }
        else if (nameLower.includes('كمبوند') || nameLower.includes('compound') ||
                 nameLower.includes('مجمع') || nameLower.includes('project')) {
            return icons.project;
        }
        else if (nameLower.includes('مبنى') || nameLower.includes('building') ||
                 nameLower.includes('مكتب') || nameLower.includes('office')) {
            return icons.building;
        }
        else if (nameLower.includes('عميل') || nameLower.includes('client') ||
                 nameLower.includes('زبون') || nameLower.includes('customer')) {
            return icons.client;
        }
        else {
            return icons.default;
        }
    };

    useEffect(() => {
        fetchNumbers();
    }, []);

    const fetchNumbers = async () => {
        try {
            const response = await axios.get("/numbers");
            setNumbers(response.data);
        } catch (error) {
            console.error("Error fetching numbers:", error);
        } finally {
            setLoading(false);
        }
    };

    // Dynamically generate stats from numbers data
    const stats = numbers.map((number, index) => ({
        id: number.id || index + 1,
        label: language === 'en' && number.name_en ? number.name_en : number.name,
        value: number.number || "0",
        icon: getIconForNumber(language === 'en' && number.name_en ? number.name_en : number.name),
        description: number.description || ""
    }));

    if (loading) {
        return (
            <section className="py-24 bg-gray-50 dark:bg-[#050505]" dir="rtl">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem]">
                                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
                                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#050505]" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                        {stats.length > 0 ? (
                            stats.map((stat) => (
                                <div
                                    key={stat.id}
                                    className="group relative bg-white dark:bg-[#111] shadow-md hover:shadow-2xl border-none p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="relative z-10 w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#A86B06] transition-colors duration-500">
                                        <div className="text-[#A86B06] group-hover:text-white transition-colors duration-500">
                                            {<HomeModernIcon  className="text-white"/>}
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                                         {stat.value}{'+'}
                                        </h3>
                                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                        {stat.description && (
                                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                                {stat.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#A86B06] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            ))
                        ) : (
                            // Fallback message if no numbers
                            <div className="col-span-4 text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    {t("لا توجد إحصاءات متاحة حالياً")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
