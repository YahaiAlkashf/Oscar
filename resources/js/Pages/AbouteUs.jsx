import React from 'react';
import Layout from "./Layout";
import { Helmet } from 'react-helmet-async';
import {
    UserGroupIcon,
    LightBulbIcon,
    HomeModernIcon,
    MapPinIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation();

    const services = [
        {
            title: t("التسويق العقاري"),
            desc: t("نعرض العقارات بطريقة احترافية تجذب المشترين والمستأجرين المستهدفين."),
            icon: <HomeModernIcon className="w-8 h-8 text-primary" />,
        },
        {
            title: t("تسهيل البيع والشراء"),
            desc: t("دعم واستشارات شاملة في كل مرحلة من مراحل الصفقة لضمان أفضل قرار."),
            icon: <ShieldCheckIcon className="w-8 h-8 text-primary" />,
        },
        {
            title: t("تأجير العقارات"),
            desc: t("خيارات متنوعة للسكن أو الاستخدام التجاري في أرقى مناطق وسط البلد."),
            icon: <MapPinIcon className="w-8 h-8 text-primary" />,
        }
    ];

    // بيانات SEO
    const seoData = {
        title: t("شركة أوسكار للتسويق العقاري - شريكك الموثوق في القاهرة"),
        description: t("اكتشف شركة أوسكار الرائدة في التسويق العقاري بالقاهرة. نقدم خدمات بيع وشراء وإيجار عقارات احترافية في أفضل مناطق مصر."),
        keywords: t("شركة عقارية مصر, تسويق عقاري القاهرة, بيع عقارات, شراء عقارات, إيجار عقارات, شركة أوسكار العقارية, عقارات وسط البلد, خدمات عقارية مصر"),
        canonical: "https://oscar-realestate.com/about-us",
        ogTitle: t("شركة أوسكار للتسويق العقاري"),
        ogDescription: t("نحن شريكك الموثوق في قلب القاهرة، نقدم خدمات عقارية احترافية وشفافة تلبي طموحاتك في البيع والشراء والإيجار."),
        ogImage: "https://oscar-realestate.com/images/og-about-us.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("شركة أوسكار للتسويق العقاري - شريكك الموثوق في القاهرة"),
        twitterDescription: t("اكتشف شركة أوسكار الرائدة في التسويق العقاري بالقاهرة. خدمات عقارية احترافية في أفضل مناطق مصر."),
        twitterImage: "https://oscar-realestate.com/images/twitter-about-us.jpg",
    };

    // Schema.org structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": t("شركة أوسكار للتسويق العقاري"),
        "description": t("شركة رائدة في مجال التسويق العقاري في القاهرة، مصر. نقدم خدمات بيع وشراء وإيجار العقارات في أفضل المناطق."),
        "url": "https://oscar-realestate.com",
        "telephone": "+20123456789",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": t("33 شارع قصر النيل - حي عابدين - وسط البلد"),
            "addressLocality": "Cairo",
            "addressRegion": "Cairo",
            "addressCountry": "EG"
        },
        "areaServed": ["Cairo", "Giza", "Alexandria"],
        "openingHours": "Mo-Fr 09:00-17:00",
        "priceRange": "$$",
        "image": "https://oscar-realestate.com/images/logo.png",
        "sameAs": [
            "https://facebook.com/oscarrealestate",
            "https://twitter.com/oscarrealestate",
            "https://instagram.com/oscarrealestate"
        ]
    };

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
                <meta property="og:site_name" content="أوسكار للتسويق العقارى" />

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
                <meta name="author" content="أوسكار للتسويق العقاري" />
                <meta name="language" content="Arabic" />
                <meta name="geo.region" content="EG-CA" />
                <meta name="geo.placename" content="Cairo" />
                <meta name="geo.position" content="30.0444;31.2357" />
                <meta name="ICBM" content="30.0444, 31.2357" />
            </Helmet>

            <Layout>
                <div className="min-h-screen font-['Cairo'] transition-colors duration-300 bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-main">

                    {/* Hero Section with Breadcrumb */}
                    <section className="relative py-20 overflow-hidden bg-white dark:bg-background-card border-b border-gray-200 dark:border-background-border">
                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            {/* Breadcrumb */}

                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                                    {t("شركة")} <span className="text-primary">{t("أوسكار")}</span> {t("للتسويق والتقييم العقاري")}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-text-muted max-w-3xl mx-auto leading-relaxed">
                                    {t("نحن شريكك الموثوق في قلب القاهرة، خبره اكثر من 30 عاما نقدم خدمات عقارية احترافية وشفافة تلبي طموحاتك في البيع والشراء والإيجار.")}
                                </p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                    </section>

                    <div className="max-w-7xl mx-auto px-6 py-16">
                        {/* Vision & Mission Section */}
                        <div className="grid md:grid-cols-2 gap-12 mb-20">
                            <div className="p-8 rounded-2xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border shadow-sm">
                                <LightBulbIcon className="w-12 h-12 text-primary mb-4" />
                                <h2 className="text-2xl font-bold mb-4 text-primary-dark">
                                    {t("رؤيتنا وهدفنا")}
                                </h2>
                                <p className="text-gray-600 dark:text-text-muted leading-loose">
                                    {t("تهدف أوسكار إلى تقديم خدمات عقارية بشكل احترافي وشفاف تماماً، هدفنا الأسمى هو كسب رضا العملاء وتسهيل تعاملاتهم المعقدة في السوق العقاري المصري.")}
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border shadow-sm">
                                <UserGroupIcon className="w-12 h-12 text-primary mb-4" />
                                <h2 className="text-2xl font-bold mb-4 text-primary-dark">
                                    {t("خبراء العقارات")}
                                </h2>
                                <p className="text-gray-600 dark:text-text-muted leading-loose">
                                    {t("نضم فريقاً متخصصاً من خبراء العقارات الذين يقدمون مشورة دقيقة تناسب احتياجاتك الخاصة، مما يساعدك على اتخاذ القرار الصحيح في الوقت المناسب.")}
                                </p>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-2">
                                {t("خدماتنا المتميزة")}
                            </h2>
                            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                                {t("نقدم مجموعة شاملة من الخدمات العقارية التي تغطي جميع احتياجاتك من البيع والشراء إلى الإيجار والإدارة.")}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="group p-8 rounded-2xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section with Schema */}
                        <div className="mt-20 p-8 rounded-3xl flex bg-primary/5 border border-primary/20   items-center justify-between">
                            <div className="mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold mb-2 text-primary">
                                    {t("أين تجدنا؟")}
                                </h3>
                                <div className="flex items-center text-gray-700 dark:text-text-main">
                                    <MapPinIcon className="w-5 h-5 ml-2 text-primary" />
                                    <span>{t("مقر الشركه الرئيسي 33 شارع قصر النيل - حي عابدين - وسط البلد")}</span>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/contact-us"
                                        className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                                    >
                                        {t("تواصل معنا الآن")}
                                    </Link>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </Layout>
        </>
    );
}
