import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    SunIcon,
    MoonIcon,
    PlusIcon,
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import ThemeContext from "@/Context/ThemeContext";
import ActionModal from "./ActionModal";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [errors, setErrors] = useState({});
    const { app_url } = usePage().props;
    const mobileMenuRef = useRef(null);

    const { t, i18n } = useTranslation();
    const [isOpenSell, setIsOpenSell] = useState(false);
    const [language, setLanguage] = useState(i18n.language || "ar");

    // Check for saved language preference
    useEffect(() => {
        const savedLang = localStorage.getItem("i18nextLng");
        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang);
            setLanguage(savedLang);
        }
    }, [i18n]);

    // Update language state
    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const isActive = (path) => url === path;
    const activeClass =
        "text-[#A86B06] border-b-2 border-[#A86B06] pb-1 text-sm font-bold";
    const inactiveClass =
        "text-gray-500 hover:text-[#A86B06] transition-colors pb-1 text-sm font-bold";
    const activeClassMobile = "text-[#A86B06] bg-[#A86B06]/10 font-bold";
    const inactiveClassMobile =
        "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1A1A1A]";

    // Function to change language
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
        setLanguage(lang);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when URL changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle sell form submission
    const handelSubmitSell = async (form_data) => {
        const formData = new FormData();

        for (const Key in form_data) {
            if (Key === "images") {
                form_data.images.forEach((file) => {
                    formData.append("images[]", file);
                });
            } else {
                formData.append(Key, form_data[Key]);
            }
        }

        try {
            const response = await axios.post(
                `${app_url}/sell-requests`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log("Success:", response.data);
        } catch (err) {
            setErrors(err.response?.data?.errors || {});
            console.log(err);
        }
    };

    return (
        <>
            <nav
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 dark:bg-[#0F0F0F]/95 backdrop-blur-sm shadow-sm" : "bg-white dark:bg-[#0F0F0F]"} border-b border-gray-200 dark:border-[#1A1A1A]`}
                dir={language === "ar" ? "rtl" : "ltr"}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Language Selector - Desktop */}
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) =>
                                        changeLanguage(e.target.value)
                                    }
                                    className="appearance-none w-36 px-4 py-2 pr-8 rounded-xl
                                       border border-gray-300 dark:border-gray-700
                                       bg-white dark:bg-gray-800
                                       text-gray-700 dark:text-gray-200 text-sm font-medium
                                       shadow-md transition duration-200
                                       hover:border-[#A86B06]
                                       focus:ring-2 focus:ring-[#A86B06] focus:outline-none"
                                >
                                    <option
                                        value="ar"
                                        className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#A86B06] hover:text-white"
                                    >
                                        🇪🇬 {t("عربي")}
                                    </option>
                                    <option
                                        value="en"
                                        className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#A86B06] hover:text-white"
                                    >
                                        🇬🇧 {t("English")}
                                    </option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    ▼
                                </span>
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {theme === "dark" ? (
                                    <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#BF9D21]" />
                                ) : (
                                    <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                )}
                            </button>

                            {/* Sell Property Button - Desktop */}
                            <button
                                onClick={() => setIsOpenSell(true)}
                                className="hidden lg:flex items-center gap-2 bg-[#A86B06] hover:bg-[#BF9D21] text-white px-4 lg:px-5 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>{t("أعلن عن عقار")}</span>
                            </button>
                        </div>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden lg:flex items-center gap-8">
                            <Link
                                href="/"
                                className={
                                    isActive("/") ? activeClass : inactiveClass
                                }
                            >
                                {t("الرئيسية")}
                            </Link>

                            <Link
                                href="/all-projects"
                                className={
                                    isActive("/all-projects")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("المشاريع")}
                            </Link>

                            <Link
                                href="/realestate"
                                className={
                                    isActive("/realestate")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("الوحدات")}
                            </Link>

                            <Link
                                href="/about-us"
                                className={
                                    isActive("/about-us")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("من نحن")}
                            </Link>

                            <Link
                                href="/contact-us"
                                className={
                                    isActive("/contact-us")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("تواصل معنا")}
                            </Link>

                            <Link
                                href="/hospitals-for-sale"
                                className={
                                    isActive("/hospitals-for-sale")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("مستشفيات للبيع")}
                            </Link>
                            <Link
                                href="/schools-for-sale"
                                className={
                                    isActive("/schools-for-sale")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                {t("مدارس للبيع")}
                            </Link>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <img
                                    src="/5.png"
                                    alt="Real Estate Logo"
                                    className="h-16 sm:h-20 w-auto object-contain transition-all p-2"
                                />
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 dark:text-white"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="w-7 h-7" />
                                ) : (
                                    <Bars3Icon className="w-7 h-7" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div
                        ref={mobileMenuRef}
                        className="fixed top-0 right-0 w-64 sm:w-72 h-full bg-white dark:bg-[#0F0F0F] border-l border-gray-200 dark:border-[#1A1A1A] shadow-xl transition-transform duration-300 animate-slideIn"
                        dir={language === "ar" ? "rtl" : "ltr"}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1A1A1A]">
                            <div className="flex items-center gap-3">
                                <UserCircleIcon className="w-8 h-8 text-[#A86B06]" />
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">
                                        {t("مرحباً بك")}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {t("في أوسكار العقارية")}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1A1A1A]"
                            >
                                <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 space-y-1">
                            <Link
                                href="/"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/") ? activeClassMobile : inactiveClassMobile}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-base">
                                    {t("الرئيسية")}
                                </span>
                            </Link>

                            <Link
                                href="/all-projects"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/all-projects") ? activeClassMobile : inactiveClassMobile}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-base">
                                    {t("المشاريع")}
                                </span>
                            </Link>

                            <Link
                                href="/realestate"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/realestate") ? activeClassMobile : inactiveClassMobile}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-base">
                                    {t("الوحدات")}
                                </span>
                            </Link>

                            <Link
                                href="/about-us"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/about-us") ? activeClassMobile : inactiveClassMobile}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-base">{t("من نحن")}</span>
                            </Link>

                            <Link
                                href="/contact-us"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/contact-us") ? activeClassMobile : inactiveClassMobile}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-base">
                                    {t("تواصل معنا")}
                                </span>
                            </Link>

                            <Link
                                href="/hospitals-for-sale"
                                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/hospitals-for-sale") ? activeClassMobile : inactiveClassMobile}`}

                            >
                                {t("مستشفيات للبيع")}
                            </Link>
                            <Link
                                href="/schools-for-sale"
                                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/schools-for-sale") ? activeClassMobile : inactiveClassMobile}`}
                            >
                                {t("مدارس للبيع")}
                            </Link>

                            {/* Sell Property Button - Mobile */}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsOpenSell(true);
                                }}
                                className="flex items-center justify-center gap-2 w-full mt-6 bg-[#A86B06] hover:bg-[#BF9D21] text-white px-4 py-3 rounded-lg text-base font-bold shadow-md transition-all"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>{t("أعلن عن عقار")}</span>
                            </button>

                            {/* Settings Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#1A1A1A] space-y-3">
                                {/* Language Selector - Mobile */}
                                <div className="relative">
                                    <select
                                        value={language}
                                        onChange={(e) =>
                                            changeLanguage(e.target.value)
                                        }
                                        className="appearance-none w-full px-4 py-3 pr-10 rounded-xl
                                           border border-gray-300 dark:border-gray-700
                                           bg-white dark:bg-gray-800
                                           text-gray-700 dark:text-gray-200 text-sm font-medium
                                           shadow-md transition duration-200
                                           hover:border-[#A86B06]
                                           focus:ring-2 focus:ring-[#A86B06] focus:outline-none"
                                    >
                                        <option
                                            value="ar"
                                            className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#A86B06] hover:text-white"
                                        >
                                            🇪🇬 {t("عربي")}
                                        </option>
                                        <option
                                            value="en"
                                            className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#A86B06] hover:text-white"
                                        >
                                            🇬🇧 {t("English")}
                                        </option>
                                    </select>
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                        ▼
                                    </span>
                                </div>

                                {/* Theme Toggle - Mobile */}
                                <div className="flex items-center justify-between px-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {t("المظهر")}
                                    </span>
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A1A]"
                                    >
                                        {theme === "dark" ? (
                                            <SunIcon className="w-5 h-5 text-[#BF9D21]" />
                                        ) : (
                                            <MoonIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-[#1A1A1A]">
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                                {t("أوسكار العقارية")} ©{" "}
                                {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Sell Property Modal */}
            {isOpenSell && (
                <ActionModal
                    onClose={() => setIsOpenSell(false)}
                    type={"sell"}
                    handleAccept={handelSubmitSell}
                    errors={errors}
                />
            )}

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }

                @media (max-width: 640px) {
                    .logo {
                        height: 3.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .nav-buttons {
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;
