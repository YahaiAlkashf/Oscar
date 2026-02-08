import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const [contactInfo, setContactInfo] = useState({});
    const [outlets, setOutlets] = useState([]);
    const [contactLoading, setContactLoading] = useState(true);

    const language = i18n.language || 'ar';

    useEffect(() => {
        const checkTheme = () => {
            const isDarkTheme =
                document.documentElement.classList.contains("dark");
            setIsDark(isDarkTheme);
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

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

            setOutlets(outletsRes.data || []);
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("/contact", {
                ...form,
                phone_number: form.phone,
                source: "footer",
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
        if (errorMessage) {
            setErrorMessage("");
        }
    };

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

    const getOutletName = (outlet) => {
        return language === 'en' && outlet.name_en
            ? outlet.name_en
            : outlet.name;
    };

    const getOutletTypeLabel = (type) => {
        switch(type) {
            case 'headquarter':
                return t('المقر الرئيسي');
            case 'branch':
                return t('فرع');
            case 'office':
                return t('مكتب');
            case 'showroom':
                return t('معرض');
            default:
                return t('عنوان');
        }
    };

    return (
        <footer className="bg-gray-50 dark:bg-[#080808] border-t border-gray-200 dark:border-[#1A1A1A] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-right">
                {isSuccess && (
                    <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 animate-fadeIn">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div className="text-right flex-1">
                            <p className="text-green-800 dark:text-green-300 text-sm font-bold">
                                {t("تم الإرسال بنجاح!")}
                            </p>
                            <p className="text-green-600 dark:text-green-400 text-xs">
                                {t("سنتواصل معك قريباً. شكراً لتواصلك معنا.")}
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 animate-fadeIn">
                        <ExclamationCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <div className="text-right flex-1">
                            <p className="text-red-800 dark:text-red-300 text-sm font-bold">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <img
                            src="/5.png"
                            className="h-16 w-auto mr-0 ml-auto object-contain"
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
                            {t(
                                "أوسكار للتسويق والتقييم العقاري.. رائدون في تقديم الحلول السكنية الفاخرة.",
                            )}
                        </p>
                    </div>

                    <div>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <Link
                                href="/"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("الرئيسية")}
                            </Link>

                            <Link
                                href="/all-projects"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("المشاريع")}
                            </Link>

                            <Link
                                href="/realestate"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("الوحدات")}
                            </Link>

                            <Link
                                href="/about-us"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("من نحن")}
                            </Link>

                            <Link
                                href="/contact-us"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("تواصل معنا")}
                            </Link>
                           <Link
                                href="/hospitals-for-sale"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("مستشفيات للبيع")}
                            </Link>
                            <Link
                                href="/schools-for-sale"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("مدارس للبيع")}
                            </Link>
                            <Link
                                href="/favorites"
                                className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto block hover:text-[#BF9D21] transition-colors"
                            >
                                {t("المفضلة")}
                            </Link>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#A86B06] font-bold text-lg mb-6 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto">
                            {t("اتصل بنا")}
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            {contactLoading ? (
                                <>
                                    <li className="flex items-center justify-end gap-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                        <PhoneIcon className="w-5 h-5 text-[#A86B06]" />
                                    </li>
                                    <li className="flex items-center justify-end gap-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                                        <EnvelopeIcon className="w-5 h-5 text-[#A86B06]" />
                                    </li>
                                    <li className="flex items-center justify-end gap-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                                        <MapPinIcon className="w-5 h-5 text-[#A86B06]" />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="flex items-center justify-end gap-3 hover:text-[#BF9D21] transition-colors">
                                        {contactInfo.phone_number ? (
                                            <>
                                                <span dir="ltr">
                                                    {formatPhoneDisplay(contactInfo.phone_number)}
                                                </span>
                                                <PhoneIcon className="w-5 h-5 text-[#A86B06]" />
                                            </>
                                        ) : (
                                            <>
                                                <span dir="ltr">+201274949135</span>
                                                <PhoneIcon className="w-5 h-5 text-[#A86B06]" />
                                            </>
                                        )}
                                    </li>

                                    <li className="flex items-center justify-end gap-3 hover:text-[#BF9D21] transition-colors">
                                        {contactInfo.email ? (
                                            <>
                                                <span>{contactInfo.email}</span>
                                                <EnvelopeIcon className="w-5 h-5 text-[#A86B06]" />
                                            </>
                                        ) : (
                                            <>
                                                <span>info@oscar.com</span>
                                                <EnvelopeIcon className="w-5 h-5 text-[#A86B06]" />
                                            </>
                                        )}
                                    </li>

                                    {outlets.length > 0 ? (
                                        outlets.map((outlet, index) => (
                                            <li key={outlet.id || index} className="flex items-start justify-end gap-3 hover:text-[#BF9D21] transition-colors">
                                                <div className="text-left flex-1">
                                                    <div className="flex items-center gap-2 mb-1">

                                                        {outlet.city && (
                                                            <span className="text-xs text-gray-500">
                                                                {outlet.city}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="block">
                                                        {getOutletName(outlet)}
                                                    </span>
                                                </div>
                                                <MapPinIcon className="w-5 h-5 text-[#A86B06] flex-shrink-0 mt-1" />
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex items-center justify-end gap-3 hover:text-[#BF9D21] transition-colors">
                                            <span className="text-left">
                                                {t("33 شارع قصر النيل – وسط البلد – القاهرة.")}
                                            </span>
                                            <MapPinIcon className="w-5 h-5 text-[#A86B06]" />
                                        </li>
                                    )}

                                    {contactInfo.wathsApp_number && (
                                        <li className="flex items-center justify-end gap-3 hover:text-[#BF9D21] transition-colors">
                                            <a
                                                href={`https://wa.me/${formatPhoneDisplay(contactInfo.wathsApp_number)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-green-600 hover:text-green-700"
                                            >
                                                <span dir="ltr">
                                                    {formatPhoneDisplay(contactInfo.wathsApp_number)}
                                                </span>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                                                </svg>
                                            </a>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-[#A86B06] font-bold text-lg mb-4 border-b border-[#A86B06]/20 pb-2 w-fit mr-0 ml-auto">
                            {t("تواصل مباشر")}
                        </h3>
                        <form className="space-y-2" onSubmit={handleSendForm}>
                            <div>
                                <input
                                    type="text"
                                    placeholder={t("الاسم *")}
                                    className={`w-full bg-white dark:bg-[#1A1A1A] border ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#A86B06] outline-none dark:text-white transition-colors`}
                                    value={form.name}
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1 mr-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder={t("البريد الإلكتروني *")}
                                    className={`w-full bg-white dark:bg-[#1A1A1A] border ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#A86B06] outline-none dark:text-white transition-colors`}
                                    value={form.email}
                                    onChange={(e) =>
                                        handleChange("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1 mr-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="relative" dir="ltr">
                                    <PhoneInput
                                        country={"eg"}
                                        value={form.phone}
                                        onChange={(value) =>
                                            handleChange("phone", value)
                                        }
                                        enableSearch={true}
                                        inputStyle={{
                                            width: "100%",
                                            height: "40px",
                                            fontSize: "14px",
                                            backgroundColor: isDark
                                                ? "#1A1A1A"
                                                : "white",
                                            border: errors.phone
                                                ? "1px solid #ef4444"
                                                : isDark
                                                  ? "1px solid #2A2A2A"
                                                  : "1px solid #E5E7EB",
                                            borderRadius: "8px",
                                            color: isDark ? "white" : "black",
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
                                            borderRadius: "8px 0 0 8px",
                                        }}
                                        dropdownStyle={{
                                            backgroundColor: isDark
                                                ? "#1A1A1A"
                                                : "white",
                                            color: isDark ? "white" : "black",
                                            textAlign: "left",
                                        }}
                                    />
                                </div>
                                {errors.phone && (
                                    <p
                                        className="text-red-500 text-xs mt-1 mr-1 text-right"
                                        dir="rtl"
                                    >
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    rows="2"
                                    placeholder={t("رسالتك (اختياري)")}
                                    className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#A86B06] outline-none dark:text-white resize-none transition-colors"
                                    value={form.message}
                                    onChange={(e) =>
                                        handleChange("message", e.target.value)
                                    }
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center gap-2 ${isLoading ? "bg-[#A86B06]/70" : "bg-[#A86B06] hover:bg-[#BF9D21]"} text-white py-2 rounded-lg text-sm font-bold transition-all shadow-md disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <>
                                        <span>{t("جاري الإرسال...")}</span>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </>
                                ) : (
                                    <>
                                        <span>{t("إرسال")}</span>
                                        <PaperAirplaneIcon className="w-4 h-4 rotate-180" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-300 dark:border-[#1A1A1A] text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} OSCAR.{" "}
                        {t("جميع الحقوق محفوظة.")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
