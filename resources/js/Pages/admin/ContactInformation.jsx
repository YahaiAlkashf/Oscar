import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    PhoneIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    MapPinIcon,
    HashtagIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";

import AddContactInfoModal from "./Components/AddContactInfoModal";
import AddOutletModal from "./Components/AddOutletModal";
import AddNumberModal from "./Components/AddNumberModal";
import DeleteModel from "./Components/DeleteModel";

export default function ContactInformation() {
    const [contactInfo, setContactInfo] = useState({});
    const [outlets, setOutlets] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [outletModalOpen, setOutletModalOpen] = useState(false);
    const [numberModalOpen, setNumberModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteType, setDeleteType] = useState("");

    const { app_url } = usePage().props;

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [contactRes, outletsRes, numbersRes] = await Promise.all([
                axios.get("/contact-information"),
                axios.get("/outlets"),
                axios.get("/numbers")
            ]);

            setContactInfo(contactRes.data[0] || {});
            setOutlets(outletsRes.data);
            setNumbers(numbersRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveContact = async (data) => {
        setLoading(true);
        try {
            if (contactInfo.id) {
                await axios.put(`/contact-information/${contactInfo.id}`, data);
            } else {
                await axios.post("/contact-information", data);
            }
            fetchAllData();
            closeAllModals();
        } catch (error) {
            setErrors(error.response?.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleSaveOutlet = async (data) => {
        setLoading(true);
        try {
            if (selectedItem && selectedItem.id) {
                await axios.put(`/outlets/${selectedItem.id}`, data);
            } else {
                await axios.post("/outlets", data);
            }
            fetchAllData();
            closeAllModals();
        } catch (error) {
            setErrors(error.response?.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNumber = async (data) => {
        setLoading(true);
        try {
            if (selectedItem && selectedItem.id) {
                await axios.put(`/numbers/${selectedItem.id}`, data);
            } else {
                await axios.post("/numbers", data);
            }
            fetchAllData();
            closeAllModals();
        } catch (error) {
            setErrors(error.response?.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            let endpoint = "";
            if (deleteType === "contact") {
                endpoint = `/contact-information/${selectedItem.id}`;
            } else if (deleteType === "outlet") {
                endpoint = `/outlets/${selectedItem.id}`;
            } else if (deleteType === "number") {
                endpoint = `/numbers/${selectedItem.id}`;
            }

            await axios.delete(endpoint);
            fetchAllData();
            closeAllModals();
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setLoading(false);
        }
    };

    const closeAllModals = () => {
        setContactModalOpen(false);
        setOutletModalOpen(false);
        setNumberModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedItem(null);
        setErrors({});
        setDeleteType("");
    };

    const confirmDelete = (item, type) => {
        setSelectedItem(item);
        setDeleteType(type);
        setDeleteModalOpen(true);
    };

    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <PhoneIcon className="h-6 w-6 text-[#b27000]" />
                        إدارة معلومات الاتصال
                    </h3>
                </div>

                {/* Contact Information Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            معلومات الاتصال الأساسية
                        </h4>
                        <button
                            onClick={() => setContactModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#b27000] rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                            <PlusIcon className="h-4 w-4 ml-1.5" />
                            {contactInfo.id ? "تعديل" : "إضافة"}
                        </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        {contactInfo.id ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                                    <PhoneIcon className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 ">رقم الهاتف</p>
                                        <p className="font-medium dark:text-white">{contactInfo.phone_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">واتساب</p>
                                        <p className="font-medium dark:text-white">{contactInfo.wathsApp_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                                    <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                                        <p className="font-medium dark:text-white">{contactInfo.email}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <PhoneIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>لا توجد معلومات اتصال مضافة</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Outlets Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-[#b27000]" />
                            المكاتب والفروع
                        </h4>
                        <button
                            onClick={() => {
                                setSelectedItem(null);
                                setOutletModalOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#b27000] rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                            <PlusIcon className="h-4 w-4 ml-1.5" />
                            إضافة مكتب جديد
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الاسم (عربي)
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الاسم (إنجليزي)
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        رابط الموقع
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {outlets.map((outlet, index) => (
                                    <tr key={outlet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-4 py-3 text-right text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-200">
                                            {outlet.name}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-200">
                                            {outlet.name_en}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <a href={outlet.location_url} target="_blank" rel="noopener noreferrer"
                                               className="text-blue-500 hover:underline">
                                                عرض الموقع
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(outlet);
                                                        setOutletModalOpen(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(outlet, "outlet")}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {outlets.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <MapPinIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>لا توجد مكاتب مضافة</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Numbers Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <HashtagIcon className="h-5 w-5 text-[#b27000]" />
                            الأرقام الإضافية
                        </h4>
                        <button
                            onClick={() => {
                                setSelectedItem(null);
                                setNumberModalOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#b27000] rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                            <PlusIcon className="h-4 w-4 ml-1.5" />
                            إضافة رقم جديد
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الاسم (عربي)
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الاسم (إنجليزي)
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الرقم
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {numbers.map((number, index) => (
                                    <tr key={number.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-4 py-3 text-right text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-200">
                                            {number.name}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-200">
                                            {number.name_en}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-200">
                                            {number.number}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(number);
                                                        setNumberModalOpen(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(number, "number")}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {numbers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <HashtagIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>لا توجد أرقام مضافة</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modals */}
                {contactModalOpen && (
                    <AddContactInfoModal
                        title={contactInfo.id ? "تعديل معلومات الاتصال" : "إضافة معلومات الاتصال"}
                        data={contactInfo}
                        handleSave={handleSaveContact}
                        closeModal={closeAllModals}
                        errors={errors}
                        loading={loading}
                    />
                )}

                {outletModalOpen && (
                    <AddOutletModal
                        title={selectedItem ? "تعديل المكتب" : "إضافة مكتب جديد"}
                        data={selectedItem || {}}
                        handleSave={handleSaveOutlet}
                        closeModal={closeAllModals}
                        errors={errors}
                        loading={loading}
                    />
                )}

                {numberModalOpen && (
                    <AddNumberModal
                        title={selectedItem ? "تعديل الرقم" : "إضافة رقم جديد"}
                        data={selectedItem || {}}
                        handleSave={handleSaveNumber}
                        closeModal={closeAllModals}
                        errors={errors}
                        loading={loading}
                    />
                )}

                {deleteModalOpen && (
                    <DeleteModel
                        closeModal={closeAllModals}
                        onConfirm={handleDelete}
                        itemName={
                            deleteType === "contact" ? "معلومات الاتصال" :
                            deleteType === "outlet" ? selectedItem?.name :
                            selectedItem?.name
                        }
                        errors={errors}
                    />
                )}
            </div>
        </Layout>
    );
}
