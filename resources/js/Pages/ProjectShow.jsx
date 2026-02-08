import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "./Layout";
import axios from "axios";
import {
    MapPinIcon, PhoneIcon, ChatBubbleLeftRightIcon, EnvelopeIcon,
    ChevronRightIcon, ChevronLeftIcon, XMarkIcon, SparklesIcon,
    BuildingOfficeIcon, ArrowsPointingOutIcon, RectangleGroupIcon,
    CalendarIcon, CurrencyDollarIcon, TagIcon, UserIcon,
    DevicePhoneMobileIcon, HomeIcon, CreditCardIcon, CheckCircleIcon
} from "@heroicons/react/24/outline";
import PropertyCard from "@/Components/ComponentsRealState/PropertyCard";
import { useTranslation } from 'react-i18next';
import { Head } from '@inertiajs/react';

export default function ProjectShow() {
    const { t, i18n } = useTranslation();
    const [project, setProject] = useState(null);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const { app_url } = usePage().props;
    const projectId = window.location.pathname.split("/").pop();

    const language = i18n.language || 'ar';

    const getLocalizedField = (arField, enField) => {
        return language === 'en' && enField ? enField : arField;
    };

    const fetchProject = async () => {
        try {
            const response = await axios.get(`/projects/${projectId}`);
            setProject(response.data);

        } catch (error) { console.error(error); }
    };

    useEffect(() => { if (projectId) fetchProject(); }, [projectId]);

    if (!project) return (
        <div className="h-screen flex items-center justify-center dark:bg-[#080808]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#A86B06]"></div>
        </div>
    );

    const allImages = [project.image, ...(project.images?.map(img => img.image || img.path) || [])].filter(Boolean);

    const formatDate = (dateString) => {
        if (!dateString) return t("غير محدد");
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getProjectTypeText = (type) => {
        if (type === "residential") return t("سكني");
        if (type === "coastal") return t("ساحلي");
        return t("غير محدد");
    };

    const getPaymentText = (payment) => {
        if (payment === "cash") return t("كاش");
        if (payment === "installments") return t("تقسيط");
        if (payment === "cash_and_installments") return t("كاش وتقسيط");
        return t("غير محدد");
    };

    const projectName = getLocalizedField(project.name, project.name_en);
    const projectDeveloper = getLocalizedField(project.developer, project.developer_en);
    const projectDescription = getLocalizedField(project.description, project.description_en);
    const projectCategory = getLocalizedField(project.category?.category, project.category?.category_en);
    const projectLocation = getLocalizedField(project.location?.location, project.location?.location_en);

    const seoData = {
        title: t("مشروع {projectName} | أوسكار للتسويق العقاري - {location}", {
            projectName: projectName,
            location: projectLocation || "مصر"
        }),
        description: t("اكتشف مشروع {projectName} مع أوسكار للتسويق العقاري. يبدأ السعر من {lowestPrice} ج.م، مساحات من {smallestArea} إلى {largestArea} م²، {developer}. {payment}.", {
            projectName: projectName,
            lowestPrice: new Intl.NumberFormat("ar-EG").format(project.lowest_price || 0),
            smallestArea: project.smallest_area || 0,
            largestArea: project.largest_area || 0,
            developer: projectDeveloper || "",
            payment: getPaymentText(project.Payment)
        }),
        keywords: t("مشروع {projectName}, {location}, {developer}, عقارات للبيع في {location}, مشاريع سكنية مصر, عقارات {payment}, أوسكار للتسويق العقاري", {
            projectName: projectName,
            location: projectLocation || "مصر",
            developer: projectDeveloper || "المطور العقاري",
            payment: getPaymentText(project.Payment)
        }),
        canonical: `https://oscar-realestate.com/projects/${projectId}`,
        ogTitle: t("مشروع {projectName} - أوسكار للتسويق العقاري", { projectName: projectName }),
        ogDescription: t("استثمر في {projectName} مع أوسكار للتسويق العقاري. {payment} في {location}. أسعار تنافسية ومساحات متنوعة.", {
            projectName: projectName,
            payment: getPaymentText(project.Payment),
            location: projectLocation || "مصر"
        }),
        ogImage: project.image ? `${app_url}/storage/${project.image}` : "https://oscar-realestate.com/images/og-projects.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("{projectName} | مشروع عقاري استثماري", { projectName: projectName }),
        twitterDescription: t("فرصة استثمارية في مشروع {projectName}. {payment} {developer} {location}", {
            projectName: projectName,
            payment: getPaymentText(project.Payment),
            developer: projectDeveloper ? `من ${projectDeveloper}` : "",
            location: projectLocation ? `في ${projectLocation}` : ""
        }),
        twitterImage: project.image ? `${app_url}/storage/${project.image}` : "https://oscar-realestate.com/images/twitter-projects.jpg",
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateProject",
        "name": projectName,
        "description": projectDescription || t("مشروع عقاري في مصر"),
        "url": `https://oscar-realestate.com/projects/${projectId}`,
        "image": allImages.map(img => `${app_url}/storage/${img}`),
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": project.lowest_price,
            "highPrice": project.highest_price,
            "priceCurrency": "EGP",
            "offerCount": project.real_states?.length || 0
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": projectLocation || "Cairo",
            "addressRegion": "Cairo",
            "addressCountry": "EG"
        },
        "developer": {
            "@type": "Organization",
            "name": projectDeveloper || t("مطور عقاري")
        },
        "numberOfUnits": project.real_states?.length || 0,
        "category": projectCategory || t("مشروع عقاري"),
        "availability": "https://schema.org/InStock",
        "provider": {
            "@type": "RealEstateAgent",
            "name": t("أوسكار للتسويق العقاري"),
            "url": "https://oscar-realestate.com"
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
                                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 hover:scale-105"
                                onClick={() => setIsLightboxOpen(true)}
                                alt={projectName}
                            />

                            {allImages.length > 1 && (
                                <>
                                    <button onClick={() => setActiveImgIndex((i) => (i - 1 + allImages.length) % allImages.length)} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full hover:bg-[#A86B06] hover:text-white transition-all shadow-xl">
                                        <ChevronRightIcon className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => setActiveImgIndex((i) => (i + 1) % allImages.length)} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full hover:bg-[#A86B06] hover:text-white transition-all shadow-xl">
                                        <ChevronLeftIcon className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-lg text-white px-4 py-1.5 rounded-xl text-sm font-bold border border-white/10">
                                {activeImgIndex + 1} / {allImages.length} {t("صورة")}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 space-y-12">
                            <div className="border-b border-gray-100 dark:border-white/5 pb-8">
                                <div className="flex items-center gap-3 mb-6 flex-wrap">
                                    {project.top == 1 && (
                                        <span className="px-4 py-1.5 bg-[#A86B06] text-white rounded-xl text-xs font-black flex items-center gap-2">
                                            <SparklesIcon className="w-4 h-4" /> {t("مشروع مميز")}
                                        </span>
                                    )}
                                    <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 dark:text-[#A86B06] rounded-xl text-xs font-bold flex items-center gap-2">
                                        <BuildingOfficeIcon className="w-4 h-4" /> {projectDeveloper || t("غير محدد")}
                                    </span>
                                    <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold">
                                        {getProjectTypeText(project.Residential_Coastal)}
                                    </span>
                                    <span className="px-4 py-1.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300 rounded-xl text-xs font-bold">
                                        {getPaymentText(project.Payment)}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6 leading-tight">{projectName}</h1>
                                <div className="flex items-center gap-2 text-gray-500 mb-2">
                                    <MapPinIcon className="w-6 h-6 text-[#A86B06]" />
                                    <span className="text-xl font-medium">{projectLocation || t("غير محدد")}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black dark:text-white flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#A86B06] rounded-full"></div>
                                    {t("تفاصيل المشروع")}
                                </h3>
                                <div className="grid grid-cols-1 border border-gray-100 dark:border-white/5 rounded-[1.5rem] overflow-hidden shadow-sm">
                                    <DataRow label={t("يبدأ السعر من")} value={`${new Intl.NumberFormat("ar-EG").format(project.lowest_price || 0)} ${t("ج.م")}`} highlight icon={<CurrencyDollarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("يصل السعر إلى")} value={`${new Intl.NumberFormat("ar-EG").format(project.highest_price || 0)} ${t("ج.م")}`} isOdd icon={<CurrencyDollarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("أقل مساحة")} value={`${project.smallest_area || 0} ${t("م²")}`} icon={<ArrowsPointingOutIcon className="w-5 h-5" />} />
                                    <DataRow label={t("أكبر مساحة")} value={`${project.largest_area || 0} ${t("م²")}`} isOdd icon={<ArrowsPointingOutIcon className="w-5 h-5" />} />
                                    <DataRow label={t("المطور العقاري")} value={projectDeveloper || t("غير محدد")} icon={<UserIcon className="w-5 h-5" />} />
                                    <DataRow label={t("طريقة الدفع")} value={getPaymentText(project.Payment)} isOdd icon={<CreditCardIcon className="w-5 h-5" />} />
                                    <DataRow label={t("تاريخ التسليم")} value={formatDate(project.delivery_date)} icon={<CalendarIcon className="w-5 h-5" />} />
                                    <DataRow label={t("الفئة")} value={projectCategory || t("غير محدد")} isOdd icon={<TagIcon className="w-5 h-5" />} />
                                    <DataRow label={t("نوع المشروع")} value={getProjectTypeText(project.Residential_Coastal)} icon={<HomeIcon className="w-5 h-5" />} />
                                </div>
                            </div>

                            <div className="bg-gray-50/50 dark:bg-white/[0.03] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5">
                                <h3 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#A86B06] rounded-full"></div>
                                    {t("وصف المشروع")}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-[2.2] text-lg whitespace-pre-line">
                                    {projectDescription || t("لا يوجد وصف تفصيلي لهذا المشروع.")}
                                </p>
                            </div>

                            {project.real_states?.length > 0 && (
                                <div className="space-y-8 pt-8">
                                    <h3 className="text-3xl font-black dark:text-white flex items-center gap-3">
                                        <RectangleGroupIcon className="w-8 h-8 text-[#A86B06]" />
                                        {t("الوحدات المتاحة داخل المشروع")} ({project.real_states.length} {t("وحدة")})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {project.real_states.map((unit) => (
                                            <PropertyCard key={unit.id} item={unit} />
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
                                        <p className="text-sm text-gray-400 font-bold mb-1">{t("المطور العقاري")}</p>
                                        <h4 className="text-xl font-black dark:text-white">{projectDeveloper || t("غير محدد")}</h4>
                                    </div>

                                    <div className="space-y-3">
                                        <a href={`tel:${project.phone_number}`} className="flex items-center justify-center gap-3 w-full bg-[#111] dark:bg-white dark:text-black text-white py-4 rounded-2xl font-bold shadow-lg shadow-black/10 hover:bg-[#A86B06] hover:text-white transition-all">
                                            <PhoneIcon className="w-5 h-5" /> {project.phone_number || t("اتصل الآن")}
                                        </a>
                                        <a href={`https://wa.me/${project.whatsApp_number}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:scale-[1.02] transition-all">
                                            <ChatBubbleLeftRightIcon className="w-6 h-6" /> {project.whatsApp_number || t("واتساب")}
                                        </a>
                                        <a href={`mailto:${project.email}`} className="flex items-center justify-center gap-3 w-full border-2 border-[#A86B06] text-[#A86B06] py-4 rounded-2xl font-bold hover:bg-[#A86B06] hover:text-white transition-all">
                                            <EnvelopeIcon className="w-6 h-6" /> {project.email || t("مراسلة عبر الإيميل")}
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
                                            <span className="font-semibold dark:text-white text-sm">{project.email || t("غير متوفر")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("رقم الهاتف:")}</span>
                                            <span className="font-semibold dark:text-white">{project.phone_number || t("غير متوفر")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("واتساب:")}</span>
                                            <span className="font-semibold text-green-500">{project.whatsApp_number || t("غير متوفر")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("الموقع:")}</span>
                                            <span className="font-semibold dark:text-white">{projectLocation || t("غير محدد")}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <span className="text-gray-500 text-sm">{t("الفئة:")}</span>
                                            <span className="font-semibold dark:text-white">{projectCategory || t("غير محدد")}</span>
                                        </div>
                                    </div>
                                </div>

                                {allImages.length > 1 && (
                                    <div className="bg-white dark:bg-[#111] p-6 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 dark:border-white/5">
                                        <h4 className="text-xl font-black dark:text-white mb-4 flex items-center gap-2">
                                            <RectangleGroupIcon className="w-6 h-6 text-[#A86B06]" />
                                            {t("معرض الصور")}
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {allImages.slice(0, 6).map((img, index) => (
                                                <div key={index} className="aspect-square rounded-xl overflow-hidden border dark:border-white/5 hover:border-[#A86B06] transition-all cursor-pointer group">
                                                    <img
                                                        src={`${app_url}/storage/${img}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        onClick={() => { setActiveImgIndex(index); setIsLightboxOpen(true); }}
                                                        alt={`gallery-${index}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {allImages.length > 6 && (
                                            <p className="text-center text-gray-500 text-sm mt-3">+ {allImages.length - 6} {t("صورة إضافية")}</p>
                                        )}
                                    </div>
                                )}
                            </div>
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

const DataRow = ({ label, value, isOdd = false, highlight = false, icon }) => (
    <div className={`flex justify-between items-center p-6 transition-colors ${isOdd ? 'bg-gray-50/50 dark:bg-white/[0.02]' : 'bg-white dark:bg-transparent'}`}>
        <div className="flex items-center gap-3">
            {icon && <div className="text-gray-400">{icon}</div>}
            <span className="text-gray-500 dark:text-gray-400 font-bold text-base">{label}</span>
        </div>
        <span className={`font-black text-right ${highlight ? 'text-[#A86B06] text-2xl' : 'text-gray-900 dark:text-white'}`}>
            {value || t("غير محدد")}
        </span>
    </div>
);
