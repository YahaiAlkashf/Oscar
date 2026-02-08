import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ActionModal from "./ActionModal";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BuyAndSellRealState({
    filters,
    setFilters,
    handleSearch
}) {
    const { t } = useTranslation();
    const [isOpenSell, setIsOpenSell] = React.useState(false);
    const [isOpenBuy, setIsOpenBuy] = React.useState(false);
    const [errors, setErrors] = useState({});
    const { app_url } = usePage().props;

    const handelSubmitBuy = async (form_data) => {
        const formData = new FormData();
        for (const Key in form_data) {
            if (Key === "images") {
                form_data.images.forEach((file) => {
                    formData.append("images[]", file);
                });
            }
            formData.append(Key, form_data[Key]);
        }

        try {
            const response = await axios.post(`${app_url}/buy-requests`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return true;
        } catch (err) {
            setErrors(err.response.data);
            console.log(err);
            return false;
        }
    };

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
            return true;
        } catch (err) {
            setErrors(err.response?.data || {});
            console.log(err);
            return false;
        }
    };

    const handleImmediate_deliverySearch = () => {
        const updated = { ...filters, immediate_delivery: true };
        setFilters(updated);
        handleSearch(null, updated);
    };

    return (
        <>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-[80%] gap-4 sm:gap-6">
                        <button
                            className="relative w-full lg:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 cursor-pointer rounded-xl overflow-hidden hover:lg:w-1/2 transition-all duration-500 ease-in-out group"
                            onClick={() => setIsOpenSell(true)}
                        >
                            <img
                                src="/7.png"
                                alt={t("بيع عقارك")}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-primary/80 hover:bg-primary/90 text-white p-4 sm:p-6 rounded-xl gap-2 sm:gap-3 transition-all duration-300">
                                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                                    {t("بيع عقارك")}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg max-w-xs">
                                    {t("لديك منزل وتريد بيعة فى اسرع وقت اضغط هنا الان")}
                                </p>
                                <div className="mt-2 sm:mt-3 px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                                    {t("اضغط للبدء")}
                                </div>
                            </div>
                        </button>

                        <button
                            className="relative w-full lg:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 cursor-pointer rounded-xl overflow-hidden hover:lg:w-1/2 transition-all duration-500 ease-in-out group"
                            onClick={handleImmediate_deliverySearch}
                        >
                            <img
                                src="/9.png"
                                alt={t("استلام فوري")}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-primary/70 hover:bg-primary/80 text-white p-4 sm:p-6 rounded-xl gap-2 sm:gap-3 transition-all duration-300">
                                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                                    {t("استلام فورى")}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg max-w-xs">
                                    {t("هل تريد شراء منزلك الآن والدفع لاحقًا؟ اضغط هنا لرؤية المنازل الجاهزة للسكن فورا")}
                                </p>
                                <div className="mt-2 sm:mt-3 px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                                    {t("استكشاف")}
                                </div>
                            </div>
                        </button>

                        <button
                            className="relative w-full lg:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 cursor-pointer rounded-xl overflow-hidden hover:lg:w-1/2 transition-all duration-500 ease-in-out group"
                            onClick={() => setIsOpenBuy(true)}
                        >
                            <img
                                src="/8.png"
                                alt={t("شراء عقار")}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-primary/80 hover:bg-primary/90 text-white p-4 sm:p-6 rounded-xl gap-2 sm:gap-3 transition-all duration-300">
                                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                                    {t("شراء عقار")}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg max-w-xs">
                                    {t("نساعدك فى شراء منزل احلامك")}
                                </p>
                                <div className="mt-2 sm:mt-3 px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                                    {t("اضغط للبدء")}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center p-4 sm:p-5 h-24 sm:h-28 md:h-32">
                    <Link
                        className="inline-flex justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto min-w-[140px] sm:min-w-[160px] px-4 sm:px-5 py-3 sm:py-3.5 text-lg sm:text-xl md:text-2xl bg-[#A86B06] hover:bg-[#BF9D21] text-white rounded-xl sm:rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 transform hover:-translate-y-1"
                        href="/realestate"
                    >
                        <span>{t("ابدأ الان")}</span>
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>

            {isOpenSell && (
                <ActionModal
                    onClose={() => setIsOpenSell(false)}
                    type={"sell"}
                    handleAccept={handelSubmitSell}
                    errors={errors}
                />
            )}

            {isOpenBuy && (
                <ActionModal
                    onClose={() => setIsOpenBuy(false)}
                    handleAccept={handelSubmitBuy}
                    type={"buy"}
                    errors={errors}
                />
            )}
        </>
    );
}
