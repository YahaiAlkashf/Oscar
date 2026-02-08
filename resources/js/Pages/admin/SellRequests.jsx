import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    TrashIcon,
    PhotoIcon,
    XMarkIcon,
    HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import DeleteModel from "./Components/DeleteModel";

export default function SellRequests() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [filterRequests, setFilterRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [imagesModalOpen, setImagesModalOpen] = useState(false);
    const [fullImage, setFullImage] = useState(null);
    const { app_url } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSearch = (query) => {
        setSearch(query);
        setCurrentPage(1);
        console.log("hello");
        if (!query || query.trim() === "") {
            setFilterRequests(requests);
            return;
        }

        const term = query.toLowerCase();

        const filtered = requests.filter((item) => {
            const name = item.name ? String(item.name).toLowerCase() : "";
            const phone = item.phone_number
                ? String(item.phone_number).toLowerCase()
                : "";

            return name.includes(term) || phone.includes(term);
        });

        setFilterRequests(filtered);
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get("/sell-requests");
            setRequests(response.data);
            setFilterRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        await axios.delete(`${app_url}/sell-requests/${selectedRequest.id}`);
        setDeleteIsOpen(false);
        fetchRequests();
    };
    const totalPages = Math.ceil(filterRequests.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filterRequests.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold dark:text-white mb-6">
                        طلبات البيع
                    </h3>
                    <div className="flex items-center w-full sm:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={"بحث..."}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="px-4 py-2 bg-primary text-white rounded-l-lg hover:bg-primary-dark transition-colors border border-primary">
                            {"بحث"}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 dark:text-gray-300">
                                    صاحب الطلب
                                </th>
                                <th className="px-4 py-3 dark:text-gray-300">
                                    رقم الهاتف
                                </th>
                                <th className="px-4 py-3 text-center dark:text-gray-300">
                                    الصور
                                </th>
                                <th className="px-4 py-3 text-center dark:text-gray-300">
                                    تاريخ الطلب{" "}
                                </th>
                                <th className="px-4 py-3 text-center dark:text-gray-300">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-700">
                            {currentRows.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-4 py-3 dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        {item.phone_number}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedRequest(item);
                                                setImagesModalOpen(true);
                                            }}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
                                        >
                                            <PhotoIcon className="h-4 w-4 ml-1" />{" "}
                                            عرض الصور
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 dark:text-gray-300">
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
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedRequest(item);
                                                setDeleteIsOpen(true);
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    colSpan="5"
                                    className="bg-white dark:bg-gray-800"
                                >
                                    {totalPages > 1 && (
                                        <div className="flex justify-between items-center p-4 border-t dark:border-gray-700">
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
                            <HandRaisedIcon className="h-12 w-12 mb-2 opacity-20" />
                            <p className="font-bold text-lg">
                                لا توجد طلبات حالياً
                            </p>
                        </div>
                    )}
                </div>

                {imagesModalOpen && selectedRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
                            <button
                                onClick={() => setImagesModalOpen(false)}
                                className="absolute top-4 left-4 text-gray-500 hover:text-black dark:text-white"
                            >
                                <XMarkIcon className="h-8 w-8" />
                            </button>
                            <h4 className="text-lg font-bold mb-4 dark:text-white">
                                صور العقار{" "}
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedRequest.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${app_url}/storage/${img.image}`}
                                        className="cursor-pointer rounded-lg hover:opacity-80 transition"
                                        onClick={() =>
                                            setFullImage(
                                                `${app_url}/storage/${img.image}`,
                                            )
                                        }
                                    />
                                )) || (
                                    <p className="col-span-full text-center text-gray-500">
                                        لا توجد صور لهذا العقار
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {fullImage && (
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 p-4"
                        onClick={() => setFullImage(null)}
                    >
                        <button className="absolute top-5 left-5 text-white">
                            <XMarkIcon className="h-10 w-10" />
                        </button>
                        <img
                            src={fullImage}
                            className="max-w-full max-h-full shadow-2xl rounded"
                        />
                    </div>
                )}

                {deleteIsOpen && (
                    <DeleteModel
                        closeModal={() => setDeleteIsOpen(false)}
                        onConfirm={handleDelete}
                        itemName={selectedRequest.name}
                    />
                )}
            </div>
        </Layout>
    );
}
