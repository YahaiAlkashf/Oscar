import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    XMarkIcon,
    AdjustmentsHorizontalIcon,
    Squares2X2Icon,
    HomeModernIcon,
    MapPinIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import RealStateModal from "./Components/RealStateModel";
import ManagementModels from "./Components/ManagementModels";
import DeleteModel from "./Components/DeleteModel";
import RealstateDetailsModel from "./Components/RealstateDetailsModel";
import { use } from "react";

export default function RealEstate() {
    const [realStates, setRealStates] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [property, setProperty] = useState({
        name: "",
        unit_code: "",
        broker_name: "",
        email: "",
        view: "",
        finishing_type: "",
        area: "",
        description: "",
        rooms: "",
        bathrooms: "",
        price: "",
        rent_or_sale: "",
        phone_number: "",
        whatsapp_number: "",
        category_id: "",
        location_id: "",
        type_id: "",
        immediate_delivery: 0,
        image: "",
        top: false,
        delivery_date: "",
        project_id: "",
        images: [],
        features: [],
        features_en: [],
        Residential_Coastal: "residential",
        name_en: "",
        view_en: "",
        finishing_type_en: "",
        description_en: "",
        broker_name_en: "",
    });
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const [openModelCategory, setOpenModelCategory] = useState(false);
    const [openModelType, setOpenModelType] = useState(false);
    const [openModelLocaion, setOpenModelLocation] = useState(false);
    const [loading, setLoding] = useState(false);
    const [filterRealStates, setFilterRealStates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const { app_url } = usePage().props;
    useEffect(() => {
        fetchRealState();
        fetchCategories();
        fetchLocations();
        fetchProjects();
        fetchTypes();
    }, []);
    const fetchRealState = async () => {
        try {
            const response = await axios.get("/real-estate");
            setRealStates(response.data);
            setFilterRealStates(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSaveAdd = async () => {
        setLoding(true);
        try {
            const formData = new FormData();

            for (const key in property) {
                if (key === "immediate_delivery") {
                    formData.append(key, property[key] ? 1 : 0);
                    continue;
                }

                if (key === "features") {
                    property.features.forEach((feat) => {
                        formData.append("features[]", feat);
                    });
                    continue;
                }

                if (key === "images") {
                    if (property.images && property.images.length > 0) {
                        property.images.forEach((file) => {
                            formData.append("images[]", file);
                        });
                    }
                    continue;
                }

                formData.append(key, property[key]);
            }

            const response = await axios.post(
                `${app_url}/real-estate`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );

            fetchRealState();
            closeModal();
            resetPropertyForm();
        } catch (error) {
            setErrors(error.response?.data || {});
            console.log(error.response?.data);
        } finally {
            setLoding(false);
        }
    };
    const resetPropertyForm = () => {
        setProperty({
         name: "",
        unit_code: "",
        broker_name: "",
        email: "",
        view: "",
        finishing_type: "",
        area: "",
        description: "",
        rooms: "",
        bathrooms: "",
        price: "",
        rent_or_sale: "",
        phone_number: "",
        whatsapp_number: "",
        category_id: "",
        location_id: "",
        type_id: "",
        immediate_delivery: 0,
        image: "",
        top: false,
        delivery_date: "",
        project_id: "",
        images: [],
        features: [],
        features_en: [],
        Residential_Coastal: "residential",
        name_en: "",
        view_en: "",
        finishing_type_en: "",
        description_en: "",
        broker_name_en: "",
        });
    };
    const handleSaveEdit = async () => {
        setLoding(true);
        try {
            const formData = new FormData();
            for (const key in selectedProperty) {
                if (key !== "images" && key !== "features")
                    formData.append(key, selectedProperty[key]);
                if (key === "features") {
                    if (Array.isArray(selectedProperty.features)) {
                        selectedProperty.features.forEach((feat) => {
                            formData.append("features[]", feat);
                        });
                    }
                }
            }

            if (selectedProperty.images && selectedProperty.images.length > 0) {
                selectedProperty.images.forEach((file) => {
                    formData.append("images[]", file);
                });
            }

            const response = await axios.post(
                `${app_url}/real-estate/${selectedProperty.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            fetchRealState();
            closeModal();
        } catch (error) {
            setErrors(error.response?.data || {});
            console.log(error);
        } finally {
            setLoding(false);
        }
    };
    const handleSaveDelete = async () => {
        try {
            const response = await axios.delete(
                `${app_url}/real-estate/${selectedProperty.id}`,
            );
            fetchRealState();
            closeModal();
        } catch (error) {
            setErrors(error.response?.data || {});
            console.log(error.response?.data);
            console.log("اهلا وسهلا ".error.response?.data.error);
        }
    };
    const closeModal = () => {
        setShowDetailsModal(false);
        setSelectedProperty(null);
        setErrors({});
        setAddIsOpen(false);
        setEditIsOpen(false);
        setOpenModelCategory(false);
        setOpenModelType(false);
        setOpenModelLocation(false);
        setDeleteIsOpen(false);
        setShowDetailsModal(false);
    };
    const fetchProjects = async () => {
        try {
            const response = await axios.get("/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleSearch = (search) => {
        setCurrentPage(1);
        if (!search || search.trim() === "") {
            setFilterRealStates(realStates);
            return;
        }
        const filter = realStates.filter((item) => {
            const name = item.name?.toLowerCase();
            const price = String(item.price);
            const location = item.location?.location.toLowerCase();
            const type = item.type?.type.toLowerCase();
            const category = item.category?.category.toLowerCase();
            const area = item.area?.toLowerCase();
            const phone_number = String(item.phone_number);
            const whatsapp_number = String(item.whatsapp_number);
            const rooms = String(item.rooms);
            const bathrooms = String(item.bathrooms);
            return (
                name.includes(search.toLowerCase()) ||
                price.includes(search) ||
                location.includes(search.toLowerCase()) ||
                type.includes(search.toLowerCase()) ||
                category.includes(search.toLowerCase()) ||
                area.includes(search.toLowerCase()) ||
                phone_number.includes(search) ||
                whatsapp_number.includes(search) ||
                rooms.includes(search) ||
                bathrooms.includes(search)
            );
        });
        setFilterRealStates(filter);
    };

    const openDetails = (property) => {
        setSelectedProperty(property);
        setShowDetailsModal(true);
    };

    // CURD Category
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddCategory = async (name, name_en) => {
        try {
            const response = await axios.post("/categories", {
                category: name,
                category_en: name_en,
            });
            setCategories([...categories, response.data]);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleUpdateCategory = async (id, newName, newName_en) => {
        try {
            const response = await axios.put(`/categories/${id}`, {
                category: newName,
                category_en: newName_en,
            });
            setCategories(
                categories.map((cat) => (cat.id === id ? response.data : cat)),
            );
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`/categories/${id}`);
            setCategories(categories.filter((cat) => cat.id !== id));
        } catch (error) {
            setErrors(error.response?.data || {});
            console.error("Error deleting category:", error);
        }
    };

    // CURD Location
    const fetchLocations = async () => {
        try {
            const response = await axios.get("/locations");
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };
    const handleAddLocation = async (name, name_en) => {
        try {
            const response = await axios.post("/locations", {
                location: name,
                location_en: name_en,
            });
            setLocations([...locations, response.data]);
        } catch (error) {
            console.error("Error adding location:", error);
        }
    };

    const handleUpdateLocation = async (id, newName, newName_en) => {
        try {
            const response = await axios.put(`/locations/${id}`, {
                location: newName,
                location_en: newName_en,
            });
            setLocations(
                locations.map((loc) => (loc.id === id ? response.data : loc)),
            );
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    const handleDeleteLocation = async (id) => {
        try {
            await axios.delete(`/locations/${id}`);
            setLocations(locations.filter((loc) => loc.id !== id));
        } catch (error) {
            console.error("Error deleting location:", error);
            setErrors(error.response?.data || {});
        }
    };

    // CURD Type
    const fetchTypes = async () => {
        try {
            const response = await axios.get("/types");
            setTypes(response.data);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const handleAddType = async (name, name_en) => {
        try {
            const response = await axios.post("/types", {
                type: name,
                type_en: name_en,
            });
            setTypes([...types, response.data]);
        } catch (error) {
            console.error("Error adding type:", error);
        }
    };

    const handleUpdateType = async (id, newName, newName_en) => {
        try {
            const response = await axios.put(`/types/${id}`, {
                type: newName,
                type_en: newName_en,
            });
            setTypes(types.map((t) => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error("Error updating type:", error);
        }
    };

    const handleDeleteType = async (id) => {
        try {
            await axios.delete(`/types/${id}`);
            setTypes(types.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting type:", error);
            setErrors(error.response?.data || {});
        }
    };

    const totalPages = Math.ceil(filterRealStates.length / rowsPerPage);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filterRealStates.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <Layout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                {/* Header Section */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            {"إدارة العقارات"}
                        </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex items-center w-full sm:w-auto">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                placeholder={"بحث عن عقار..."}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-primary text-white rounded-l-lg hover:bg-primary-dark transition-colors border border-primary"
                            >
                                {"بحث"}
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                onClick={() => setOpenModelCategory(true)}
                            >
                                <Squares2X2Icon className="h-4 w-4 ml-1.5" />
                                {"إدارة الأقسام"}
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => setOpenModelType(true)}
                            >
                                <HomeModernIcon className="h-4 w-4 ml-1.5" />
                                {"إدارة انواع العقارات"}
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                onClick={() => setOpenModelLocation(true)}
                            >
                                <MapPinIcon className="h-4 w-4 ml-1.5" />
                                {"إدارة المناطق"}
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                                onClick={() => setAddIsOpen(true)}
                            >
                                <PlusIcon className="h-4 w-4 ml-1.5" />
                                {"إضافة عقار"}
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
                                    صورة العقار
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    اسم العقار
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    السعر
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
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
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <img
                                            src={
                                                item.image
                                                    ? `${app_url}/storage/${item.image}`
                                                    : "/placeholder.png"
                                            }
                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                            alt={item.name}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                        <div className="flex flex-col">
                                            <span>{item.name}</span>
                                            <span> {item.name_en}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right text-green-600 font-bold">
                                        {item.price} ج.م
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    openDetails(item)
                                                }
                                                className="p-2 text-primary hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                title="تفاصيل"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                title="تعديل"
                                                onClick={() => {
                                                    setSelectedProperty(item);
                                                    setEditIsOpen(true);
                                                }}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                title="حذف"
                                                onClick={() => {
                                                    setSelectedProperty(item);
                                                    setDeleteIsOpen(true);
                                                }}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
<tfoot>
    <tr>
        <td colSpan="5" className="bg-white dark:bg-gray-800">

            {filterRealStates.length > rowsPerPage && (
                <div className="flex justify-between items-center p-4 border-t dark:border-gray-700">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        السابق
                    </button>

                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                        صفحة {currentPage} من {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
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

                    {filterRealStates.length <= 0 && (
                        <div className="flex flex-col items-center justify-center p-10 text-gray-400">
                            <HomeModernIcon className="h-12 w-12 mb-2 opacity-20" />
                            <p className="font-bold text-lg">لا توجد نتائج .</p>
                        </div>
                    )}
                </div>

                {/* Property Details Modal */}
                {showDetailsModal && selectedProperty && (
                    <RealstateDetailsModel
                        closeModal={closeModal}
                        selectedProperty={selectedProperty}
                        app_url={app_url}
                    />
                )}

                {addIsOpen && (
                    <RealStateModal
                        title={"اضاف عقار "}
                        property={property}
                        setProperty={setProperty}
                        handleSave={handleSaveAdd}
                        closeModal={closeModal}
                        errors={errors}
                        categories={categories}
                        locations={locations}
                        types={types}
                        app_url={app_url}
                        loading={loading}
                        projects={projects}
                    />
                )}

                {editIsOpen && (
                    <RealStateModal
                        title={"تعديل العقار "}
                        property={selectedProperty}
                        setProperty={setSelectedProperty}
                        handleSave={handleSaveEdit}
                        closeModal={closeModal}
                        errors={errors}
                        isEdit={true}
                        categories={categories}
                        locations={locations}
                        types={types}
                        app_url={app_url}
                        loading={loading}
                        projects={projects}
                    />
                )}
                {deleteIsOpen && (
                    <DeleteModel
                        closeModal={closeModal}
                        onConfirm={handleSaveDelete}
                        itemName={selectedProperty.name}
                        errors={errors}
                    />
                )}

                {/* Management Models */}

                {openModelCategory && (
                    <ManagementModels
                        closeModal={closeModal}
                        title="إدارة الأقسام"
                        items={categories}
                        onAdd={handleAddCategory}
                        onUpdate={handleUpdateCategory}
                        onDelete={handleDeleteCategory}
                        fieldName="category"
                        fieldName_en="category_en"
                        placeholder="إضافة قسم..."
                        placeholder_en="اضافة قسم بالانجليزى..."
                        errors={errors}
                    />
                )}
                {openModelLocaion && (
                    <ManagementModels
                        closeModal={closeModal}
                        title="إدارة المناطق "
                        items={locations}
                        onAdd={handleAddLocation}
                        onUpdate={handleUpdateLocation}
                        onDelete={handleDeleteLocation}
                        fieldName="location"
                        fieldName_en="location_en"
                        placeholder="إضافة منطقة..."
                        placeholder_en="اضافة منطقة بالانجليزى..."
                        errors={errors}
                    />
                )}
                {openModelType && (
                    <ManagementModels
                        closeModal={closeModal}
                        title="إدارة انواع العقارات"
                        items={types}
                        onAdd={handleAddType}
                        onUpdate={handleUpdateType}
                        onDelete={handleDeleteType}
                        fieldName="type"
                        fieldName_en="type_en"
                        placeholder="إضافة نوع عقار..."
                        placeholder_en="إضافة نوع العقار بالانجليزى..."
                        errors={errors}
                    />
                )}
            </div>
        </Layout>
    );
}
