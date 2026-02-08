import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    TrashIcon,
    BriefcaseIcon,
    DocumentArrowDownIcon,
    CalendarIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import DeleteModel from "./Components/DeleteModel";
import ManagementModels from "./Components/ManagementModels";

export default function JobApplications() {
    const [applications, setApplications] = useState([]);
    const [jobNames, setJobNames] = useState([]);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const { app_url } = usePage().props;

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        fetchApplications();
        fetchJobNames();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${app_url}/job-applications`);
            setApplications(response.data);
           
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchJobNames = async () => {
        try {
            const response = await axios.get(`${app_url}/jop-name`);
            setJobNames(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addJobName = async (jop_name, jop_name_en) => {
        await axios.post(`${app_url}/jop-name`, {
            jop_name: jop_name,
            jop_name_en: jop_name_en,
        });
        fetchJobNames();
    };

    const updateJobName = async (id, jop_name, jop_name_en) => {
        await axios.put(`${app_url}/jop-name/${id}`, {
            jop_name: jop_name,
            jop_name_en: jop_name_en,
        });
        fetchJobNames();
    };

    const deleteJobName = async (id) => {
        await axios.delete(`${app_url}/jop-name/${id}`);
        fetchJobNames();
    };

    const handleDeleteApp = async () => {
        await axios.delete(`${app_url}/job-applications/${selectedApp.id}`);
        setDeleteIsOpen(false);
        fetchApplications();
    };

    const totalPages = Math.ceil(applications.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = applications.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            طلبات التوظيف
                        </h3>
                        <p className="text-sm text-gray-500">
                            إدارة المتقدمين للوظائف المتاحة
                        </p>
                    </div>

                    <button
                        onClick={() => setIsJobModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all active:scale-95"
                    >
                        <BriefcaseIcon className="h-5 w-5" />
                        إدارة مسميات الوظائف
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                                    المتقدم
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                                    الوظيفة
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                                    تاريخ التقديم
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                                    السيرة الذاتية
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {currentRows.map((app) => (
                                <tr
                                    key={app.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                <UserIcon className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 dark:text-white">
                                                    {app.name}
                                                </div>
                                                <div className="text-xs text-blue-500">
                                                    {app.phone_number}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs font-medium">
                                                {app.job_name?.jop_name ||
                                                    "وظيفة عامة"}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs font-medium">
                                                {app.job_name?.jop_name_en ||
                                                    "وظيفة عامة"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="h-4 w-4" />
                                            {new Date(
                                                app.created_at,
                                            ).toLocaleString("ar-EG", {
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a
                                            href={`${app_url}/storage/${app.CV}`}
                                            target="_blank"
                                            className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                                        >
                                            <DocumentArrowDownIcon className="h-5 w-5" />
                                            تحميل CV
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedApp(app);
                                                setDeleteIsOpen(true);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {applications.length > rowsPerPage && (
                        <div className="flex justify-between items-center p-6 border-t dark:border-gray-700 mt-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1),
                                    )
                                }
                                disabled={currentPage === 1}
                                className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-200 transition-all font-semibold"
                            >
                                السابق
                            </button>

                            <span className="text-sm font-bold dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 px-4 py-2 rounded-full">
                                {currentPage} / {totalPages}
                            </span>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-200 transition-all font-semibold"
                            >
                                التالي
                            </button>
                        </div>
                    )}
                </div>

                {applications.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-10 text-gray-400">
                        <BriefcaseIcon className="h-12 w-12 mb-2 opacity-20" />
                        <p className="font-bold text-lg">
                            لا توجد طلبات حالياً
                        </p>
                    </div>
                )}

                {isJobModalOpen && (
                    <ManagementModels
                        title="إدارة مسميات الوظائف"
                        items={jobNames}
                        onAdd={addJobName}
                        onUpdate={updateJobName}
                        onDelete={deleteJobName}
                        fieldName="jop_name"
                        fieldName_en="jop_name_en"
                        placeholder="أدخل اسم الوظيفة "
                        placeholder_en="أدخل اسم الوظيفة بالإنجليزى "
                        closeModal={() => setIsJobModalOpen(false)}
                    />
                )}

                {deleteIsOpen && (
                    <DeleteModel
                        closeModal={() => setDeleteIsOpen(false)}
                        onConfirm={handleDeleteApp}
                        itemName={`طلب التوظيف المقدم من: ${selectedApp?.name}`}
                    />
                )}
            </div>
        </Layout>
    );
}
