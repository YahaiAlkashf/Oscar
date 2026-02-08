import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaHome, FaUserMd, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import Dropdown from "@/Components/Dropdown";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import ThemeContext from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";
const Header = ({ isOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth } = usePage().props;
    const { theme, toggleTheme } = useContext(ThemeContext);
    const user = auth.user;
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
        const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
    };
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-500 shadow-md mr-20 dark:bg-gray-900 ${
                scrolled
                    ? "bg-white/30  backdrop-blur-sm shadow-md"
                    : "bg-transparent"
            } ${isOpen ? "mr-56" : " mr-20"}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    dir="rtl"
                    className="flex font-bold justify-between items-center"
                >
                    <div className="text-2xl px-3 font-bold flex gap-2 text-primary dark:text-white justify-center items-center">
                        <img
                            src="/2.jpeg"
                            alt="logo"
                            className="rounded-full w-8 h-8"
                        />
                        <span className="font-bold text-[20px] text-primary">
                            OSCAR
                        </span>
                    </div>
                </div>

                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                    <div className="relative ms-3">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}

                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    تسجيل الخروج
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <SunIcon className="h-6 w-6 text-yellow-400" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-[#4F2BED]" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
