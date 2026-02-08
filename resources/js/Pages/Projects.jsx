import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    FunnelIcon,
    BriefcaseIcon,
    ArrowsPointingOutIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    BuildingOffice2Icon,
    SparklesIcon,
    HomeModernIcon,
    TagIcon,
    BuildingOfficeIcon
} from "@heroicons/react/24/outline";
import Layout from "./Layout";
import ProjectCard from "@/Components/ComponentsProjects/ProjectCard";
import { useTranslation } from 'react-i18next';
import { Head } from '@inertiajs/react';

export default function ProjectsIndex() {
    const { t, i18n } = useTranslation();
    const [localFilters, setLocalFilters] = useState({
        developer: "",
        min_price: "",
        max_price: "",
        min_area: "",
        max_area: "",
        category_id: "",
        location_id: "",
        top: false,
        Residential_Coastal: "",
        Payment: ""
    });

    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [developers, setDevelopers] = useState([]);

    const language = i18n.language || 'ar';

    const seoData = {
        title: t("مشاريع عقارية للبيع في مصر | أوسكار للتسويق العقاري - أفضل المشاريع الجديدة"),
        description: t("اكتشف أحدث المشاريع العقارية في مصر مع أوسكار للتسويق العقاري. مشاريع سكنية وتجارية وساحلية من أفضل المطورين العقاريين. تصفح واسع وتصفية حسب الموقع والميزانية."),
        keywords: t("مشاريع عقارية مصر, مشاريع جديدة للبيع, عقارات التطوير العقاري, مشاريع سكنية القاهرة, مشاريع تجارية الجيزة, أوسكار للتسويق العقاري, عقارات المطورين, مشاريع تحت الإنشاء"),
        canonical: "https://oscar-realestate.com/projects",
        ogTitle: t("أضخم المشاريع العقارية في مصر - أوسكار للتسويق العقاري"),
        ogDescription: t("استكشف أفضل المشاريع العقارية الجديدة في مصر. سكني، تجاري، ساحلي من كبار المطورين العقاريين مع ضمان الجودة والاستثمار الآمن."),
        ogImage: "https://oscar-realestate.com/images/og-projects.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("مشاريع عقارية استثمارية في مصر | أوسكار للتسويق العقاري"),
        twitterDescription: t("اكتشف فرص استثمارية حقيقية في أحدث المشاريع العقارية المصرية. عروض خاصة وتسهيلات في السداد."),
        twitterImage: "https://oscar-realestate.com/images/twitter-projects.jpg",
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": t("المشاريع العقارية - أوسكار للتسويق العقاري"),
        "description": t("صفحة عرض المشاريع العقارية الجديدة في مصر من شركة أوسكار للتسويق العقاري"),
        "url": "https://oscar-realestate.com/projects",
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
                    "name": t("المشاريع العقارية")
                }
            ]
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": 0,
            "itemListOrder": "https://schema.org/ItemListOrderAscending",
            "itemListElement": []
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get("/projects");
            setProjects(response.data);

            const uniqueDevelopers = [...new Set(response.data
                .map(item => item.developer)
                .filter(dev => dev && dev.trim() !== "")
            )];
            setDevelopers(uniqueDevelopers);
        } catch (error) {
            console.error("Error fetching projects:", error);
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

    useEffect(() => {
        fetchProjects();
        fetchLocations();
        fetchCategories();

        const savedFilters = sessionStorage.getItem("projectFilters");
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
        return projects.filter((item) => {
            const matchDeveloper = localFilters.developer
                ? item.developer?.toLowerCase() === localFilters.developer.toLowerCase()
                : true;

            const matchCategory = localFilters.category_id
                ? Number(item.category_id) === Number(localFilters.category_id)
                : true;

            const matchLocation = localFilters.location_id
                ? Number(item.location_id) === Number(localFilters.location_id)
                : true;

            const matchType = localFilters.Residential_Coastal
                ? item.Residential_Coastal === localFilters.Residential_Coastal
                : true;

            const matchPayment = localFilters.Payment
                ? item.Payment === localFilters.Payment
                : true;

            const minP = localFilters.min_price
                ? Number(item.lowest_price) >= Number(localFilters.min_price)
                : true;
            const maxP = localFilters.max_price
                ? Number(item.highest_price) <= Number(localFilters.max_price)
                : true;

            const minA = localFilters.min_area
                ? Number(item.smallest_area) >= Number(localFilters.min_area)
                : true;
            const maxA = localFilters.max_area
                ? Number(item.largest_area) <= Number(localFilters.max_area)
                : true;

            const matchTop = localFilters.top ? item.top == 1 : true;

            return matchDeveloper && matchCategory && matchLocation &&
                   matchType && matchPayment && minP && maxP && minA && maxA && matchTop;
        });
    }, [localFilters, projects]);

    const clearFilters = () => {
        setLocalFilters({
            developer: "",
            min_price: "",
            max_price: "",
            min_area: "",
            max_area: "",
            category_id: "",
            location_id: "",
            top: false,
            Residential_Coastal: "",
            Payment: ""
        });
        sessionStorage.removeItem("projectFilters");
    };

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
                <div className="bg-[#FDFDFD] dark:bg-[#080808] min-h-screen py-12 transition-colors duration-500" dir="rtl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
                            <div className="text-right">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                                    {t("استكشف")}{" "}
                                    <span className="text-[#A86B06]">{t("أضخم المشاريع")}</span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                                    {t("اكتشف الوجهات الاستثمارية والسكنية الجديدة مع أوسكار العقارية")}
                                </p>
                            </div>
                            <div className="bg-[#A86B06]/10 text-[#A86B06] px-6 py-2 rounded-full font-bold text-sm">
                                {t("تم العثور على")} {filteredResults.length} {t("مشروع")}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            <aside className="w-full lg:w-1/3">
                                <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-[#1A1A1A] sticky top-28">
                                    <div className="flex items-center justify-between mb-8 border-b border-gray-50 dark:border-gray-800 pb-4">
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                                            {t("تصفية المشاريع")}{" "}
                                            <FunnelIcon className="w-5 h-5 text-[#A86B06]" />
                                        </h3>
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs text-gray-400 hover:text-[#A86B06] transition-colors underline underline-offset-4"
                                        >
                                            {t("إعادة التعيين")}
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <FilterGroup label={t("المطور العقاري")} icon={<BriefcaseIcon className="w-4 h-4" />}>
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.developer}
                                                onChange={(e) => setLocalFilters({...localFilters, developer: e.target.value})}
                                            >
                                                <option value="">{t("جميع المطورين")}</option>
                                                {developers.map((dev, index) => (
                                                    <option key={index} value={dev}>
                                                        {dev}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup label={t("الفئة")} icon={<TagIcon className="w-4 h-4" />}>
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.category_id}
                                                onChange={(e) => setLocalFilters({...localFilters, category_id: e.target.value})}
                                            >
                                                <option value="">{t("كل التصنيفات")}</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {language === "en" && category.category_en ? category.category_en : category.category}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup label={t("الموقع")} icon={<MapPinIcon className="w-4 h-4" />}>
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.location_id}
                                                onChange={(e) => setLocalFilters({...localFilters, location_id: e.target.value})}
                                            >
                                                <option value="">{t("كل المناطق")}</option>
                                                {locations.map((location) => (
                                                    <option key={location.id} value={location.id}>
                                                        {language === "en" && location.location_en ? location.location_en : location.location}
                                                    </option>
                                                ))}
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup label={t("نوع المشروع")} icon={<BuildingOfficeIcon className="w-4 h-4" />}>
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.Residential_Coastal}
                                                onChange={(e) => setLocalFilters({...localFilters, Residential_Coastal: e.target.value})}
                                            >
                                                <option value="">{t("كل الأنواع")}</option>
                                                <option value="residential">{t("سكني")}</option>
                                                <option value="coastal">{t("ساحلي")}</option>
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup label={t("طريقة الدفع")} icon={<CurrencyDollarIcon className="w-4 h-4" />}>
                                            <select
                                                className="custom-input appearance-none !px-8"
                                                value={localFilters.Payment}
                                                onChange={(e) => setLocalFilters({...localFilters, Payment: e.target.value})}
                                            >
                                                <option value="">{t("كل الطرق")}</option>
                                                <option value="cash">{t("كاش")}</option>
                                                <option value="installments">{t("تقسيط")}</option>
                                                <option value="cash_and_installments">{t("كاش وتقسيط")}</option>
                                            </select>
                                        </FilterGroup>

                                        <FilterGroup label={t("ميزانية المشروع (ج.م)")} icon={<CurrencyDollarIcon className="w-4 h-4" />}>
                                            <div className="flex gap-3">
                                                <input
                                                    type="number"
                                                    placeholder={t("السعر الأدنى")}
                                                    className="custom-input"
                                                    value={localFilters.min_price}
                                                    onChange={(e) => setLocalFilters({...localFilters, min_price: e.target.value})}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder={t("السعر الأقصى")}
                                                    className="custom-input"
                                                    value={localFilters.max_price}
                                                    onChange={(e) => setLocalFilters({...localFilters, max_price: e.target.value})}
                                                />
                                            </div>
                                        </FilterGroup>

                                        <FilterGroup label={t("المساحات المتوفرة (م²)")} icon={<ArrowsPointingOutIcon className="w-4 h-4" />}>
                                            <div className="flex gap-3">
                                                <input
                                                    type="number"
                                                    placeholder={t("أصغر مساحة")}
                                                    className="custom-input"
                                                    value={localFilters.min_area}
                                                    onChange={(e) => setLocalFilters({...localFilters, min_area: e.target.value})}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder={t("أكبر مساحة")}
                                                    className="custom-input"
                                                    value={localFilters.max_area}
                                                    onChange={(e) => setLocalFilters({...localFilters, max_area: e.target.value})}
                                                />
                                            </div>
                                        </FilterGroup>

                                        <div className="pt-4">
                                            <label className="flex items-center justify-between cursor-pointer group bg-gray-50 dark:bg-[#080808] p-4 rounded-2xl border border-transparent hover:border-[#A86B06]/30 transition-all">
                                                <div className="flex items-center gap-2">
                                                    <SparklesIcon className="w-5 h-5 text-[#A86B06]" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-bold">
                                                        {t("مشاريع مميزة فقط")}
                                                    </span>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={localFilters.top}
                                                    onChange={(e) => setLocalFilters({...localFilters, top: e.target.checked})}
                                                    className="w-5 h-5 rounded-md border-gray-300 text-[#A86B06] focus:ring-[#A86B06] bg-white dark:bg-black transition-all"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <main className="w-full lg:w-3/4">
                                {filteredResults.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                                        {filteredResults.map((project) => (
                                            <ProjectCard item={project} key={project.id} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-[#111111] rounded-[3rem] p-24 text-center border border-dashed border-gray-200 dark:border-gray-800 shadow-inner">
                                        <div className="inline-block p-8 bg-gray-50 dark:bg-[#080808] rounded-full mb-6 text-gray-300 dark:text-gray-700">
                                            <BuildingOffice2Icon className="w-16 h-16" />
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                                            {t("لا توجد مشاريع تطابق بحثك")}
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                                            {t("حاول تعديل خيارات البحث أو المطور العقاري للوصول لنتائج أفضل.")}
                                        </p>
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
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
                        .dark .custom-input { background-color: #080808; border-color: #1F2937; color: white; }
                        .custom-input:focus { border-color: #A86B06; background-color: white; box-shadow: 0 0 0 4px rgba(168, 107, 6, 0.1); }
                        .dark .custom-input:focus { background-color: #000; border-color: #A86B06; }
                        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
                        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                    `,
                }} />
            </Layout>
        </>
    );
}

const FilterGroup = ({ label, icon, children }) => (
    <div className="space-y-3">
        <div className="flex items-center justify-between flex-row">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {label}
            </label>
            <span className="text-[#A86B06]/50">{icon}</span>
        </div>
        {children}
    </div>
);
