import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Hero({ loading, filters, setFilters, handleSearch }) {
    const { t, i18n } = useTranslation();
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchLocations();
        fetchTypes();
    }, []);

    const [language, setLanguage] = useState(i18n.language || "ar");

    // Check for saved language preference
    useEffect(() => {
        const savedLang = localStorage.getItem("i18nextLng");
        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang);
            setLanguage(savedLang);
        }
    }, [i18n]);

    // Update language state
    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get("/locations");
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axios.get("/types");
            setTypes(response.data);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
                    className="w-full h-full object-cover"
                    alt={t("عقارات فاخرة")}
                />
                <div className="absolute inset-0 bg-black/60 dark:bg-[#0F0F0F]/80 transition-colors"></div>
            </div>

            <div className="relative z-10 max-w-5xl w-full mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        {t("اعثر على")}{" "}
                        <span className="text-[#A86B06]">
                            {t("منزلك المثالي")}
                        </span>
                    </h1>
                    <p className="text-gray-200 text-lg font-light">
                        {t("نخبة العقارات في أرقى المناطق بانتظارك")}
                    </p>
                </div>

                {/* Search Box Container */}
                <div className="bg-white dark:bg-[#1A1A1A] p-2 md:p-4 rounded-3xl shadow-2xl backdrop-blur-sm transition-all border border-white/10">
                    {/* Main Filter (Sale/Rent) */}
                    <div className="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-[#0F0F0F] w-fit rounded-xl mr-auto ml-0">
                        <button
                            onClick={() =>
                                setFilters({ ...filters, rent_or_sale: "sale" })
                            }
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filters.rent_or_sale === "sale" ? "bg-[#A86B06] text-white shadow-lg" : "text-gray-500 hover:text-[#A86B06]"}`}
                        >
                            {t("للبيع")}
                        </button>
                        <button
                            onClick={() =>
                                setFilters({ ...filters, rent_or_sale: "rent" })
                            }
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filters.rent_or_sale === "rent" ? "bg-[#A86B06] text-white shadow-lg" : "text-gray-500 hover:text-[#A86B06]"}`}
                        >
                            {t("للايجار")}
                        </button>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                    >
                        {/* Region/Location */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 mr-2">
                                {t("المنطقة")}
                            </label>
                            <select
                                className="w-full bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 px-8 focus:ring-1 focus:ring-[#A86B06] dark:text-white"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        location_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">{t("اختر المنطقة")}</option>
                                {locations.map((location) => (
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {language === "en" && location.location_en
                                            ? location.location_en
                                            : location.location}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 mr-2">
                                {t("تصنيف العقار")}
                            </label>
                            <select
                                className="w-full bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 px-8 focus:ring-1 focus:ring-[#A86B06] dark:text-white"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        category_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">{t("كل التصنيفات")}</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {language === "en" && category.category_en
                                            ? category.category_en
                                            : category.category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 mr-2">
                                {t("نوع العقار")}
                            </label>
                            <select
                                className="w-full bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 px-8 focus:ring-1 focus:ring-[#A86B06] dark:text-white"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        type_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">{t("اختر النوع")}</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {language === "en" && type.type_en
                                            ? type.type_en
                                            : type.type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Toggle Advanced Filters */}
                        <div className="flex items-center justify-center md:pb-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsAdvancedOpen(!isAdvancedOpen)
                                }
                                className="flex items-center gap-2 text-xs font-bold text-[#A86B06] hover:underline"
                            >
                                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                                {t("فلاتر متقدمة")}
                            </button>
                        </div>

                        {/* Main Search Button */}
                        <button
                            disabled={loading}
                            className="bg-[#A86B06] hover:bg-[#BF9D21] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                        >
                            {loading ? (
                                t("جاري البحث...")
                            ) : (
                                <>
                                    <MagnifyingGlassIcon className="w-5 h-5" />{" "}
                                    {t("بحث")}
                                </>
                            )}
                        </button>

                        {/* Advanced Section (Expandable) */}
                        {isAdvancedOpen && (
                            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2 animate-fadeIn">
                                {/* Rooms & Baths */}
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder={t("الغرف")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                rooms: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder={t("الحمامات")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                bathrooms: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Price Range */}
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder={t("أقل سعر")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                min_price: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder={t("أعلى سعر")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                max_price: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Area Range */}
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder={t("أقل مساحة")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                min_area: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder={t("أعلى مساحة")}
                                        className="w-1/2 bg-gray-50 dark:bg-[#0F0F0F] border-none rounded-xl text-sm p-3 dark:text-white"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                max_area: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Delivery Checkbox */}
                                <div className="flex items-center gap-3 px-4 h-[44px]">
                                    <input
                                        type="checkbox"
                                        id="immediate"
                                        className="w-5 h-5 rounded border-gray-300 text-[#A86B06] focus:ring-[#A86B06]"
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                immediate_delivery:
                                                    e.target.checked,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="immediate"
                                        className="text-sm font-medium text-gray-500 dark:text-gray-300 cursor-pointer"
                                    >
                                        {t("استلام فوري")}
                                    </label>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
