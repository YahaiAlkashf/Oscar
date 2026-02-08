import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "./Layout";
import axios from "axios";
import {
    MapPinIcon, PhoneIcon, ChatBubbleLeftRightIcon, EnvelopeIcon,
    ChevronRightIcon, ChevronLeftIcon, XMarkIcon, SparklesIcon,
    CheckCircleIcon, HomeIcon, BuildingOfficeIcon, CalendarIcon,
    CurrencyDollarIcon, ArrowsPointingOutIcon, ViewfinderCircleIcon,
    WifiIcon, DevicePhoneMobileIcon, UserIcon, TagIcon, BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import { Head } from '@inertiajs/react';

export default function PropertyShow() {
    const { t, i18n } = useTranslation();
    const [property, setProperty] = useState(null);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const { app_url } = usePage().props;
    const propertyId = window.location.pathname.split("/").pop();

    const language = i18n.language || 'ar';

    const getLocalizedField = (arField, enField) => {
        return language === 'en' && enField ? enField : arField;
    };

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`/real-estate/${propertyId}`);
            setProperty(response.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { if (propertyId) fetchProperty(); }, [propertyId]);

    if (!property) return <div className="h-screen flex items-center justify-center dark:bg-[#080808]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#A86B06]"></div></div>;

    const allImages = [property.image, ...(property.images?.map(img => img.image || img.path) || [])].filter(Boolean);

    const formatDate = (dateString) => {
        if (!dateString) return t("غير محدد");
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getPropertyTypeText = (type) => {
        if (type === "residential") return t("سكني");
        if (type === "coastal") return t("ساحلي");
        return t("غير محدد");
    };

    const getSaleTypeText = (type) => {
        if (type === "sale") return t("بيع");
        if (type === "rent") return t("إيجار");
        return t("غير محدد");
    };

    const propertyName = getLocalizedField(property.name, property.name_en);
    const propertyView = getLocalizedField(property.view, property.view_en);
    const propertyFinishingType = getLocalizedField(property.finishing_type, property.finishing_type_en);
    const propertyDescription = getLocalizedField(property.description, property.description_en);
    const propertyBrokerName = getLocalizedField(property.broker_name, property.broker_name_en);
    const propertyLocation = getLocalizedField(property.location?.location, property.location?.location_en);
    const propertyCategory = getLocalizedField(property.category?.category, property.category?.category_en);
    const propertyType = getLocalizedField(property.type?.type, property.type?.type_en);
    const projectName = getLocalizedField(property.project?.name, property.project?.name_en);

    const seoData = {
        title: `${propertyName} - ${propertyType || t("عقار")} ${t("لل")}${getSaleTypeText(property.rent_or_sale)} ${t("في")} ${propertyLocation || t("مصر")} | ${t("أوسكار للتسويق العقاري")}`,

        description: `${t("عقار")} ${propertyName} ${t("لل")}${getSaleTypeText(property.rent_or_sale)} ${t("في")} ${propertyLocation || t("مصر")}. ${t("المساحة:")} ${property.area} ${t("م²، السعر:")} ${new Intl.NumberFormat("ar-EG").format(property.price)} ${t("ج.م،")} ${property.rooms} ${t("غرف،")} ${property.bathrooms} ${t("حمامات.")} ${propertyDescription ? propertyDescription.substring(0, 150) : t("عقار مميز.")}`,

        keywords: `${propertyName}, ${propertyLocation || t("مصر")}, ${propertyType || t("عقار")} ${t("لل")}${getSaleTypeText(property.rent_or_sale)}, ${t("عقار")} ${property.rooms} ${t("غرف")}, ${propertyCategory || t("عقار")}, ${propertyFinishingType || t("تشطيب")}, ${t("أوسكار للتسويق العقاري")}`,

        canonical: `https://oscar-realestate.com/real-estate/${propertyId}`,

        ogTitle: `${propertyName} - ${getSaleTypeText(property.rent_or_sale)} ${t("في")} ${propertyLocation || t("مصر")}`,

        ogDescription: `${propertyType || t("عقار")} ${t("لل")}${getSaleTypeText(property.rent_or_sale)}، ${t("مساحة")} ${property.area} ${t("م²،")} ${property.rooms} ${t("غرف،")} ${property.bathrooms} ${t("حمامات.")} ${t("السعر:")} ${new Intl.NumberFormat("ar-EG").format(property.price)} ${t("ج.م")}`,

        ogImage: property.image ? `${app_url}/storage/${property.image}` : "https://oscar-realestate.com/images/og-property.jpg",

        twitterCard: "summary_large_image",

        twitterTitle: `${propertyName} | ${t("عقار")} ${t("لل")}${getSaleTypeText(property.rent_or_sale)}`,

        twitterDescription: `${propertyType || t("عقار")} ${getSaleTypeText(property.rent_or_sale)} ${t("في")} ${propertyLocation || t("مصر")}. ${property.area} ${t("م² -")} ${new Intl.NumberFormat("ar-EG").format(property.price)} ${t("ج.م")}`,

        twitterImage: property.image ? `${app_url}/storage/${property.image}` : "https://oscar-realestate.com/images/twitter-property.jpg",
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": property.rent_or_sale === "rent" ? "RentalAction" : "SellAction",
        "name": propertyName,
        "description": propertyDescription || t("عقار مميز لل") + getSaleTypeText(property.rent_or_sale),
        "url": `https://oscar-realestate.com/real-estate/${propertyId}`,
        "image": allImages.map(img => `${app_url}/storage/${img}`),
        "offers": {
            "@type": "Offer",
            "price": property.price,
            "priceCurrency": "EGP",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "RealEstateAgent",
                "name": t("أوسكار للتسويق العقاري"),
                "url": "https://oscar-realestate.com"
            }
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": propertyLocation || "Cairo",
            "addressRegion": "Cairo",
            "addressCountry": "EG"
        },
        "numberOfRooms": property.rooms,
        "numberOfBathroomsTotal": property.bathrooms,
        "floorSize": {
            "@value": property.area,
            "@unitCode": "MTK"
        },
        "amenityFeature": property.features?.map(f => ({
            "@type": "LocationFeatureSpecification",
            "name": typeof f === "object" ? getLocalizedField(f.feature, f.feature_en) : f
        })),
        "category": propertyCategory || t("عقار"),
        "additionalType": propertyType || t("عقار"),
        "broker": {
            "@type": "RealEstateAgent",
            "name": propertyBrokerName || t("وكيل عقاري")
        }
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
                <meta property="og:type" content="article" />
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
                <div className="bg-[#FDFDFD] dark:bg-[#080808] min-h-screen pb-20 transition-colors" dir="rtl">

                    <div className="max-w-2xl mx-auto px-4 pt-6">
                        <div className="relative w-full h-[350px] md:h-[380px] bg-gray-100 dark:bg-[#111] rounded-[2rem] overflow-hidden group shadow-md">
                            <img
                                src={`${app_url}/storage/${allImages[activeImgIndex]}`}
                                className="w-full h-full object-cover cursor-zoom-in"
                                onClick={() => setIsLightboxOpen(true)}
                                alt={propertyName}
                            />

                            <button onClick={() => setActiveImgIndex((i) => (i - 1 + allImages.length) % allImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white rounded-full hover:bg-[#A86B06] hover:text-white transition-all shadow-md">
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                            <button onClick={() => setActiveImgIndex((i) => (i + 1) % allImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white rounded-full hover:bg-[#A86B06] hover:text-white transition-all shadow-md">
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>

                            <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md">
                                {activeImgIndex + 1} / {allImages.length}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 space-y-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    <span className="px-3 py-1 bg-[#A86B06]/10 text-[#A86B06] rounded-md text-sm font-bold flex items-center gap-1">
                                        <TagIcon className="w-4 h-4" /> {t("كود:")} {property.unit_code}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 dark:text-gray-400 rounded-md text-sm font-bold flex items-center gap-1">
                                        <BuildingStorefrontIcon className="w-4 h-4" /> {propertyType}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-md text-sm font-bold">
                                        {getPropertyTypeText(property.Residential_Coastal)}
                                    </span>
                                    {property.top && (
                                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 rounded-md text-sm font-bold">
                                            ⭐ {t("مميز")}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black dark:text-white mb-4">{propertyName}</h1>
                                <div className="flex items-center gap-2 text-gray-500 mb-2">
                                    <MapPinIcon className="w-6 h-6 text-[#A86B06]" />
                                    <span className="text-xl">{propertyLocation}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <UserIcon className="w-5 h-5 text-gray-400" />
                                    <span className="text-lg">{t("الوكيل:")} {propertyBrokerName}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black dark:text-white flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#A86B06] rounded-full"></div>
                                    {t("تفاصيل العقار")}
                                </h3>
                                <div className="grid grid-cols-1 border border-gray-100 dark:border-white/5 rounded-[1.5rem] overflow-hidden shadow-sm">
                                    <DataRow label={t("السعر المطلوب")} value={`${new Intl.NumberFormat("ar-EG").format(property.price)} ${t("ج.م")}`} highlight icon={<CurrencyDollarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("المساحة الإجمالية")} value={`${property.area} ${t("متر مربع")}`} isOdd icon={<ArrowsPointingOutIcon className="w-5 h-5" />} />
                                    <DataRow label={t("عدد الغرف")} value={`${property.rooms} ${t("غرف")}`} icon={<HomeIcon className="w-5 h-5" />} />
                                    <DataRow label={t("عدد الحمامات")} value={`${property.bathrooms} ${t("حمامات")}`} isOdd icon={<HomeIcon className="w-5 h-5" />} />
                                    <DataRow label={t("نوع التشطيب")} value={propertyFinishingType} icon={<BuildingOfficeIcon className="w-5 h-5" />} />
                                    <DataRow label={t("الإطلالة (View)")} value={propertyView} isOdd icon={<ViewfinderCircleIcon className="w-5 h-5" />} />
                                    <DataRow label={t("الغرض")} value={getSaleTypeText(property.rent_or_sale)} icon={<CurrencyDollarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("حالة التسليم")} value={property.immediate_delivery == 1 ? t("فوري") : property.delivery_date ? formatDate(property.delivery_date) : t("غير محدد")} isOdd icon={<CalendarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("الفئة")} value={propertyCategory} icon={<TagIcon className="w-5 h-5" />} />
                                    <DataRow label={t("المشروع")} value={projectName || t("غير محدد")} icon={<BuildingStorefrontIcon className="w-5 h-5" />} />
                                </div>
                            </div>

                            <div className="bg-gray-50/50 dark:bg-white/5 p-8 rounded-[2rem]">
                                <h3 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#A86B06] rounded-full"></div>
                                    {t("الوصف التفصيلي")}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-[2] text-lg whitespace-pre-line">
                                    {propertyDescription || t("لا يوجد وصف مفصل لهذا العقار.")}
                                </p>
                            </div>

                            {property.features?.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black dark:text-white flex items-center gap-3">
                                        <SparklesIcon className="w-7 h-7 text-[#A86B06]" />
                                        {t("مميزات العقار")}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {property.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm hover:border-[#A86B06]/50 transition-all">
                                                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                                                <span className="font-bold dark:text-gray-200">
                                                    {typeof f === "object" ? getLocalizedField(f.feature, f.feature_en) : f}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-10 space-y-6">
                                <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-white/5">
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                            <UserIcon className="w-10 h-10 text-[#A86B06]" />
                                        </div>
                                        <p className="text-sm text-gray-400 font-bold mb-1">{t("الوكيل العقاري")}</p>
                                        <h4 className="text-xl font-black dark:text-white">{propertyBrokerName}</h4>
                                    </div>

                                    <div className="space-y-3">
                                        <a href={`tel:${property.phone_number}`} className="flex items-center justify-center gap-3 w-full bg-[#111] dark:bg-white dark:text-black text-white py-4 rounded-2xl font-bold shadow-lg shadow-black/10 hover:bg-[#A86B06] hover:text-white transition-all">
                                            <PhoneIcon className="w-5 h-5" /> {property.phone_number || t("اتصل الآن")}
                                        </a>
                                        <a href={`https://wa.me/${property.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:scale-[1.02] transition-all">
                                            <ChatBubbleLeftRightIcon className="w-6 h-6" /> {property.whatsapp_number || t("واتساب")}
                                        </a>
                                        <a href={`mailto:${property.email}`} className="flex items-center justify-center gap-3 w-full border-2 border-[#A86B06] text-[#A86B06] py-4 rounded-2xl font-bold hover:bg-[#A86B06] hover:text-white transition-all">
                                            <EnvelopeIcon className="w-6 h-6" /> {property.email || t("مراسلة عبر الإيميل")}
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#111] p-6 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 dark:border-white/5">
                                    <h4 className="text-xl font-black dark:text-white mb-4 flex items-center gap-2">
                                        <DevicePhoneMobileIcon className="w-6 h-6 text-[#A86B06]" />
                                        {t("معلومات الاتصال")}
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("البريد الإلكتروني:")}</span>
                                            <span className="font-semibold dark:text-white text-sm">{property.email || t("غير متوفر")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("رقم الهاتف:")}</span>
                                            <span className="font-semibold dark:text-white">{property.phone_number || t("غير متوفر")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("واتساب:")}</span>
                                            <span className="font-semibold text-green-500">{property.whatsapp_number || t("غير متوفر")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-12">
                        <h3 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#A86B06] rounded-full"></div>
                            {t("معرض الصور")}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {allImages.map((img, index) => (
                                <div key={index} className="aspect-square rounded-2xl overflow-hidden border dark:border-white/5 hover:border-[#A86B06] transition-all cursor-pointer group">
                                    <img
                                        src={`${app_url}/storage/${img}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onClick={() => { setActiveImgIndex(index); setIsLightboxOpen(true); }}
                                        alt={`property-gallery-${index}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isLightboxOpen && (
                    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                        <button onClick={() => setIsLightboxOpen(false)} className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform">
                            <XMarkIcon className="w-12 h-12" />
                        </button>
                        <img src={`${app_url}/storage/${allImages[activeImgIndex]}`} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" alt="zoom" />
                    </div>
                )}
            </Layout>
        </>
    );
}

const DataRow = ({ label, value, isOdd = false, highlight = false, icon }) => {
    const { t } = useTranslation();
    return (
        <div className={`flex justify-between items-center p-6 transition-colors ${isOdd ? 'bg-gray-50/50 dark:bg-white/[0.02]' : 'bg-white dark:bg-transparent'}`}>
            <div className="flex items-center gap-3">
                {icon && <div className="text-gray-400">{icon}</div>}
                <span className="text-gray-500 dark:text-gray-400 font-bold text-base">{label}</span>
            </div>
            <span className={`font-black text-right ${highlight ? 'text-[#A86B06] text-2xl' : 'text-gray-900 dark:text-white'}`}>
                {value || t("غير متوفر")}
            </span>
        </div>
    );
};
