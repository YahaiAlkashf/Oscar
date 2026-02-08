import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import DeleteModel from "./Components/DeleteModel";

export default function ContactRequests() {
    const [requests, setRequests] = useState([]);
    const [filterRequests, setFilterRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const { app_url } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${app_url}/contact`);
            setRequests(response.data);
            setFilterRequests(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSearch = (searchValue) => {
        setCurrentPage(1);
        const value = searchValue.toLowerCase();
        const filter = requests.filter((item) => {
            return (
                item.name?.toLowerCase().includes(value) ||
                item.email?.toLowerCase().includes(value) ||
                String(item.phone_number).includes(value)
            );
        });
        setFilterRequests(filter);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${app_url}/contact/${selectedRequest.id}`);
            setDeleteIsOpen(false);
            fetchRequests();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const totalPages = Math.ceil(filterRequests.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filterRequests.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                {/* Header & Search */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            رسائل تواصل معنا
                        </h3>
                        <p className="text-sm text-gray-500">
                            إدارة الاستفسارات والرسائل الواردة
                        </p>
                    </div>

                    <div className="flex items-center w-full sm:w-80">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            placeholder="بحث بالاسم، الإيميل أو الهاتف..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="px-4 py-2 bg-primary text-white rounded-l-lg hover:bg-primary-dark transition-colors border border-primary">
                            بحث
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-right border-separate border-spacing-y-2">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 rounded-r-lg">
                                    المرسل
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                                    الرسالة
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                                    التاريخ
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 text-center rounded-l-lg">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-transparent">
                            {currentRows.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-gray-50/30 dark:bg-gray-700/20 hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 dark:text-white flex items-center gap-1">
                                                <UserIcon className="h-4 w-4 text-purple-500" />{" "}
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <EnvelopeIcon className="h-3 w-3" />{" "}
                                                {item.email}
                                            </span>
                                            <span className="text-xs text-blue-500 flex items-center gap-1">
                                                <PhoneIcon className="h-3 w-3" />{" "}
                                                {item.phone_number}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <div className="text-sm text-gray-600 dark:text-gray-300 break-words line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                                            {item.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            item.created_at,
                                        ).toLocaleString("ar-EG", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedRequest(item);
                                                setDeleteIsOpen(true);
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                            title="حذف الرسالة"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="bg-transparent">
                                    {" "}
                                 
                                    {totalPages > 1 && (
                                        <div className="flex justify-between items-center p-4 border-t dark:border-gray-700 mt-4">
                                            <button
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage - 1,
                                                    )
                                                }
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                السابق
                                            </button>

                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                صفحة {currentPage} من{" "}
                                                {totalPages}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage + 1,
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                التالي
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {filterRequests.length <= 0 && (
                        <div className="flex flex-col items-center justify-center p-10 text-gray-400">
                            <ChatBubbleBottomCenterTextIcon className="h-12 w-12 mb-2 opacity-20" />
                            <p className="font-bold text-lg">
                                لا توجد رسائل حالياً
                            </p>
                        </div>
                    )}
                </div>

                {/* Delete Modal */}
                {deleteIsOpen && (
                    <DeleteModel
                        closeModal={() => setDeleteIsOpen(false)}
                        onConfirm={handleDelete}
                        itemName={`رسالة من: ${selectedRequest.name}`}
                    />
                )}
            </div>
        </Layout>
    );
}
