import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    Squares2X2Icon,
    BriefcaseIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";

import ManagementModels from "./Components/ManagementModels";
import DeleteModel from "./Components/DeleteModel";
import ProjectModal from "./Components/ProjectModal";
import ProjectDetailsModel from "./Components/ProjectDetailsModal";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [filterProjects, setFilterProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [addIsOpen, setAddIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const { app_url } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const [projectData, setProjectData] = useState({
        name: "",
        name_en: "",
        highest_price: "",
        lowest_price: "",
        largest_area: "",
        smallest_area: "",
        phone_number: "",
        whatsApp_number: "",
        email: "",
        developer: "",
        developer_en: "",
        description: "",
        description_en: "",
        image: "",
        images: [],
        top: 0,
        Residential_Coastal: "",
        delivery_date: "",
        location_id: "",
        category_id: "",
        Payment: "",
    });

    useEffect(() => {
        fetchProjects();
        fetchCategories();
        fetchLocations();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const fetchLocations = async () => {
        try {
            const response = await axios.get("/locations");
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get("/projects");
            setProjects(response.data);
            setFilterProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleSaveAdd = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            for (const key in projectData) {
                if (key === "images" && projectData.images.length > 0) {
                    projectData.images.forEach((file) =>
                        formData.append("images[]", file),
                    );
                }
                if (key === "top") {
                    if (projectData.top) {
                        formData.append(key, 1);
                    } else {
                        formData.append(key, 0);
                    }
                } else {
                    formData.append(key, projectData[key]);
                }
            }
            await axios.post(`${app_url}/projects`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchProjects();
            closeModal();
            resetForm();
        } catch (error) {
            setErrors(error.response?.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEdit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            for (const key in selectedProject) {
                if (key === "images" && selectedProject.images?.length > 0) {
                    selectedProject.images.forEach((file) => {
                        if (file instanceof File)
                            formData.append("images[]", file);
                    });
                }
                if (key === "top") {
                    if (selectedProject.top) {
                        formData.append(key, 1);
                    } else {
                        formData.append(key, 0);
                    }
                } else {
                    formData.append(key, selectedProject[key]);
                }
            }
            await axios.post(
                `${app_url}/projects/${selectedProject.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            fetchProjects();
            closeModal();
        } catch (error) {
            setErrors(error.response?.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDelete = async () => {
        try {
            await axios.delete(`${app_url}/projects/${selectedProject.id}`);
            fetchProjects();
            closeModal();
        } catch (error) {
            console.error(error);
            setErrors(error.response?.data || {});
        }
    };

    const resetForm = () => {
        setProjectData({
            name: "",
            name_en: "",
            highest_price: "",
            lowest_price: "",
            largest_area: "",
            smallest_area: "",
            phone_number: "",
            whatsApp_number: "",
            email: "",
            developer: "",
            developer_en: "",
            description: "",
            description_en: "",
            image: "",
            images: [],
            top: 0,
            Residential_Coastal: "",
            delivery_date: "",
            location_id: "",
            category_id: "",
            Payment: "",
        });
    };

    const closeModal = () => {
        setAddIsOpen(false);
        setEditIsOpen(false);
        setDeleteIsOpen(false);
        setShowDetailsModal(false);
        setSelectedProject(null);
        setErrors({});
    };

    const handleSearch = (val) => {
        setSearch(val);
        setCurrentPage(1);
        if (!val.trim()) {
            setFilterProjects(projects);
            return;
        }
        const filtered = projects.filter(
            (item) =>
                item.name?.toLowerCase().includes(val.toLowerCase()) ||
                item.description?.toLowerCase().includes(val.toLowerCase()),
        );
        setFilterProjects(filtered);
    };

    // Pagination Logic
    const totalPages = Math.ceil(filterProjects.length / rowsPerPage);
    const currentRows = filterProjects.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
    );

    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                {/* Header Section */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <BriefcaseIcon className="h-6 w-6 text-primary" />
                            {"إدارة المشاريع"}
                        </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex items-center w-full sm:w-1/2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder={
                                    "بحث باسم المشروع، المطور، أو الوصف..."
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={() => handleSearch(search)}
                                className="px-6 py-2 bg-[#b27000] text-white rounded-l-lg hover:bg-yellow-700 transition-colors border border-[#b27000]"
                            >
                                {"بحث"}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#b27000] rounded-lg hover:bg-yellow-700 transition-colors"
                                onClick={() => setAddIsOpen(true)}
                            >
                                <PlusIcon className="h-4 w-4 ml-1.5" />
                                {"إضافة مشروع جديد"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    #
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    الصورة
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    اسم المشروع
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    العقارات
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    عرض رئيسية (TOP)
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {currentRows.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="px-4 py-3 text-right text-gray-500">
                                        {(currentPage - 1) * rowsPerPage +
                                            idx +
                                            1}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <img
                                            src={
                                                item.image
                                                    ? `${app_url}/storage/${item.image}`
                                                    : "/placeholder.png"
                                            }
                                            className="h-12 w-20 rounded-lg object-cover border border-gray-200"
                                            alt={item.name}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                        <div className="flex flex-col">
                                            <span>{item.name}</span>
                                            <span>{item.name_en}</span>
                                        </div>

                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                                        {item.real_estates_count || 0}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${item.is_top ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                                        >
                                            {item.top ? "نعم" : "لا"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(item);
                                                    setShowDetailsModal(true);
                                                }}
                                                className="p-2 text-primary hover:bg-blue-50 rounded-lg"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(item);
                                                    setEditIsOpen(true);
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(item);
                                                    setDeleteIsOpen(true);
                                                }}
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

                    {filterProjects.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-10 text-gray-400">
                            <BriefcaseIcon className="h-12 w-12 mb-2 opacity-20" />
                            <p className="font-bold text-lg">
                                لا توجد مشاريع حالياً.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center p-4 border-t dark:border-gray-700">
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            السابق
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">
                            صفحة {currentPage} من {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* Modals */}
                {addIsOpen && (
                    <ProjectModal
                        title="إضافة مشروع جديد"
                        project={projectData}
                        setProject={setProjectData}
                        handleSave={handleSaveAdd}
                        closeModal={closeModal}
                        errors={errors}
                        app_url={app_url}
                        loading={loading}
                        categories={categories}
                        locations={locations}
                    />
                )}

                {editIsOpen && (
                    <ProjectModal
                        title="تعديل المشروع"
                        project={selectedProject}
                        setProject={setSelectedProject}
                        handleSave={handleSaveEdit}
                        closeModal={closeModal}
                        errors={errors}
                        isEdit={true}
                        app_url={app_url}
                        loading={loading}
                        categories={categories}
                        locations={locations}
                    />
                )}

                {deleteIsOpen && (
                    <DeleteModel
                        closeModal={closeModal}
                        onConfirm={handleSaveDelete}
                        itemName={selectedProject?.name}
                        errors={errors}
                    />
                )}

                {showDetailsModal && selectedProject && (
                    <ProjectDetailsModel
                        closeModal={closeModal}
                        selectedProject={selectedProject}
                        app_url={app_url}
                    />
                )}
            </div>
        </Layout>
    );
}
