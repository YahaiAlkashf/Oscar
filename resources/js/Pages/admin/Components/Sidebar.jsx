import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    HomeIcon,
    UserGroupIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    AcademicCapIcon,
    Bars3Icon,
    TagIcon,
    ShoppingBagIcon,
    ReceiptPercentIcon,
    Cog6ToothIcon,
    LinkIcon,
    ChatBubbleLeftIcon,
    HomeModernIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    HandRaisedIcon,
    Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";



export default function Sidebar({ isOpen, setIsOpen }) {
    const { url } = usePage();
    const sidebarWidth = isOpen ? "w-56" : "w-20";
    const { auth } = usePage().props;


    let navItems = []



         navItems = [
            { name:" لوحة التحكم", icon: HomeIcon, path: "/admin" },
            { name:"العقارات", icon: HomeModernIcon, path: "/admin/real-estate" },
            { name:"المشاريع", icon: BriefcaseIcon, path: "/admin/projects" },
            { name:"طلبات شراء العقارات ", icon: ShoppingBagIcon, path: "/admin/buy-requests" },
            { name:"طلبات بيع العقارات ", icon: HandRaisedIcon, path: "/admin/sell-requests" },
            { name:"طلبات العمل ", icon: BriefcaseIcon, path: "/admin/job-applications" },
            { name:"طلبات التواصل ", icon: ChatBubbleLeftIcon, path: "/admin/contact"},
            { name:"ادارة", icon: Cog8ToothIcon, path: "/admin/management"},
            {
                name: "الاعدادات",
                icon: Cog6ToothIcon,
                path: "/admin/setting",
            },
        ];



    return (
        <div
            className={`fixed top-0 right-0 h-full z-40 flex flex-col dark:bg-gray-900 dark:text-white
        bg-white  shadow-lg transition-all duration-300 ${sidebarWidth} ${
                isOpen ? "block" : "hidden sm:block"
            }`}
        >
            <div
                className={`flex items-center ${
                    isOpen ? "justify-between" : "justify-center"
                }
              px-4 py-4 border-b border-gray-200  `}
            >
                <span
                    className={`text-xl font-bold text-gray-800 dark:text-white  transition-all duration-300
          ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
                >
                    {"لوحة التحكم"}
                </span>
                <button
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-500  transition dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={"تبديل الشريط الجانبي"}
                >
                    <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-white " />
                </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = url === item.path;
                    return (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.path}
                                className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${
                    isActive
                        ? "bg-primary text-white"
                        : "text-gray-700  hover:bg-gray-100  dark:hover:bg-gray-500 "
                } ${isOpen ? "" : "justify-center"}`}
                            >
                                <Icon className="h-6 w-6 flex-shrink-0 dark:text-white" />
                                <span
                                    className={`text-base font-medium transition-all duration-200 dark:text-white
                ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
                                >
                                    {item.name}
                                </span>
                            </Link>

                            {!isOpen && (
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3
                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                    transition-all duration-300 z-50">
                                    <div className="bg-gray-900 text-white text-sm font-medium py-2 px-3
                                        rounded-lg shadow-lg whitespace-nowrap relative">
                                        {item.name}
                                        <div className="absolute top-1/2 -right-1 -translate-y-1/2
                                            w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
