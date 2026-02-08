import React from 'react';
import Layout from "./Layout";
import { Helmet } from 'react-helmet-async';
import {
    AcademicCapIcon,
    BookOpenIcon,
    BuildingLibraryIcon,
    CheckBadgeIcon,
    MapIcon,
    BriefcaseIcon,
    ScaleIcon
} from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function SchoolsForSale() {
    const { t } = useTranslation();

    // بيانات SEO المتخصصة بالقطاع التعليمي
    const seoData = {
        title: t("مدارس للبيع وتقييم عقاري تعليمي | شركة أوسكار العقارية"),
        description: t("شركة أوسكار متخصصة في بيع وشراء وتأجير المدارس والمنشآت التعليمية. تقييم عقاري تعليمي احترافي وحلول عقارية مدروسة للمستثمرين والمعلمين بالقاهرة."),
        keywords: t("مدارس للبيع، شراء مدرسة، تقييم مدارس، منشآت تعليمية للبيع، استثمار تعليمي مصر، أوسكار للتسويق العقاري، مدرسة دولية للبيع"),
        canonical: "https://oscar-realestate.com/schools-for-sale",
        ogTitle: t("مدارس للبيع - حلول عقارية للمنشآت التعليمية | أوسكار"),
        ogDescription: t("شريكك الموثوق في نجاح واستقرار مشروعك التعليمي. خبرة دقيقة في تقييم وتسويق المدارس بجميع أنواعها."),
        ogImage: "https://oscar-realestate.com/images/schools-realestate-og.jpg",
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Educational Real Estate Consulting",
        "provider": {
            "@type": "RealEstateAgent",
            "name": t("شركة أوسكار للتسويق والتقييم العقاري")
        },
        "description": t("حلول احترافية لبيع وشراء وتأجير المدارس بجميع أنواعها مع خبرة دقيقة في التقييم واختيار المواقع.")
    };

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />
                <meta property="og:title" content={seoData.ogTitle} />
                <meta property="og:description" content={seoData.ogDescription} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <Layout>
                <div className="min-h-screen font-['Cairo'] bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-main transition-colors duration-300">

                    {/* --- Hero Section --- */}
                    <section className="relative py-24 overflow-hidden bg-white dark:bg-background-card border-b border-gray-100 dark:border-background-border">
                        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                            <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-primary/10 text-primary rounded-full mb-8">
                                <AcademicCapIcon className="w-5 h-5" />
                                <span className="text-sm font-bold">{t("الوساطة العقارية التعليمية")}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                                {t("مدارس للبيع ")}
                                <span className="text-primary">{t("وتقييم عقاري تعليمي")}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-text-muted max-w-4xl mx-auto leading-relaxed italic">
                                "{t("كل عقار تعليمي لا يتم التعامل معه كمبنى فقط، بل كمشروع تعليمي متكامل له رسالة واستمرارية")}"
                            </p>
                        </div>
                        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                    </section>

                    <div className="max-w-7xl mx-auto px-6 py-20">

                        {/* --- Story & Trust Section --- */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] -rotate-2"></div>
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="/10.png"
                                        alt="Educational Institution"
                                        className="w-full h-[500px] object-cover"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8 order-1 lg:order-2">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                                    {t("لماذا يثق المعلمون وأصحاب المدارس في أوسكار؟")}
                                </h2>
                                <div className="space-y-6 text-gray-600 dark:text-text-muted text-lg leading-loose text-justify">
                                    <p>
                                        {t("شركة أوسكار للتسويق والتقييم العقاري هي واحدة من الأسماء الرائدة في مجال الوساطة العقارية المتخصصة في المنشآت التعليمية، حيث تقدم حلولًا احترافية لبيع وشراء وتأجير المدارس بجميع أنواعها.")}
                                    </p>
                                    <p>
                                        {t("استطاعت أوسكار أن تكسب ثقة المعلمين، أصحاب المدارس، والمستثمرين بفضل فهمها العميق لطبيعة العملية التعليمية ومتطلباتها الخاصة، مراعيةً الاشتراطات التعليمية والقانونية لكل نوع تعليم سواء كان دوليًا، لغات، أو خاصًا.")}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <CheckBadgeIcon className="w-6 h-6" />
                                        <span>{t("شفافية مطلقة")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <CheckBadgeIcon className="w-6 h-6" />
                                        <span>{t("خبرة قانونية")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Services/Values Grid --- */}
                        <div className="grid md:grid-cols-3 gap-8 mb-32">
                            <div className="p-10 rounded-3xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:shadow-xl transition-all group">
                                <ScaleIcon className="w-12 h-12 text-primary mb-6 group-hover:rotate-12 transition-transform" />
                                <h3 className="text-xl font-bold mb-4">{t("تقييم تعليمي دقيق")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("تعتمد الشركة على خبرة دقيقة في تقييم المدارس مع مراعاة الرسالة التعليمية والجدوى الاستثمارية للمشروع.")}
                                </p>
                            </div>

                            <div className="p-10 rounded-3xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:shadow-xl transition-all group">
                                <MapIcon className="w-12 h-12 text-primary mb-6 group-hover:rotate-12 transition-transform" />
                                <h3 className="text-xl font-bold mb-4">{t("اختيار المواقع")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("نساعدك في اختيار الموقع الأنسب الذي يضمن بيئة تعليمية مستقرة ويساعد المعلمين على أداء رسالتهم.")}
                                </p>
                            </div>

                            <div className="p-10 rounded-3xl bg-white dark:bg-background-card border border-gray-100 dark:border-background-border hover:shadow-xl transition-all group">
                                <BriefcaseIcon className="w-12 h-12 text-primary mb-6 group-hover:rotate-12 transition-transform" />
                                <h3 className="text-xl font-bold mb-4">{t("شريك في النجاح")}</h3>
                                <p className="text-gray-500 dark:text-text-muted leading-relaxed">
                                    {t("نعتبر أنفسنا شريكًا في استقرار المشروعات التعليمية، من التقييم والتسويق وحتى إتمام التعاقدات بكل دقة.")}
                                </p>
                            </div>
                        </div>

                        {/* --- Brand Mission Section --- */}
                        <div className="relative p-1 rounded-[3rem] bg-gradient-to-r from-primary/20 to-transparent">
                            <div className="bg-white dark:bg-background-card rounded-[2.9rem] p-12 md:p-20 shadow-sm border border-gray-100 dark:border-background-border">
                                <div className="max-w-3xl mx-auto text-center space-y-8">
                                    <BookOpenIcon className="w-16 h-16 text-primary mx-auto opacity-50" />
                                    <h2 className="text-3xl font-bold">{t("رسالتنا تجاه قطاع التعليم")}</h2>
                                    <p className="text-xl text-gray-600 dark:text-text-muted leading-loose">
                                        {t("تسعى أوسكار لترسيخ مكانتها كخيار أول لكل من يبحث عن احترافية حقيقية في سوق العقارات التعليمية، وبناء علاقات طويلة الأمد تقوم على الثقة والاحترام المتبادل.")}
                                    </p>
                                    <div className="pt-6">
                                        <Link
                                            href="/contact-us"
                                            className="px-10 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 inline-block"
                                        >
                                            {t("ابدأ استثمارك التعليمي الآن")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
}
