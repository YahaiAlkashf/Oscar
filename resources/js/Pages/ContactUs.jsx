import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    PaperAirplaneIcon,
    ChatBubbleLeftEllipsisIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Layout from "./Layout";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
    const { t, i18n } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [contactInfo, setContactInfo] = useState({});
    const [outlets, setOutlets] = useState([]);
    const [contactLoading, setContactLoading] = useState(true);
    const [activeOutletIndex, setActiveOutletIndex] = useState(0);

    const language = i18n.language || 'ar';

    const seoData = {
        title: t("تواصل معنا - أوسكار العقارية | خدمة العملاء والدعم"),
        description: t(
            "تواصل مع فريق أوسكار العقارية للاستفسارات والعروض. اتصل بنا عبر الهاتف أو البريد الإلكتروني أو قم بزيارة مقرنا في القاهرة.",
        ),
        keywords: t(
            "اتصال عقاري مصر, تواصل مع شركة عقارية, استفسارات عقارية, دعم عملاء عقاري, مقر أوسكار العقارية, أرقام هواتف عقارية, استشارات عقارية مجانية",
        ),
        canonical: "https://oscar-realestate.com/contact-us",
        ogTitle: t("تواصل مع أوسكار العقارية - فريق دعم العملاء"),
        ogDescription: t(
            "سواء كنت تبحث عن منزل أحلامك أو تريد استشارة استثمارية، فريقنا المتخصص جاهز للرد على جميع استفساراتك.",
        ),
        ogImage: "https://oscar-realestate.com/images/og-contact-us.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: t("تواصل مع أوسكار العقارية - خدمة العملاء 24/7"),
        twitterDescription: t(
            "اتصل بنا للحصول على استشارات عقارية مجانية ومساعدة في البحث عن العقار المناسب لك.",
        ),
        twitterImage:
            "https://oscar-realestate.com/images/twitter-contact-us.jpg",
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    const fetchContactData = async () => {
        setContactLoading(true);
        try {
            const [contactRes, outletsRes] = await Promise.all([
                axios.get("/contact-information"),
                axios.get("/outlets")
            ]);

            if (contactRes.data && contactRes.data.length > 0) {
                setContactInfo(contactRes.data[0]);
            } else {
                setContactInfo({});
            }

            const outletsData = outletsRes.data || [];
            setOutlets(outletsData);

            if (outletsData.length > 0) {
                setActiveOutletIndex(0);
            }
        } catch (error) {
            console.error("Error fetching contact data:", error);
        } finally {
            setContactLoading(false);
        }
    };

    const handleSendForm = async (e) => {
        e.preventDefault();
        setErrors({});
        setErrorMessage("");
        setIsSuccess(false);

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = t("الاسم مطلوب");
        if (!form.email.trim()) newErrors.email = t("البريد الإلكتروني مطلوب");
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = t("البريد الإلكتروني غير صالح");
        if (!form.phone.trim()) newErrors.phone = t("رقم الهاتف مطلوب");
        if (!form.message.trim()) newErrors.message = t("الرسالة مطلوبة");

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("/contact", {
                ...form,
                phone_number: form.phone,
            });

            if (response.data.success || response.status === 200) {
                setIsSuccess(true);

                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Error sending form:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(
                    t("حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى."),
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const formatPhoneDisplay = (phone) => {
        if (!phone) return "";

        if (phone.startsWith('0')) {
            return '+20' + phone.substring(1);
        }

        if (!phone.startsWith('+')) {
            return '+' + phone;
        }
        return phone;
    };

    const getActiveOutlet = () => {
        if (outlets.length === 0) return null;
        return outlets[activeOutletIndex];
    };

    const getOutletAddress = (outlet) => {
        if (!outlet) return t("33 شارع قصر النيل – وسط البلد – القاهرة.");

        return language === 'en' && outlet.name_en
            ? outlet.name_en
            : outlet.name;
    };

    const getLocationUrl = (outlet) => {
        if (!outlet) {
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.579830691761!2d31.24549842576671!3d30.04890991836155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840bee367eba7%3A0xb16b90355343ecce!2z2aPZoyDYtNin2LHYuSDZgti12LEg2KfZhNmG2YrZhNiMINin2YTZgdmI2KfZhNip2Iwg2LnYp9io2K_ZitmG2Iwg2YXYrdin2YHYuNipINin2YTZgtin2YfYsdip4oCsIDQyODAxNDM!5e0!3m2!1sar!2seg!4v1770208608599!5m2!1sar!2seg";
        }

        return outlet.location_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.579830691761!2d31.24549842576671!3d30.04890991836155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840bee367eba7%3A0xb16b90355343ecce!2z2aPZoyDYtNin2LHYuSDZgti12LEg2KfZhNmG2YrZhNiMINin2YTZgdmI2KfZhNip2Iwg2LnYp9io2K_ZitmG2Iwg2YXYrdin2YHYuNipINin2YTZgtin2YfYsdip4oCsIDQyODAxNDM!5e0!3m2!1sar!2seg!4v1770208608599!5m2!1sar!2seg";
    };

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={seoData.keywords} />
                <link rel="canonical" href={seoData.canonical} />
                <meta property="og:title" content={seoData.ogTitle} />
                <meta
                    property="og:description"
                    content={seoData.ogDescription}
                />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={seoData.ogImage} />
                <meta property="og:locale" content="ar_EG" />
                <meta property="og:site_name" content="أوسكار العقارية" />
                <meta name="twitter:card" content={seoData.twitterCard} />
                <meta name="twitter:title" content={seoData.twitterTitle} />
                <meta
                    name="twitter:description"
                    content={seoData.twitterDescription}
                />
                <meta name="twitter:image" content={seoData.twitterImage} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        name: t("تواصل مع أوسكار العقارية"),
                        description: t(
                            "صفحة التواصل مع فريق أوسكار العقارية للاستفسارات والاستشارات العقارية",
                        ),
                        url: "https://oscar-realestate.com/contact-us",
                        mainEntity: {
                            "@type": "Organization",
                            name: t("شركة أوسكار للتسويق العقاري"),
                            contactPoint: [
                                {
                                    "@type": "ContactPoint",
                                    telephone: contactInfo.phone_number ? formatPhoneDisplay(contactInfo.phone_number) : "+20123456789",
                                    contactType: "customer service",
                                    availableLanguage: ["Arabic", "English"],
                                    hoursAvailable: {
                                        "@type": "OpeningHoursSpecification",
                                        dayOfWeek: [
                                            "Monday",
                                            "Tuesday",
                                            "Wednesday",
                                            "Thursday",
                                            "Friday",
                                        ],
                                        opens: "09:00",
                                        closes: "21:00",
                                    },
                                },
                                {
                                    "@type": "ContactPoint",
                                    email: contactInfo.email || "info@oscar-realestate.com",
                                    contactType: "customer service",
                                    availableLanguage: ["Arabic", "English"],
                                },
                            ],
                            address: outlets.length > 0 ? outlets.map(outlet => ({
                                "@type": "PostalAddress",
                                name: language === 'en' && outlet.name_en ? outlet.name_en : outlet.name,
                                addressLocality: outlet.city || "Cairo",
                                addressRegion: outlet.region || "Cairo",
                                addressCountry: outlet.country || "EG",
                            })) : [{
                                "@type": "PostalAddress",
                                streetAddress: t("33 شارع قصر النيل – وسط البلد – القاهرة."),
                                addressLocality: "Cairo",
                                addressRegion: "Cairo",
                                addressCountry: "EG",
                                postalCode: "11835",
                            }],
                        },
                    })}
                </script>
                <meta name="robots" content="index, follow" />
                <meta name="author" content="أوسكار العقارية" />
                <meta name="language" content="Arabic" />
                <meta name="geo.region" content="EG-CA" />
                <meta name="geo.placename" content="Cairo" />
                <meta name="geo.position" content="30.0199;31.4617" />
                <meta name="ICBM" content="30.0199, 31.4617" />
            </Helmet>

            <Layout>
                <div className="bg-white dark:bg-[#080808] min-h-screen py-20 px-4 transition-colors duration-500">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                                {t("نحن هنا")}{" "}
                                <span className="text-[#A86B06]">
                                    {t("لمساعدتك")}
                                </span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                                {t(
                                    "سواء كنت تبحث عن منزل أحلامك أو تريد استشارة استثمارية، فريقنا المتخصص جاهز للرد على جميع استفساراتك.",
                                )}
                            </p>
                        </div>

                        {isSuccess && (
                            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-fadeIn">
                                <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                <div className="text-right flex-1">
                                    <p className="text-green-800 dark:text-green-300 font-bold">
                                        {t("تم الإرسال بنجاح!")}
                                    </p>
                                    <p className="text-green-600 dark:text-green-400 text-sm">
                                        {t(
                                            "سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك معنا.",
                                        )}
                                    </p>
                                </div>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 animate-fadeIn">
                                <ExclamationCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                                <div className="text-right flex-1">
                                    <p className="text-red-800 dark:text-red-300 font-bold">
                                        {errorMessage}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div
                            className="grid lg:grid-cols-3 gap-8 items-start"
                            dir="ltr"
                        >
                            <div className="lg:col-span-2 bg-gray-50 dark:bg-[#111111] p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-[#1A1A1A] shadow-sm order-1 lg:order-2">
                                <div className="flex items-center gap-3 mb-8 justify-end">
                                    <div className="text-right">
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {t("أرسل رسالة مباشرة")}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {t("سنتواصل معك في أقرب وقت ممكن")}
                                        </p>
                                    </div>
                                    <div className="bg-[#A86B06]/10 p-3 rounded-2xl">
                                        <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-[#A86B06]" />
                                    </div>
                                </div>

                                <form
                                    className="space-y-5"
                                    dir="rtl"
                                    onSubmit={handleSendForm}
                                >
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400 mr-2">
                                                {t("الاسم بالكامل *")}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={t(
                                                    "مثال: محمد أحمد",
                                                )}
                                                className={`w-full bg-white dark:bg-[#1A1A1A] border ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#A86B06] outline-none dark:text-white transition-all`}
                                                value={form.name}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1 mr-2">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400 mr-2">
                                                {t("البريد الإلكتروني *")}
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="email@example.com"
                                                className={`w-full bg-white dark:bg-[#1A1A1A] border ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#A86B06] outline-none dark:text-white transition-all`}
                                                value={form.email}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1 mr-2">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-600 dark:text-gray-400 mr-2">
                                            {t("رقم الهاتف *")}
                                        </label>
                                        <div className="relative" dir="ltr">
                                            <PhoneInput
                                                country={"eg"}
                                                value={form.phone}
                                                onChange={(value) =>
                                                    handleChange("phone", value)
                                                }
                                                inputStyle={{
                                                    width: "100%",
                                                    height: "50px",
                                                    fontSize: "14px",
                                                    backgroundColor: isDark
                                                        ? "#1A1A1A"
                                                        : "white",
                                                    border: errors.phone
                                                        ? "1px solid #ef4444"
                                                        : isDark
                                                          ? "1px solid #2A2A2A"
                                                          : "1px solid #E5E7EB",
                                                    borderRadius: "12px",
                                                    color: isDark
                                                        ? "white"
                                                        : "black",
                                                    textAlign: "left",
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: isDark
                                                        ? "#1A1A1A"
                                                        : "white",
                                                    border: errors.phone
                                                        ? "1px solid #ef4444"
                                                        : isDark
                                                          ? "1px solid #2A2A2A"
                                                          : "1px solid #E5E7EB",
                                                    borderRadius:
                                                        "12px 0 0 12px",
                                                }}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p
                                                className="text-red-500 text-xs mt-1 mr-2 text-right"
                                                dir="rtl"
                                            >
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-600 dark:text-gray-400 mr-2">
                                            {t("محتوى الرسالة *")}
                                        </label>
                                        <textarea
                                            rows="4"
                                            placeholder={t(
                                                "كيف يمكننا مساعدتك؟",
                                            )}
                                            className={`w-full bg-white dark:bg-[#1A1A1A] border ${errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#A86B06] outline-none dark:text-white resize-none transition-all`}
                                            value={form.message}
                                            onChange={(e) =>
                                                handleChange(
                                                    "message",
                                                    e.target.value,
                                                )
                                            }
                                        ></textarea>
                                        {errors.message && (
                                            <p className="text-red-500 text-xs mt-1 mr-2">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full flex items-center justify-center gap-3 ${isLoading ? "bg-[#A86B06]/70" : "bg-[#A86B06] hover:bg-[#8e5a05]"} text-white py-4 rounded-xl text-lg font-black transition-all shadow-lg hover:shadow-[#A86B06]/20 group disabled:cursor-not-allowed`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span>
                                                    {t("جاري الإرسال...")}
                                                </span>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {t("إرسال الرسالة الآن")}
                                                </span>
                                                <PaperAirplaneIcon className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                                <ContactInfoCard
                                    icon={<PhoneIcon className="w-6 h-6" />}
                                    title={t("اتصل بنا")}
                                    loading={contactLoading}
                                    detail={contactInfo.phone_number ? formatPhoneDisplay(contactInfo.phone_number) : "+201274949135"}
                                />
                                <ContactInfoCard
                                    icon={<EnvelopeIcon className="w-6 h-6" />}
                                    title={t("البريد الإلكتروني")}
                                    loading={contactLoading}
                                    detail={contactInfo.email || "info@oscar-realestate.com"}
                                />

                                {/* Display All Outlets */}
                                {contactLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-[#1A1A1A] animate-pulse">
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : outlets.length > 0 ? (
                                    <div className="space-y-4">
                                        {outlets.map((outlet, index) => (
                                            <OutletCard
                                                key={outlet.id || index}
                                                outlet={outlet}
                                                language={language}
                                                isActive={activeOutletIndex === index}
                                                onClick={() => setActiveOutletIndex(index)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <ContactInfoCard
                                        icon={<MapPinIcon className="w-6 h-6" />}
                                        title={t("عنوان")}
                                        detail={t("33 شارع قصر النيل – وسط البلد – القاهرة.")}
                                    />
                                )}

                                {contactInfo.wathsApp_number && (
                                    <ContactInfoCard
                                        icon={
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                                            </svg>
                                        }
                                        title={t("واتساب")}
                                        loading={contactLoading}
                                        detail={contactInfo.wathsApp_number ? formatPhoneDisplay(contactInfo.wathsApp_number) : ""}
                                        isWhatsApp={true}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Maps Section - Show all outlet maps */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                {t("مواقع فروعنا على الخريطة")}
                            </h3>

                            {contactLoading ? (
                                <div className="space-y-8">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
                                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : outlets.length > 0 ? (
                                <div className="space-y-12">
                                    {outlets.map((outlet, index) => (
                                        <div key={outlet.id || index} className="space-y-4">
                                            <h4 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                                                {language === 'en' && outlet.name_en ? outlet.name_en : outlet.name}
                                            </h4>
                                            <div className="rounded-lg overflow-hidden shadow-lg">
                                                <iframe
                                                    src={getLocationUrl(outlet)}
                                                    width="600"
                                                    height="450"
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    className="w-full"
                                                    title={`OSCAR Real Estate - ${language === 'en' && outlet.name_en ? outlet.name_en : outlet.name}`}
                                                ></iframe>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                                        {t("المقر الرئيسي")}
                                    </h4>
                                    <div className="rounded-lg overflow-hidden shadow-lg">
                                        <iframe
                                            src={getLocationUrl(null)}
                                            width="600"
                                            height="450"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full"
                                            title="OSCAR Real Estate Main Location"
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

const ContactInfoCard = ({ icon, title, detail, loading = false, isWhatsApp = false }) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-[#1A1A1A] flex items-center gap-5 text-right flex-row-reverse">
                <div className="bg-gray-50 dark:bg-[#080808] p-4 rounded-2xl text-[#A86B06]">
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                </div>
            </div>
        );
    }

    const content = isWhatsApp ? (
        <a
            href={`https://wa.me/${detail}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white font-bold text-lg hover:text-[#25D366] transition-colors"
        >
            {detail}
        </a>
    ) : (
        <p className="text-gray-900 dark:text-white font-bold text-lg">
            {detail}
        </p>
    );

    return (
        <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-[#1A1A1A] flex items-center gap-5 text-right flex-row-reverse hover:border-[#A86B06] transition-colors group">
            <div className={`bg-gray-50 dark:bg-[#080808] p-4 rounded-2xl ${isWhatsApp ? 'text-[#25D366] group-hover:bg-[#25D366]' : 'text-[#A86B06] group-hover:bg-[#A86B06]'} group-hover:text-white transition-all`}>
                {icon}
            </div>
            <div>
                <h4 className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">
                    {title}
                </h4>
                {content}
            </div>
        </div>
    );
};

const OutletCard = ({ outlet, language, isActive, onClick }) => {
    const getOutletName = () => {
        return language === 'en' && outlet.name_en
            ? outlet.name_en
            : outlet.name;
    };

    return (
        <div
            className={`bg-white dark:bg-[#111111] p-6 rounded-3xl border ${isActive ? 'border-[#A86B06]' : 'border-gray-100 dark:border-[#1A1A1A]'} flex items-center gap-5 text-right flex-row-reverse hover:border-[#A86B06] transition-colors group cursor-pointer`}
            onClick={onClick}
        >
            <div className={`bg-gray-50 dark:bg-[#080808] p-4 rounded-2xl ${isActive ? 'bg-[#A86B06] text-white' : 'text-[#A86B06]'} group-hover:bg-[#A86B06] group-hover:text-white transition-all`}>
                <MapPinIcon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">
                    {outlet.type === 'headquarter' ? 'المقر الرئيسي' : outlet.type === 'branch' ? 'فرع' : 'عنوان'}
                </h4>
                <p className="text-gray-900 dark:text-white font-bold text-lg">
                    {getOutletName()}
                </p>
                {outlet.city && (
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {outlet.city}
                        {outlet.region && `، ${outlet.region}`}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ContactUs;
