import React from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteConfirmationModal({
    closeModal,
    onConfirm,
    itemName,
    errors
}) {


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <TrashIcon className="h-5 w-5" />
                        <span className="font-bold">تأكيد الحذف</span>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                            <TrashIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        هل أنت متأكد؟
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        أنت على وشك حذف : <br />
                        <span className="font-bold text-gray-900 dark:text-white underline decoration-red-500">
                            {itemName || "هذا العنصر"}
                        </span>
                        <br />
                        هذا الإجراء لا يمكن الرجوع عنه.
                    </p>
                        {errors?.error && <p className="text-red-500 text-xs mt-1">{errors.error}</p>}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex gap-3">
                    <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-500 font-medium transition-colors"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 font-bold transition-all active:scale-95"
                    >
                        تأكيد الحذف
                    </button>
                </div>
            </div>
        </div>
    );
}
