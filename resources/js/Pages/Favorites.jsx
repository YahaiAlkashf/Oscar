import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Layout from "./Layout";
import PropertyCard from "@/Components/ComponentsRealState/PropertyCard";
import {
    HeartIcon,
    TrashIcon,
    ShareIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';

export default function Favorites() {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    // بيانات SEO
    const seoData = {
        title: t("العقارات المفضلة - قائمة عقاراتي المحفوظة | أوسكار العقارية"),
        description: t("عرض وإدارة العقارات المفضلة لديك. قم بمقارنة وتصفية وتنظيم العقارات المحفوظة لاتخاذ القرار المناسب."),
        keywords: t("عقارات مفضلة, عقارات محفوظة, قائمة عقاراتي, مقارنة عقارات, عقارات مصر المفضلة, عقارات للبيع مفضلة, عقارات للإيجار مفضلة"),
        canonical: "https://oscar-realestate.com/favorites",
        ogTitle: t("قائمة عقاراتي المفضلة - أوسكار العقارية"),
        ogDescription: t("ادخل إلى قائمة عقاراتك المفضلة، قم بمقارنتها وتصفيتها لاتخاذ أفضل قرار شراء أو إيجار."),
        ogImage: "https://oscar-realestate.com/images/og-favorites.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("عرض عقاراتي المفضلة - أوسكار العقارية"),
        twitterDescription: t("قائمة العقارات المحفوظة والمفضلة لديك. قارن واختر العقار المناسب."),
        twitterImage: "https://oscar-realestate.com/images/twitter-favorites.jpg",
    };

    // Schema.org structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t("قائمة العقارات المفضلة"),
        "description": t("قائمة العقارات التي حفظها المستخدم كمفضلة على موقع أوسكار العقارية"),
        "url": "https://oscar-realestate.com/favorites",
        "numberOfItems": favorites.length,
        "itemListOrder": "http://schema.org/ItemListOrderDescending",
        "itemListElement": favorites.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "RealEstateListing",
                "name": item.name || t("عقار"),
                "description": item.description || t("عقار في قائمة المفضلة"),
                "url": `https://oscar-realestate.com/realestate/${item.id}`,
                "image": item.image ? `https://oscar-realestate.com/storage/${item.image}` : null
            }
        }))
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        filterAndSortFavorites();
    }, [favorites, selectedType, selectedPrice, sortBy]);

    const loadFavorites = () => {
        setLoading(true);
        try {
            const stored = localStorage.getItem("favorite");
            const favoriteItems = stored ? JSON.parse(stored) : [];
            setFavorites(favoriteItems);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortFavorites = () => {
        let filtered = [...favorites];

        // Filter by type
        if (selectedType !== "all") {
            filtered = filtered.filter(item => item.rent_or_sale === selectedType);
        }

        // Filter by price range
        if (selectedPrice !== "all") {
            switch (selectedPrice) {
                case "low":
                    filtered = filtered.filter(item => item.price < 1000000);
                    break;
                case "medium":
                    filtered = filtered.filter(item => item.price >= 1000000 && item.price <= 3000000);
                    break;
                case "high":
                    filtered = filtered.filter(item => item.price > 3000000);
                    break;
            }
        }

        // Sort
        switch (sortBy) {
            case "price_low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price_high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "area":
                filtered.sort((a, b) => b.area - a.area);
                break;
            case "date":
                // Default order (as saved)
                break;
        }

        setFilteredFavorites(filtered);
    };

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(item => item.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
    };

    const clearAllFavorites = () => {
        if (window.confirm(t("هل تريد حذف جميع العقارات المفضلة؟"))) {
            setFavorites([]);
            localStorage.removeItem("favorite");
        }
    };

    const exportFavorites = () => {
        const dataStr = JSON.stringify(favorites, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'oscar-favorites.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A86B06] mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t("جاري تحميل العقارات المفضلة...")}
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />

                {/* Open Graph */}
                <meta property="og:title" content={seoData.ogTitle} />
                <meta property="og:description" content={seoData.ogDescription} />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={seoData.ogImage} />
                <meta property="og:locale" content="ar_EG" />
                <meta property="og:site_name" content="أوسكار العقارية" />

                {/* Twitter Card */}
                <meta name="twitter:card" content={seoData.twitterCard} />
                <meta name="twitter:title" content={seoData.twitterTitle} />
                <meta name="twitter:description" content={seoData.twitterDescription} />
                <meta name="twitter:image" content={seoData.twitterImage} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>

                {/* Additional Meta Tags */}
                <meta name="robots" content="noindex, follow" />
                <meta name="author" content="أوسكار العقارية" />
            </Helmet>

            <Layout>
                <div className="min-h-screen bg-gray-50 dark:bg-[#080808] py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header with Stats */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6" dir="rtl">
                            <div className="text-right">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                    {t("الوحدات")} <span className="text-[#A86B06]">{t("المفضلة")}</span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t("عرض وإدارة العقارات التي حفظتها كمفضلة")}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="bg-[#A86B06]/10 text-[#A86B06] px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                                    <HeartSolid className="w-4 h-4" />
                                    <span>{t("تم العثور على")} {favorites.length} {t("وحدة")}</span>
                                </div>

                                {favorites.length > 0 && (
                                    <>

                                        <button
                                            onClick={clearAllFavorites}
                                            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                            {t("حذف الكل")}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>



                        {/* Favorites List */}
                        <div className="p-4">
                            {favorites.length === 0 ? (
                                <div className="bg-white dark:bg-[#111111] rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800">
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <HeartIcon className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                        {t("لا توجد عقارات مفضلة")}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                        {t("لم تقم بإضافة أي عقارات إلى قائمة المفضلة بعد. ابدأ بتصفح العقارات واضغط على زر القلب لإضافتها إلى هنا.")}
                                    </p>
                                    <a
                                        href="/realestate"
                                        className="inline-flex items-center gap-2 bg-[#A86B06] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#8e5a05] transition-colors"
                                    >
                                        <span>{t("تصفح العقارات")}</span>
                                        <ShareIcon className="w-5 h-5 rotate-180" />
                                    </a>
                                </div>
                            ) : filteredFavorites.length === 0 ? (
                                <div className="bg-white dark:bg-[#111111] rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800">
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FunnelIcon className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                        {t("لا توجد نتائج")}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                                        {t("لا توجد عقارات تطابق معايير التصفية المحددة.")}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedType("all");
                                            setSelectedPrice("all");
                                            setSortBy("date");
                                        }}
                                        className="inline-flex items-center gap-2 bg-[#A86B06] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#8e5a05] transition-colors"
                                    >
                                        <ArrowPathIcon className="w-5 h-5" />
                                        <span>{t("عرض جميع العقارات")}</span>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                                        {filteredFavorites.map((item) => (
                                            <div key={item.id} className="relative group">
                                                <PropertyCard item={item} />
                                                <button
                                                    onClick={() => removeFromFavorites(item.id)}
                                                    className="absolute top-4 left-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                    title={t("حذف من المفضلة")}
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
