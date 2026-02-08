import React from 'react';
import Layout from "./Layout";
import { Helmet } from 'react-helmet-async';
import {
    BuildingOffice2Icon,
    ShieldCheckIcon,
    HeartIcon,
    DocumentMagnifyingGlassIcon,
    MapPinIcon,
    PhoneIcon,
    PresentationChartLineIcon
} from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function HospitalsForSale() {
    const { t } = useTranslation();


    const seoData = {
        title: t("مستشفيات للبيع والتقييم العقاري الطبي | شركة أوسكار العقارية"),
        description: t("شركة أوسكار المتخصصة في تسويق وتقييم المستشفيات والمنشآت الطبية بالقاهرة. نوفر حلولاً عقارية دقيقة للأطباء والمستثمرين مع ضمان الخصوصية والاحترافية."),
        keywords: t("مستشفيات للبيع، عقارات طبية، تقييم منشآت طبية، شراء مستشفى في مصر، تسويق عقاري طبي، أوسكار للعقارات الطبية، استثمار طبي القاهرة"),
        canonical: "https://oscar-realestate.com/hospitals-for-sale",
        ogTitle: t("مستشفيات للبيع في مصر - شريك الأطباء الموثوق | أوسكار"),
        ogDescription: t("نحن في أوسكار نبني علاقات قائمة على الوضوح والشفافية لضمان نجاح مشروعك الطبي. اكتشف خدماتنا في بيع وتقييم المستشفيات."),
        ogImage: "https://oscar-realestate.com/images/medical-realestate-og.jpg",
    };


    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Medical Real Estate Consulting",
        "provider": {
            "@type": "RealEstateAgent",
            "name": t("شركة أوسكار للتسويق والتقييم العقاري"),
            "url": "https://oscar-realestate.com"
        },
        "areaServed": "EG",
        "description": t("تقديم حلول عقارية دقيقة للأطباء والمستثمرين في القطاع الطبي تشمل بيع وشراء وتقييم المستشفيات.")
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />
                <meta property="og:title" content={seoData.ogTitle} />
                <meta property="og:description" content={seoData.ogDescription} />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={seoData.ogImage} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <Layout>
                <div className="min-h-screen font-['Cairo'] bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-main transition-colors duration-300">

                    {/* --- Hero Section --- */}
                    <section className="relative py-24 overflow-hidden bg-white dark:bg-background-card border-b border-gray-100 dark:border-background-border">
                        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                            <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-primary/10 text-primary rounded-full mb-8 animate-fade-in">
                                <HeartIcon className="w-5 h-5" />
                                <span className="text-sm font-bold">{t("القطاع الطبي العقاري")}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                                {t("مستشفيات")} <span className="text-primary">{t("للبيع")}</span> {t("وتقييم عقارى متخصص")}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-text-muted max-w-3xl mx-auto leading-relaxed">
                                {t("نحن شريكك الموثوق الذي يفهم احتياجاتك الطبية، نوفر لك الأمان والخصوصية في كافة تعاملاتك العقارية داخل السوق الطبي المصري.")}
                            </p>
                        </div>

                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                    </section>

                    <div className="max-w-7xl mx-auto px-6 py-20">

                        {/* --- Main Content: Our Story & Vision --- */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                            <div className="order-2 lg:order-1">
                                <div className="space-y-8">
                                    <div className="bg-white dark:bg-background-card p-2 rounded-2xl shadow-xl inline-block border border-gray-100 dark:border-background-border">
                                        <div className="p-4 bg-primary rounded-xl text-white">
                                            <BuildingOffice2Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-snug">
                                        {t("عن أوسكار للتسويق العقاري في القطاع الطبي")}
                                    </h2>
                                    <div className="space-y-6 text-gray-600 dark:text-text-muted text-lg leading-loose">
                                        <p>
                                            {t("شركة أوسكار للتسويق والتقييم العقاري بنت اسمها على أساس الثقة والمصداقية، ونجحت في أن تكون شريكًا موثوقًا لعدد كبير من الأطباء والمستثمرين في القطاع الطبي.")}
                                        </p>
                                        <p>
                                            {t("ثقة عملائنا لم تأتِ من فراغ، بل كانت نتيجة التزام حقيقي بفهم احتياجات المجال الطبي وتقديم حلول عقارية دقيقة تناسب طبيعة كل نشاط.")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 relative">
                                <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] rotate-2"></div>
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                                        alt="Modern Medical Center"
                                        className="w-full h-[450px] object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- Features Grid: Values --- */}
                        <div className="grid md:grid-cols-3 gap-8 mb-32">
                            <div className="p-10 rounded-[2rem] bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:border-primary transition-all shadow-sm">
                                <ShieldCheckIcon className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">{t("الخصوصية والاحترافية")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("نحرص في أوسكار على التعامل مع كل ملف بمنتهى الخصوصية والاحترافية، بداية من اختيار الموقع المناسب وحتى إتمام العمليات بسلاسة وأمان.")}
                                </p>
                            </div>

                            <div className="p-10 rounded-[2rem] bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:border-primary transition-all shadow-sm">
                                <DocumentMagnifyingGlassIcon className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">{t("تقييم عقاري عادل")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("نقوم بتقييم العقار بشكل عادل تماماً، هذا النهج جعلنا محل ثقة الأطباء الذين يعتمدون علينا في قراراتهم الاستثمارية والمهنية.")}
                                </p>
                            </div>

                            <div className="p-10 rounded-[2rem] bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:border-primary transition-all shadow-sm">
                                <PresentationChartLineIcon className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">{t("حلول عقارية دقيقة")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("نقدم حلولاً تناسب طبيعة كل نشاط طبي، ونعتبر نجاح الطبيب واستقرار مشروعه الطبي جزءًا لا يتجزأ من نجاحنا الشخصي.")}
                                </p>
                            </div>
                        </div>

                        {/* --- CTA / Closing Section --- */}
                        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center lg:text-right">
                            <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
                                <div className="lg:col-span-2 space-y-6">
                                    <h2 className="text-3xl font-extrabold text-primary">
                                        {t("أوسكار العقارية.. الاسم المرتبط بالثقة والخبرة")}
                                    </h2>
                                    <p className="text-lg text-gray-700 dark:text-text-main leading-relaxed">
                                        {t("نعمل دائمًا على بناء علاقات طويلة الأمد مع عملائنا، قائمة على الوضوح والشفافية. لقد أصبحنا اسماً يرتبط بالالتزام داخل السوق العقاري الطبي المصري.")}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link
                                        href="/contact-us"
                                        className="inline-block px-12 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/25 hover:-translate-y-1"
                                    >
                                        {t("تواصل معنا الآن")}
                                    </Link>
                                </div>
                            </div>

                            <BuildingOffice2Icon className="absolute left-[-50px] bottom-[-50px] w-80 h-80 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
}
