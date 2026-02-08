import React, { useState, useEffect, useMemo } from "react";
import {
    FunnelIcon,
    HomeIcon,
    HashtagIcon,
    ArrowsPointingOutIcon,
    CurrencyDollarIcon,
    ChevronDownIcon,
    MapPinIcon,
    HomeModernIcon,
} from "@heroicons/react/24/outline";
import PropertyCard from "@/Components/ComponentsRealState/PropertyCard";
import Layout from "./Layout";
import { useTranslation } from 'react-i18next';
import { Head } from '@inertiajs/react';
import axios from "axios";

export default function PropertiesIndex() {
    const { t, i18n } = useTranslation();
    const [localFilters, setLocalFilters] = useState({
        rent_or_sale: "sale",
        location_id: "",
        category_id: "",
        rooms: "",
        bathrooms: "",
        min_price: "",
        max_price: "",
        min_area: "",
        max_area: "",
        immediate_delivery: false,
    });
    const [realStates, setRealStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);

    const language = i18n.language || 'ar';

    const seoData = {
        title: t("عقارات للبيع وللايجار في مصر | أوسكار للتسويق العقاري - أفضل العروض"),
        description: t("اكتشف أرقى العقارات في مصر مع أوسكار للتسويق العقاري. شقق، فلل، مكاتب، محلات للبيع وللايجار في جميع أنحاء القاهرة والجيزة. تصفية متقدمة حسب السعر والموقع والمساحة."),
        keywords: t("عقارات للبيع مصر, عقارات للإيجار القاهرة, شقق للبيع الجيزة, فلل للإيجار مصر, مكاتب تجارية للبيع, محلات للايجار, أوسكار للتسويق العقاري, عقارات مصر 2024"),
        canonical: "https://oscar-realestate.com/realestate",
        ogTitle: t("عقارات مصر | أوسكار للتسويق العقاري - أكبر سوق عقاري"),
        ogDescription: t("تصفح آلاف العقارات المميزة للبيع وللايجار في مصر. تصفية ذكية ونتائج دقيقة مع أوسكار للتسويق العقاري."),
        ogImage: "https://oscar-realestate.com/images/og-properties.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("عقارات للبيع وللايجار | أوسكار للتسويق العقاري"),
        twitterDescription: t("ابحث عن عقار أحلامك مع أوسكار للتسويق العقاري. آلاف العروض المميزة في جميع أنحاء مصر."),
        twitterImage: "https://oscar-realestate.com/images/twitter-properties.jpg",
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": t("بحث العقارات - أوسكار للتسويق العقاري"),
        "description": t("صفحة البحث المتقدم للعقارات في مصر من شركة أوسكار للتسويق العقاري"),
        "url": "https://oscar-realestate.com/realestate",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": t("الرئيسية"),
                    "item": "https://oscar-realestate.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": t("العقارات")
                }
            ]
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": 0,
            "itemListOrder": "https://schema.org/ItemListOrderDescending",
            "itemListElement": []
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://oscar-realestate.com/realestate?search={search_term}"
            },
            "query-input": "required name=search_term"
        }
    };

    const fetchRealState = async () => {
        try {
            const response = await axios.get("/real-estate");
            setRealStates(response.data);
        } catch (error) {
            console.log(error);
        }
    };
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

    useEffect(() => {
        const savedFilters = sessionStorage.getItem("searchFilters");
        fetchRealState();
        fetchLocations();
        fetchCategories();
        fetchTypes();
        if (savedFilters) {
            try {
                const parsed = JSON.parse(savedFilters);
                setLocalFilters((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Error parsing saved filters", e);
            }
        }
    }, []);

    const filteredResults = useMemo(() => {
        return realStates.filter((item) => {
            const matchType = item.rent_or_sale === localFilters.rent_or_sale;
            const matchLocation = localFilters.location_id
                ? item.location_id == localFilters.location_id
                : true;
            const matchCategory = localFilters.category_id
                ? item.category_id == localFilters.category_id
                : true;
            const matchRooms = localFilters.rooms
                ? item.rooms >= localFilters.rooms
                : true;
            const matchBaths = localFilters.bathrooms
                ? item.bathrooms >= localFilters.bathrooms
                : true;
            const minP = localFilters.min_price
                ? Number(item.price) >= Number(localFilters.min_price)
                : true;
            const maxP = localFilters.max_price
                ? Number(item.price) <= Number(localFilters.max_price)
                : true;
            const minA = localFilters.min_area
                ? Number(item.area) >= Number(localFilters.min_area)
                : true;
            const maxA = localFilters.max_area
                ? Number(item.area) <= Number(localFilters.max_area)
                : true;
            const matchDelivery = localFilters.immediate_delivery
                ? item.immediate_delivery == 1
                : true;

            return (
                matchType &&
                matchLocation &&
                matchCategory &&
                matchRooms &&
                matchBaths &&
                minP &&
                maxP &&
                minA &&
                maxA &&
                matchDelivery
            );
        });
    }, [localFilters, realStates]);

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />

                <meta property="og:title" content={seoData.ogTitle} />
                <meta property="og:description" content={seoData.ogDescription} />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={seoData.ogImage} />
                <meta property="og:locale" content="ar_EG" />
                <meta property="og:site_name" content={t("أوسكار للتسويق العقاري")} />

                <meta name="twitter:card" content={seoData.twitterCard} />
                <meta name="twitter:title" content={seoData.twitterTitle} />
                <meta name="twitter:description" content={seoData.twitterDescription} />
                <meta name="twitter:image" content={seoData.twitterImage} />

                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>

                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="author" content={t("أوسكار للتسويق العقاري")} />
                <meta name="language" content="Arabic" />
                <meta name="geo.region" content="EG-CA" />
                <meta name="geo.placename" content="Cairo" />
                <meta name="geo.position" content="30.0444;31.2357" />
                <meta name="ICBM" content="30.0444, 31.2357" />
            </Head>

            <Layout>
                <div
                    className="bg-[#FDFDFD] dark:bg-[#080808] min-h-screen py-12 transition-colors duration-500"
                    dir="rtl"
                >
                    <div
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        dir="rtl"
                    >
                        <div
                            className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-gray-100 dark:border-gray-800 pb-8"
                            dir="rtl"
                        >
                            <div className="text-right">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                                    {t("اكتشف")}{" "}
                                    <span className="text-[#A86B06]">
                                        {t("أرقى العقارات")}
                                    </span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                                    {t("تصفح نتائج البحث المخصصة لك في أوسكار العقارية")}
                                </p>
                            </div>
                            <div className="bg-[#A86B06]/10 text-[#A86B06] px-6 py-2 rounded-full font-bold text-sm">
                                {t("تم العثور على")} {filteredResults.length} {t("وحدة")}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            <aside className="w-full lg:w-1/3">
                                <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-[#1A1A1A] sticky top-28">
                                    <div className="flex items-center justify-between mb-8 flex-row border-b border-gray-50 dark:border-gray-800 pb-4">
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                                            {t("تعديل الفلاتر")}{" "}
                                            <FunnelIcon className="w-5 h-5 text-[#A86B06]" />
                                        </h3>
                                    </div>

                                    <div className="space-y-6" dir="rtl">
                                        <div className="flex bg-gray-100 dark:bg-[#080808] p-1.5 rounded-2xl">
                                            {["sale", "rent"].map((mode) => (
                                                <button
                                                    key={mode}
                                                    onClick={() =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            rent_or_sale: mode,
                                                        })
                                                    }
                                                    className={`flex-1 py-3  text-xs font-black rounded-xl transition-all duration-300 ${localFilters.rent_or_sale === mode ? "bg-[#A86B06] text-white shadow-lg" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
                                                >
                                                    {mode === "sale"
                                                        ? t("للبيع")
                                                        : t("للايجار")}
                                                </button>
                                            ))}
                                        </div>

                                        <FilterGroup
                                            label={t("المنطقة / الموقع")}
                                            icon={
                                                <MapPinIcon className="w-4 h-4" />
                                            }
                                        >
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.location_id}
                                                onChange={(e) =>
                                                    setLocalFilters({
                                                        ...localFilters,
                                                        location_id: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="">{t("كل المناطق")}</option>
                                                {locations.map((location) => (
                                                    <option
                                                        key={location.id}
                                                        value={location.id}
                                                    >
                                                        {language === "en" && location.location_en ? location.location_en : location.location}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup
                                            label={t("نوع الوحدة")}
                                            icon={
                                                <HomeModernIcon className="w-4 h-4" />
                                            }
                                        >
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.type_id}
                                                onChange={(e) =>
                                                    setLocalFilters({
                                                        ...localFilters,
                                                        type_id: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="">{t("كل الأنواع")}</option>
                                                {types.map((type) => (
                                                    <option
                                                        key={type.id}
                                                        value={type.id}
                                                    >
                                                        {language === "en" && type.type_en ? type.type_en : type.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>
                                        <FilterGroup
                                            label={t("تصنيف العقار")}
                                            icon={
                                                <HomeModernIcon className="w-4 h-4" />
                                            }
                                        >
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.category_id}
                                                onChange={(e) =>
                                                    setLocalFilters({
                                                        ...localFilters,
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
                                                        {language === "en" && category.category_en ? category.category_en : category.category}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup
                                            label={t("نطاق السعر (ج.م)")}
                                            icon={
                                                <CurrencyDollarIcon className="w-4 h-4" />
                                            }
                                        >
                                            <div className="flex gap-3">
                                                <input
                                                    type="number"
                                                    placeholder={t("من")}
                                                    className="custom-input"
                                                    value={localFilters.min_price}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            min_price:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder={t("إلى")}
                                                    className="custom-input"
                                                    value={localFilters.max_price}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            max_price:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </FilterGroup>

                                        <FilterGroup
                                            label={t("المساحة (م²)")}
                                            icon={
                                                <ArrowsPointingOutIcon className="w-4 h-4" />
                                            }
                                        >
                                            <div className="flex gap-3">
                                                <input
                                                    type="number"
                                                    placeholder={t("من")}
                                                    className="custom-input"
                                                    value={localFilters.min_area}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            min_area:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder={t("إلى")}
                                                    className="custom-input"
                                                    value={localFilters.max_area}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            max_area:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </FilterGroup>

                                        <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-800 pt-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-gray-400 pr-1 block uppercase tracking-wider">
                                                    {t("الغرف")}
                                                </label>
                                                <input
                                                    type="number"
                                                    className="custom-input"
                                                    value={localFilters.rooms}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            rooms: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold text-gray-400 pr-1 block uppercase tracking-wider">
                                                    {t("الحمامات")}
                                                </label>
                                                <input
                                                    type="number"
                                                    className="custom-input"
                                                    value={localFilters.bathrooms}
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            bathrooms:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <label className="flex items-center justify-between cursor-pointer group bg-gray-50 dark:bg-[#080808] p-4 rounded-2xl border border-transparent hover:border-[#A86B06]/30 transition-all">
                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-bold">
                                                    {t("استلام فوري")}
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        localFilters.immediate_delivery
                                                    }
                                                    onChange={(e) =>
                                                        setLocalFilters({
                                                            ...localFilters,
                                                            immediate_delivery:
                                                                e.target.checked,
                                                        })
                                                    }
                                                    className="w-5 h-5 rounded-md border-gray-300 text-[#A86B06] focus:ring-[#A86B06] bg-white dark:bg-black transition-all"
                                                />
                                            </label>
                                        </div>

                                        <button
                                            onClick={() => {
                                                sessionStorage.removeItem(
                                                    "searchFilters",
                                                );
                                                window.location.reload();
                                            }}
                                            className="w-full text-[10px] text-gray-400 hover:text-[#A86B06] transition-colors pt-2 underline underline-offset-4"
                                        >
                                            {t("إعادة تعيين كافة الفلاتر")}
                                        </button>
                                    </div>
                                </div>
                            </aside>

                            <main className="w-full lg:w-3/4">
                                {filteredResults.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                                        {filteredResults.map((item) => (
                                            <PropertyCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-[#111111] rounded-[3rem] p-24 text-center border border-dashed border-gray-200 dark:border-gray-800 transition-all shadow-inner">
                                        <div className="inline-block p-8 bg-gray-50 dark:bg-[#080808] rounded-full mb-6 text-gray-300 dark:text-gray-700">
                                            <HomeIcon className="w-16 h-16" />
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                                            {t("لم نجد أي تطابق!")}
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                                            {t("جرب تغيير نطاق السعر أو البحث في منطقة أخرى، نحن متأكدون أن منزلك القادم هنا.")}
                                        </p>
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>
                </div>

                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                .custom-input {
                    width: 100%;
                    background-color: #F9FAFB;
                    border: 1.5px solid #F3F4F6;
                    border-radius: 1rem;
                    padding: 0.85rem 1rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    outline: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: right;
                }
                .dark .custom-input {
                    background-color: #080808;
                    border-color: #1F2937;
                    color: white;
                }
                .custom-input:focus {
                    border-color: #A86B06;
                    background-color: white;
                    box-shadow: 0 0 0 4px rgba(168, 107, 6, 0.1);
                }
                .dark .custom-input:focus {
                    background-color: #000;
                    border-color: #A86B06;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `,
                    }}
                />
            </Layout>
        </>
    );
}

const FilterGroup = ({ label, icon, children }) => (
    <div className="space-y-3 ">
        <div className="flex items-center justify-between flex-row ">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {label}
            </label>
            <span className="text-[#A86B06]/50 ">{icon}</span>
        </div>

        {children}
    </div>
);
