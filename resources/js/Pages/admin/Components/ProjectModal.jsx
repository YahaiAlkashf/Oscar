import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProjectModal({
    title,
    project,
    setProject,
    handleSave,
    closeModal,
    errors,
    isEdit = false,
    app_url,
    loading,
    locations,
    categories,
}) {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (!project.images || !Array.isArray(project.images)) {
            setPreviews([]);
            return;
        }

        const objectUrls = project.images.map((img) => {
            if (img instanceof File) {
                return URL.createObjectURL(img);
            }
            return `${app_url}/storage/${img.image}`;
        });

        setPreviews(objectUrls);

        return () => {
            objectUrls.forEach((url) => {
                if (url.startsWith("blob:")) URL.revokeObjectURL(url);
            });
        };
    }, [project.images, app_url]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white dark:bg-gray-800 overflow-y-auto h-full shadow-2xl max-w-md w-full p-6 space-y-4 animate-slide-in-right">
                <div className="flex items-center justify-between border-b pb-2">
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
                            اسم المشروع
                        </label>
                        <input
                            type="text"
                            value={project.name || ""}
                            onChange={(e) =>
                                setProject({ ...project, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            اسم المشروع بالإنجليزى
                        </label>
                        <input
                            type="text"
                            value={project.name_en || ""}
                            onChange={(e) =>
                                setProject({ ...project, name_en: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.name_en && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name_en[0]}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                أقل سعر
                            </label>
                            <input
                                type="number"
                                value={project.lowest_price || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        lowest_price: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.lowest_price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.lowest_price[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                أكبر سعر
                            </label>
                            <input
                                type="number"
                                value={project.highest_price || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        highest_price: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.highest_price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.highest_price[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                أكبر مساحة
                            </label>
                            <input
                                type="number"
                                value={project.largest_area || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        largest_area: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.largest_area && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.largest_area[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                                أقل مساحة
                            </label>
                            <input
                                type="number"
                                value={project.smallest_area || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        smallest_area: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.smallest_area && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.smallest_area[0]}
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
                                value={project.phone_number || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        phone_number: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.phone_number && (
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
                                value={project.whatsApp_number || ""}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        whatsApp_number: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                            />
                            {errors?.whatsApp_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.whatsApp_number[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            value={project.email || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    email: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            المطور العقاري
                        </label>
                        <input
                            type="text"
                            value={project.developer || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    developer: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.developer && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.developer[0]}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            المطور العقاري بالإنجليزى
                        </label>
                        <input
                            type="text"
                            value={project.developer_en || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    developer_en: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.developer_en && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.developer_en[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            وصف المشروع
                        </label>
                        <textarea
                            value={project.description || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    description: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            rows="3"
                        ></textarea>
                        {errors?.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            وصف المشروع بالانجليزية
                        </label>
                        <textarea
                            value={project.description_en || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    description_en: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                            rows="3"
                        ></textarea>
                        {errors?.description_en && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description_en[0]}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="top"
                            checked={project.top == 1}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    top: e.target.checked ? 1 : 0,
                                })
                            }
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <label
                            htmlFor="top"
                            className="mr-2 text-sm font-medium dark:text-gray-300"
                        >
                            تمييز المشروع
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            نوع المشروع
                        </label>
                        <select
                            value={project.Residential_Coastal || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    Residential_Coastal: e.target.value,
                                })
                            }
                            className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                        >
                            <option value="">اختر النوع</option>
                            <option value="residential">سكني</option>
                            <option value="coastal">ساحلي</option>
                        </select>
                        {errors?.Residential_Coastal && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.Residential_Coastal[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            تاريخ التسليم
                        </label>
                        <input
                            type="date"
                            value={project.delivery_date || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    delivery_date: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors?.delivery_date && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.delivery_date[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الموقع
                        </label>
                        <select
                            value={project.location_id || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
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
                        {errors?.location_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.location_id[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الفئة
                        </label>
                        <select
                            value={project.category_id || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
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
                        {errors?.category_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.category_id[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            طريقة الدفع
                        </label>
                        <select
                            value={project.Payment || ""}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    Payment: e.target.value,
                                })
                            }
                            className="w-full px-8 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                        >
                            <option value="">اختر طريقة الدفع</option>
                            <option value="cash">كاش</option>
                            <option value="installments">تقسيط</option>
                            <option value="cash_and_installments">
                                كاش وتقسيط
                            </option>
                        </select>
                        {errors?.Payment && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.Payment[0]}
                            </p>
                        )}
                    </div>

                    <div className="pt-2 border-t">
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            الصورة الأساسية
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    image: e.target.files[0],
                                })
                            }
                            className="w-full text-sm text-gray-500 mb-2"
                        />
                        {project.image && (
                            <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                                <img
                                    src={
                                        typeof project.image === "string"
                                            ? `${app_url}/storage/${project.image}`
                                            : URL.createObjectURL(project.image)
                                    }
                                    className="w-full h-full object-cover"
                                    alt="Main Preview"
                                />
                            </div>
                        )}
                        {errors?.image && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.image[0]}
                            </p>
                        )}
                    </div>

                    <div className="pt-2 border-t">
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                            صور معرض المشروع (استبدال الكل)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const filesArray = Array.from(e.target.files);
                                setProject({ ...project, images: filesArray });
                            }}
                            className="w-full text-sm text-gray-500 mb-3"
                        />

                        <div className="grid grid-cols-3 gap-2">
                            {previews.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="relative h-20 border rounded-lg overflow-hidden shadow-sm"
                                >
                                    <img
                                        src={src}
                                        className="w-full h-full object-cover"
                                        alt={`preview-${idx}`}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors?.images && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.images[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 pt-6 sticky bottom-0 bg-white dark:bg-gray-800 border-t">
                    <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                        disabled={loading}
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:brightness-110 disabled:opacity-50"
                    >
                        {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
                    </button>
                </div>
            </div>
        </div>
    );
}
