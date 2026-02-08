import React, { useState, useEffect } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function RealStateModal({
    title,
    property,
    setProperty,
    handleSave,
    closeModal,
    errors,
    isEdit = false,
    categories,
    locations,
    types,
    app_url,
    loading,
    projects,
}) {
    const [featureInput, setFeatureInput] = useState("");
    const [featureInputEn, setFeatureInputEn] = useState("");
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (!property.images || !Array.isArray(property.images)) {
            setPreviews([]);
            return;
        }

        const objectUrls = property.images.map((img) => {
            if (img instanceof File) {
                return URL.createObjectURL(img);
            }
            const path = img.image || img;
            return `${app_url}/storage/${path}`;
        });

        setPreviews(objectUrls);

        return () => {
            objectUrls.forEach((url) => {
                if (url.startsWith("blob:")) URL.revokeObjectURL(url);
            });
        };
    }, [property.images, app_url]);

    const addFeature = () => {
        if (featureInput.trim() !== "" || featureInputEn.trim() !== "") {
            const currentFeatures = property.features || [];
            const currentFeaturesEn = property.features_en || [];

            const newFeatures = [...currentFeatures, featureInput.trim()];

            const newFeaturesEn = [...currentFeaturesEn, featureInputEn.trim()];

            setProperty({
                ...property,
                features: newFeatures,
                features_en: newFeaturesEn,
            });

            setFeatureInput("");
            setFeatureInputEn("");
        }
    };

    const removeFeature = (indexToRemove) => {
        const updatedFeatures = property.features.filter(
            (_, index) => index !== indexToRemove,
        );

        const updatedFeaturesEn = property.features_en.filter(
            (_, index) => index !== indexToRemove,
        );

        setProperty({
            ...property,
            features: updatedFeatures,
            features_en: updatedFeaturesEn,
        });
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white dark:bg-gray-800 overflow-y-auto h-full shadow-2xl max-w-md w-full p-6 space-y-4 animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {title}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 transition-transform hover:rotate-90"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            اسم العقار
                        </label>
                        <input
                            type="text"
                            value={property.name || ""}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            اسم العقار بالإنجليزية
                        </label>
                        <input
                            type="text"
                            value={property.name_en || ""}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    name_en: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                        {errors.name_en && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name_en[0]}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                كود الوحدة
                            </label>
                            <input
                                type="text"
                                value={property.unit_code || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        unit_code: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.unit_code && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.unit_code[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                اسم الوكيل
                            </label>
                            <input
                                type="text"
                                value={property.broker_name || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        broker_name: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.broker_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.broker_name[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                اسم الوكيل بالإنجليزية
                            </label>
                            <input
                                type="text"
                                value={property.broker_name_en || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        broker_name_en: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.broker_name_en && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.broker_name_en[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                value={property.email || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                الاطلالة
                            </label>
                            <input
                                type="text"
                                value={property.view || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        view: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.view && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.view[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                الاطلالة بالإنجليزية
                            </label>
                            <input
                                type="text"
                                value={property.view_en || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        view_en: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.view_en && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.view_en[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                نوع التشطيب
                            </label>
                            <input
                                type="text"
                                value={property.finishing_type || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        finishing_type: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.finishing_type && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.finishing_type[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                نوع التشطيب بالإنجليزية
                            </label>
                            <input
                                type="text"
                                value={property.finishing_type_en || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        finishing_type_en: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.finishing_type_en && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.finishing_type_en[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                المساحة (م²)
                            </label>
                            <input
                                type="text"
                                value={property.area || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        area: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.area && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.area[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الوصف
                        </label>
                        <textarea
                            value={property.description || ""}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    description: e.target.value,
                                })
                            }
                            rows="3"
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الوصف بالإنجليزية
                        </label>
                        <textarea
                            value={property.description_en || ""}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    description_en: e.target.value,
                                })
                            }
                            rows="3"
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.description_en && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description_en[0]}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                عدد الغرف
                            </label>
                            <input
                                type="text"
                                value={property.rooms || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        rooms: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.rooms && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.rooms[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                عدد الحمامات
                            </label>
                            <input
                                type="text"
                                value={property.bathrooms || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        bathrooms: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.bathrooms && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.bathrooms[0]}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium dark:text-gray-300">
                            مميزات العقار (عربي/إنجليزي)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={featureInput}
                                onChange={(e) =>
                                    setFeatureInput(e.target.value)
                                }
                                placeholder="الميزة بالعربية..."
                                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none"
                            />
                            <input
                                type="text"
                                value={featureInputEn}
                                onChange={(e) =>
                                    setFeatureInputEn(e.target.value)
                                }
                                placeholder="الميزة بالإنجليزية..."
                                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-3 bg-primary text-white rounded-lg"
                                disabled={
                                    !featureInput.trim() &&
                                    !featureInputEn.trim()
                                }
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1">
                            {property.features &&
                                property.features.map((feat, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-1 p-2 bg-gray-100 dark:bg-gray-700 rounded border"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs dark:text-gray-200">
                                                {typeof feat === "object"
                                                    ? feat.feature
                                                    : feat}
                                            </span>
                                            <XMarkIcon
                                                onClick={() =>
                                                    removeFeature(index)
                                                }
                                                className="h-3 w-3 cursor-pointer text-red-500 hover:scale-125 transition-transform"
                                            />
                                        </div>
                                        {property.features_en &&
                                            property.features_en[index] && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {
                                                        property.features_en[
                                                            index
                                                        ]
                                                    }
                                                </span>
                                            )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">
                                السعر
                            </label>
                            <input
                                type="text"
                                value={property.price || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        price: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.price[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">
                                الغرض
                            </label>
                            <select
                                value={property.rent_or_sale || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        rent_or_sale: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value="">اختر</option>
                                <option value="sale">بيع</option>
                                <option value="rent">إيجار</option>
                            </select>
                            {errors.rent_or_sale && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.rent_or_sale[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                رقم الهاتف
                            </label>
                            <input
                                type="text"
                                value={property.phone_number || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        phone_number: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.phone_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone_number[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                رقم الواتساب
                            </label>
                            <input
                                type="text"
                                value={property.whatsapp_number || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        whatsapp_number: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors.whatsapp_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.whatsapp_number[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                الفئة
                            </label>
                            <select
                                value={property.category_id || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        category_id: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value="">اختر الفئة</option>
                                {categories &&
                                    categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.category_id[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                ساحلى او سكنى
                            </label>
                            <select
                                value={property.Residential_Coastal || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        Residential_Coastal: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value={"residential"}>ساحلى</option>
                                <option value={"coastal"}> سكنى </option>
                            </select>
                            {errors.Residential_Coastal && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.Residential_Coastal[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                الموقع
                            </label>
                            <select
                                value={property.location_id || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        location_id: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value="">اختر الموقع</option>
                                {locations &&
                                    locations.map((location) => (
                                        <option
                                            key={location.id}
                                            value={location.id}
                                        >
                                            {location.location}
                                        </option>
                                    ))}
                            </select>
                            {errors.location_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.location_id[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                النوع
                            </label>
                            <select
                                value={property.type_id || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        type_id: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value="">اختر النوع</option>
                                {types &&
                                    types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                            </select>
                            {errors.type_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.type_id[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                المشروع
                            </label>

                            <select
                                value={property.project_id || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        project_id: e.target.value,
                                    })
                                }
                                className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            >
                                <option value="">اختر النوع</option>
                                {projects &&
                                    projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.project_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.project_id[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="top"
                            checked={property.top || false}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    top: e.target.checked,
                                })
                            }
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <label
                            htmlFor="top"
                            className="mr-2 text-sm font-medium dark:text-gray-300"
                        >
                            تمييز العقار
                        </label>
                        {errors.top && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.top[0]}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="immediate_delivery"
                            checked={property.immediate_delivery == 1}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    immediate_delivery: e.target.checked
                                        ? 1
                                        : 0,
                                    ...(e.target.checked && {
                                        delivery_date: "",
                                    }),
                                })
                            }
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        {errors.immediate_delivery && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.immediate_delivery[0]}
                            </p>
                        )}
                        <label
                            htmlFor="immediate_delivery"
                            className="mr-2 text-sm font-medium dark:text-gray-300"
                        >
                            التسليم فوري
                        </label>
                    </div>

                    {property.immediate_delivery != 1 && (
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                تاريخ التسليم
                            </label>
                            <input
                                type="date"
                                value={property.delivery_date || ""}
                                onChange={(e) =>
                                    setProperty({
                                        ...property,
                                        delivery_date: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    )}

                    <div className="pt-2 border-t dark:border-gray-700">
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الصورة الأساسية
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    image: e.target.files[0],
                                })
                            }
                            className="w-full text-sm text-gray-500 mb-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.image[0]}
                            </p>
                        )}
                        {property.image && (
                            <div className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={
                                        typeof property.image === "string"
                                            ? `${app_url}/storage/${property.image}`
                                            : URL.createObjectURL(
                                                  property.image,
                                              )
                                    }
                                    className="w-full h-full object-cover"
                                    alt="Main"
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-2 border-t dark:border-gray-700">
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            صور المعرض (استبدال الكل)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const filesArray = Array.from(e.target.files);
                                setProperty({
                                    ...property,
                                    images: filesArray,
                                });
                            }}
                            className="w-full text-sm text-gray-500 mb-3"
                        />

                        <div className="grid grid-cols-3 gap-2">
                            {previews.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="h-20 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 shadow-inner"
                                >
                                    <img
                                        src={src}
                                        className="w-full h-full object-cover"
                                        alt={`preview-${idx}`}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors.images && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.images[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 pt-6 border-t dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
                    <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 transition-colors"
                        disabled={loading}
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:brightness-110 disabled:opacity-50 transition-all"
                    >
                        {loading
                            ? "جاري الحفظ..."
                            : isEdit
                              ? "تحديث البيانات"
                              : "إضافة العقار"}
                    </button>
                </div>
            </div>
        </div>
    );
}
