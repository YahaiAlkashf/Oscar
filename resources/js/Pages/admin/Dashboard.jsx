import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    ChatBubbleLeftRightIcon,
    BriefcaseIcon,
    ShoppingBagIcon,
    HomeModernIcon,
    KeyIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const { app_url } = usePage().props;
    const [stats, setStats] = useState({
        contacts: 0,
        jobApps: 0,
        buyRequests: 0,
        sellRequests: 0,
        realEstateSale: 0,
        realEstateRent: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [contacts, jobs, buyReq, sellReq, estates] = await Promise.all([
                axios.get(`${app_url}/contact`),
                axios.get(`${app_url}/job-applications`),
                axios.get(`${app_url}/buy-requests`),
                axios.get(`${app_url}/sell-requests`),
                axios.get(`${app_url}/real-estate`)
            ]);

            setStats({
                contacts: contacts.data.length,
                jobApps: jobs.data.length,
                buyRequests: buyReq.data.length,
                sellRequests: sellReq.data.length,
                realEstateSale: estates.data.filter(i => i.rent_or_sale === 'للبيع' || i.rent_or_sale === 'sale').length,
                realEstateRent: estates.data.filter(i => i.rent_or_sale === 'للايجار' || i.rent_or_sale === 'rent').length,
            });
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, count, icon: Icon, colorClass }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                <h4 className="text-2xl font-bold mt-1 dark:text-white">{count}</h4>
            </div>
            <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="p-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <ChartBarIcon className="h-7 w-7 text-indigo-500" />
                        نظرة عامة على النظام
                    </h2>
                    <p className="text-gray-500 text-sm">مرحباً بك مجدداً، إليك ملخص النشاط الحالي</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="رسائل التواصل"
                        count={stats.contacts}
                        icon={ChatBubbleLeftRightIcon}
                        colorClass="bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                    />
                    <StatCard
                        title="طلبات العمل"
                        count={stats.jobApps}
                        icon={BriefcaseIcon}
                        colorClass="bg-purple-50 text-purple-600 dark:bg-purple-900/20"
                    />
                    <StatCard
                        title="طلبات الشراء"
                        count={stats.buyRequests}
                        icon={ShoppingBagIcon}
                        colorClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
                    />
                    <StatCard
                        title="طلبات بيع عقار"
                        count={stats.sellRequests}
                        icon={HomeModernIcon}
                        colorClass="bg-orange-50 text-orange-600 dark:bg-orange-900/20"
                    />
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg dark:text-white text-right">إحصائيات العقارات المعروضة</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100 dark:divide-gray-700">

                        <div className="p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <ShoppingBagIcon className="h-8 w-8" />
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">عقارات معروضة للبيع</span>
                            <span className="text-4xl font-black text-indigo-600 mt-2">{stats.realEstateSale}</span>
                        </div>


                        <div className="p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-full flex items-center justify-center mb-4">
                                <KeyIcon className="h-8 w-8" />
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">عقارات معروضة للإيجار</span>
                            <span className="text-4xl font-black text-pink-600 mt-2">{stats.realEstateRent}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
