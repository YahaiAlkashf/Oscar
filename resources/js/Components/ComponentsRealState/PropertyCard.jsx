import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    HomeIcon,
    Square3Stack3DIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    BeakerIcon,
    HeartIcon as HeartOutline,
    ShareIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartSolid,
} from "@heroicons/react/24/solid";
import {
    FaWhatsapp,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaCopy,
    FaCheck
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PropertyCard = ({ item }) => {
    const { t, i18n } = useTranslation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const propertyUrl = `${currentUrl.replace(/\/+$/, '')}/realestate/${item.id}`;

    const language = i18n.language || 'ar';

    const getLocalizedField = (arField, enField) => {
        return language === 'en' && enField ? enField : arField;
    };

    const propertyName = getLocalizedField(item.name, item.name_en);
    const propertyView = getLocalizedField(item.view, item.view_en);
    const propertyFinishingType = getLocalizedField(item.finishing_type, item.finishing_type_en);
    const propertyDescription = getLocalizedField(item.description, item.description_en);
    const propertyBrokerName = getLocalizedField(item.broker_name, item.broker_name_en);

    const shareMessage = `${t("🚀 اكتشف هذا العقار الرائع:")}\n${propertyName}\n${t("السعر:")} ${Number(item.price).toLocaleString()} ${t("ج.م")}\n${propertyUrl}`;

    const handelFavorite = () => {
        setIsFavorite((prev) => !prev);

        const stored = localStorage.getItem("favorite");
        let favorites = stored ? JSON.parse(stored) : [];

        const exists = favorites.find((fav) => fav.id === item.id);

        if (exists) {
            favorites = favorites.filter((fav) => fav.id !== item.id);
        } else {
            favorites.push(item);
        }
        localStorage.setItem("favorite", JSON.stringify(favorites));
    };

    const checkFavorite = () => {
        const stored = localStorage.getItem("favorite");
        const favorites = stored ? JSON.parse(stored) : [];
        const exists = favorites.find((fav) => fav.id === item.id);
        return exists ? true : false;
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(propertyUrl)}`, '_blank');
    };

    const shareOnInstagram = () => {
        alert(t("يمكنك مشاركة الرابط من خلال نسخه ولصقه في منشورات الإنستجرام"));
        copyToClipboard();
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`, '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(propertyUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        checkFavorite() ? setIsFavorite(true) : setIsFavorite(false);
    }, []);

    return (
        <>
            <div className="group bg-white dark:bg-[#111111] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-[#1A1A1A] hover:shadow-2xl transition-all duration-500">
                <div className="relative h-60 overflow-hidden">
                    <Link href={`/realestate/${item.id}`}>
                        <img
                            src={
                                item.image
                                    ? `/storage/${item.image}`
                                    : "/default-house.jpg"
                            }
                            alt={propertyName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </Link>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div className="flex gap-1">
                            <span className="bg-[#A86B06] text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg uppercase">
                                {item.rent_or_sale === "sale" ? t("للبيع") : t("للايجار")}
                            </span>
                            {item.immediate_delivery === 1 && (
                                <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg">
                                    {t("استلام فوري")}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => handelFavorite()} className="p-1.5 bg-white/80 dark:bg-black/50 rounded-lg backdrop-blur-sm">
                                {isFavorite ? (
                                    <HeartSolid className="h-5 w-5 text-red-500" />
                                ) : (
                                    <HeartOutline className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                )}
                            </button>
                            <button onClick={() => setShowShareModal(true)} className="p-1.5 bg-white/80 dark:bg-black/50 rounded-lg backdrop-blur-sm">
                                <ShareIcon className="h-5 w-5 text-gray-600 hover:text-[#A86B06]" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 text-right">
                    <Link href={`/realestate/${item.id}`}>
                        <div className="flex justify-between items-start mb-2 flex-row-reverse">
                            <h3 className="text-xl font-black text-gray-800 dark:text-white group-hover:text-[#A86B06] transition-colors line-clamp-1">
                                {propertyName}
                            </h3>
                        </div>
                    </Link>

                    <p className="text-[#A86B06] font-black text-xl mb-4">
                        {Number(item.price).toLocaleString()}{" "}
                        <span className="text-xs font-normal">{t("ج.م")}</span>
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-50 dark:border-[#1A1A1A]">
                        <IconDetail
                            icon={<HomeIcon className="w-4 h-4" />}
                            value={`${item.rooms} ${t("غرف")}`}
                        />
                        <IconDetail
                            icon={<Square3Stack3DIcon className="w-4 h-4" />}
                            value={`${item.area} ${t("م²")}`}
                        />
                        <IconDetail
                            icon={<BeakerIcon className="w-4 h-4" />}
                            value={`${item.bathrooms}`}
                        />
                    </div>

                    <div className="flex gap-3 mt-4" dir="ltr">
                        <a
                            href={`https://wa.me/+2${item.whatsApp_number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-600 hover:text-white py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span>{t("واتساب")}</span>
                        </a>

                        <a
                            href={`tel:+2${item.phone_number}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#A86B06]/10 hover:bg-[#A86B06] text-[#A86B06] hover:text-white py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            <span>{t("اتصال")}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-gray-800 animate-slideUp">
                        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {t("مشاركة العقار")}
                            </h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-center gap-6 mb-8">
                                <button
                                    onClick={shareOnWhatsApp}
                                    className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all hover:scale-105"
                                >
                                    <FaWhatsapp className="h-10 w-10 text-green-600" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t("واتساب")}</span>
                                </button>

                                <button
                                    onClick={shareOnFacebook}
                                    className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all hover:scale-105"
                                >
                                    <FaFacebookF className="h-10 w-10 text-blue-600" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t("فيسبوك")}</span>
                                </button>

                                <button
                                    onClick={shareOnTwitter}
                                    className="flex flex-col items-center gap-2 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-2xl hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all hover:scale-105"
                                >
                                    <FaTwitter className="h-10 w-10 text-sky-500" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t("تويتر")}</span>
                                </button>
                            </div>

                            <div className="flex justify-center gap-6 mb-8">
                                <button
                                    onClick={shareOnInstagram}
                                    className="flex flex-col items-center gap-2 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-2xl hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all hover:scale-105"
                                >
                                    <FaInstagram className="h-10 w-10 text-pink-600" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t("إنستجرام")}</span>
                                </button>

                                <button
                                    onClick={shareOnLinkedIn}
                                    className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all hover:scale-105"
                                >
                                    <FaLinkedinIn className="h-10 w-10 text-blue-700" />
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t("لينكد إن")}</span>
                                </button>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t("رابط العقار")}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={propertyUrl}
                                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium truncate"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className={`px-6 rounded-xl font-bold flex items-center gap-2 transition-all ${copied ? 'bg-green-600 text-white' : 'bg-[#A86B06] text-white hover:bg-[#8a5705]'}`}
                                    >
                                        {copied ? <FaCheck className="h-5 w-5" /> : <FaCopy className="h-5 w-5" />}
                                        <span>{copied ? t("تم النسخ!") : t("نسخ")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t dark:border-gray-800">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {t("إغلاق")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
};

const IconDetail = ({ icon, value }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-1 text-gray-400">
            <div className="text-[#A86B06]">{icon}</div>
            <span className="text-[10px] font-bold">{value}</span>
        </div>
    );
};

export default PropertyCard;
