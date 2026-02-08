import React, { useState, useEffect } from "react";
import { Head } from '@inertiajs/react'; // استخدم Head من Inertia
import Layout from "./Layout";
import Hero from "@/Components/ComponentsIndex/Hero";
import axios from "axios";
import { router } from "@inertiajs/react";
import BuyAndSellRealState from "@/Components/ComponentsIndex/BuyAndSellRealState";
import TopRealState from "@/Components/ComponentsIndex/TopRealState";
import TopProjects from "@/Components/ComponentsIndex/TopProjects";
import RealEstateAllocation from "@/Components/ComponentsIndex/RealEstateAllocation";
import SearchByArea from "@/Components/ComponentsIndex/SearchByArea";
import StatisticsSection from "@/Components/ComponentsIndex/StatisticsSection";
import JoinTeamSection from "@/Components/ComponentsIndex/JoinTeamSection";
import { useTranslation } from 'react-i18next';

export default function Index() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [realStates, setRealStates] = useState([]);
    const [filterRealStates, setFilterRealStates] = useState([]);
    const [filters, setFilters] = useState({
        rent_or_sale: "sale",
        location_id: "",
        category_id: "",
        type_id: "",
        rooms: "",
        bathrooms: "",
        min_price: "",
        max_price: "",
        min_area: "",
        max_area: "",
        immediate_delivery: false,
    });


    const seoData = {
        title: t("أوسكار العقارية | الرائدة في سوق العقارات المصري - بيع وشراء وإيجار"),
        description: t("اكتشف أفضل العقارات في مصر مع أوسكار العقارية. عقارات للبيع والشراء والإيجار في أفضل مناطق القاهرة والجيزة. تصفح آلاف الوحدات السكنية والتجارية."),
        keywords: t("عقارات مصر, عقارات للبيع في القاهرة, عقارات للإيجار في الجيزة, شركة عقارية مصرية, أوسكار العقارية, شقق للبيع, فلل للبيع, مكاتب للإيجار, عقارات التجمع الخامس, عقارات الشيخ زايد"),
        canonical: "https://oscar-realestate.com",
        ogTitle: t("أوسكار العقارية - شريكك الموثوق في سوق العقارات المصري"),
        ogDescription: t("نقدم لك أفضل الخدمات العقارية في مصر. تصفح آلاف العقارات المميزة للبيع والإيجار في أفضل المناطق."),
        ogImage: "https://oscar-realestate.com/images/og-home.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("أوسكار العقارية | بيع وشراء وإيجار العقارات في مصر"),
        twitterDescription: t("اكتشف آلاف العقارات المميزة في مصر. فلل، شقق، مكاتب، محلات للبيع والإيجار."),
        twitterImage: "https://oscar-realestate.com/images/twitter-home.jpg",
    };


    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": t("شركة أوسكار للتسويق العقاري"),
        "description": t("شركة رائدة في مجال التسويق العقاري في مصر، متخصصة في بيع وشراء وإيجار العقارات السكنية والتجارية."),
        "url": "https://oscar-realestate.com",
        "telephone": "+20123456789",
        "email": "info@oscar-realestate.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": t("33 شارع قصر النيل - حي عابدين - وسط البلد"),
            "addressLocality": "Cairo",
            "addressRegion": "Cairo",
            "addressCountry": "EG"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.0444",
            "longitude": "31.2357"
        },
        "openingHours": "Mo-Fr 09:00-17:00",
        "priceRange": "$$$",
        "image": "https://oscar-realestate.com/images/logo.png",
        "sameAs": [
            "https://facebook.com/oscarrealestate",
            "https://twitter.com/oscarrealestate",
            "https://instagram.com/oscarrealestate",
            "https://linkedin.com/company/oscarrealestate"
        ],
        "areaServed": {
            "@type": "City",
            "name": "Cairo"
        },
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t("خدمات بيع العقارات")
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t("خدمات تأجير العقارات")
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t("استشارات عقارية")
                }
            }
        ]
    };

    useEffect(() => {
        fetchRealState();
    }, []);

    const fetchRealState = async () => {
        try {
            const response = await axios.get("/real-estate");
            setRealStates(response.data);
            setFilterRealStates(response.data);
        } catch (error) {
            console.error("Error fetching real estate:", error);
        }
    };

    const handleSearch = (e, updatedFilters = null) => {
        if (e && e.preventDefault) e.preventDefault();
        setLoading(true);
        const filtersToSave = updatedFilters || filters;
        sessionStorage.setItem("searchFilters", JSON.stringify(filtersToSave));
        setLoading(false);
        router.visit("/realestate");
    };


    const siteStats = {
        totalProperties: 1200,
        happyClients: 850,
        successfulDeals: 500,
        yearsExperience: 10
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
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
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="author" content="أوسكار العقارية" />
                <meta name="language" content="Arabic" />
                <meta name="geo.region" content="EG-CA" />
                <meta name="geo.placename" content="Cairo" />
                <meta name="geo.position" content="30.0444;31.2357" />
                <meta name="ICBM" content="30.0444, 31.2357" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Layout>
                {/* Hero Section */}
                <Hero
                    loading={loading}
                    filters={filters}
                    setFilters={setFilters}
                    handleSearch={handleSearch}
                />



                {/* Main Content Sections */}
                <BuyAndSellRealState
                    filters={filters}
                    setFilters={setFilters}
                    handleSearch={handleSearch}
                />

                <TopRealState />

                <TopProjects />

                <RealEstateAllocation
                    filters={filters}
                    setFilters={setFilters}
                    handleSearch={handleSearch}
                />

                <SearchByArea
                    filters={filters}
                    setFilters={setFilters}
                    handleSearch={handleSearch}
                />

                <StatisticsSection />




                {/* Call to Action */}
                <section className="py-20 bg-[#A86B06]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                            {t("جاهز لإيجاد عقار أحلامك؟")}
                        </h2>
                        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                            {t("انضم إلى آلاف العملاء الراضين الذين وجدوا منازلهم ومكاتبهم ومحلاتهم التجارية مع أوسكار")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.visit('/realestate')}
                                className="px-8 py-4 bg-white text-[#A86B06] rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                {t("تصفح جميع العقارات")}
                            </button>
                            <button
                                onClick={() => router.visit('/contact-us')}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
                            >
                                {t("تواصل مع مستشار عقاري")}
                            </button>
                        </div>
                    </div>
                </section>

                   <JoinTeamSection />
            </Layout>
        </>
    );
}
