import React, { useState } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon, CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

const GenericManagerModal = ({
    closeModal,
    title,
    items,
    onAdd,
    onUpdate,
    onDelete,
    fieldName,
    fieldName_en,
    placeholder,
    placeholder_en,
    errors
}) => {
    const [newItemName, setNewItemName] = useState({newItemName_ar:"",newItemName_en:""});
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState(null);
    const [error_ar,setError_ar]=useState(false);
    const [error_en,setError_en]=useState(false);
    const [ar,setAr]=useState(true);

    const handleAdd = () => {


        if (!newItemName.newItemName_ar.trim() && !newItemName.newItemName_en.trim()) return;
        if(!newItemName.newItemName_ar) {
            setError_ar(true) ;
            return;
        }
        if(!newItemName.newItemName_en) {
            setError_en(true);
            return;
        }

        onAdd(newItemName.newItemName_ar,newItemName.newItemName_en);
        setError_ar(false);
        setError_en(false);
           setNewItemName({ newItemName_ar: "", newItemName_en: "" }); 
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditValue({editValue_ar:item[fieldName],editValue_en:item[fieldName_en]});
    };

    const handleSave = (id) => {
        onUpdate(id, editValue?.editValue_ar,editValue?.editValue_en);
        setEditingId(null);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn ">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-800 transition-all ">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                    <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Add Input Section */}
                    <div className='gap-3 flex m-3'>
                        <button className='bg-primary text-white p-1 rounded-md px-3' onClick={()=>setAr(true)}>ar</button>
                        <button className='bg-primary text-white p-1 rounded-md px-3' onClick={()=>setAr(false)}>en</button>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                            إضافة جديد
                        </label>
                        <div className="flex gap-2">
                            {ar && (
                                <input
                                    type="text"
                                    value={newItemName.newItemName_ar || ""}
                                    onChange={(e) => setNewItemName({...newItemName,newItemName_ar:e.target.value})}
                                    placeholder={placeholder}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                                />
                            )}
                            {!ar && (
                             <input
                                    type="text"
                                    value={newItemName.newItemName_en || ""}
                                    onChange={(e) => setNewItemName({...newItemName,newItemName_en:e.target.value})}
                                    placeholder={placeholder_en}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                                />
                            )}

                            <button
                                onClick={handleAdd}
                                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-95"
                            >
                                إضافة
                            </button>
                        </div>
                        {errors?.error && <p className="text-red-500 text-xs mt-1">{errors.error}</p>}

                    </div>

                    {/* Items List */}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-5 overflow-auto max-h-48 ">
                        {error_ar && (
                            <p className="text-red-500 text-xs mt-1">يجب ادخال حقل اللغة العربية قم بالضغط على زر ar وادخل محتواه</p>
                        )}
                        {error_en && (
                            <p className="text-red-500 text-xs mt-1">يجب ادخال حقل اللغة الإنجليزية قم بالضغط على زر En وادخل محتواه</p>
                        )}
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
                            القائمة الحالية ({items.length})
                        </h4>
                        <ul className="space-y-2 max-h-[300px]  pr-2 custom-scrollbar">
                            {items.map((item) => (
                                <li key={item.id} className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-transparent hover:border-purple-200 dark:hover:border-purple-900 transition-all w-auto ">

                                    {editingId === item.id ? (
                                        <div className="flex items-center gap-2 flex-1 animate-slideIn">
                                            <input
                                                type="text"
                                                value={editValue.editValue_ar || ""}
                                                onChange={(e) => setEditValue({...editValue,editValue_ar:e.target.value})}
                                                className="flex-1 px-3 py-1.5 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
                                                autoFocus
                                            />
                                           <input
                                                type="text"
                                                value={editValue.editValue_en || ""}
                                                onChange={(e) => setEditValue({...editValue,editValue_en:e.target.value})}
                                                className="flex-1 px-3 py-1.5 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
                                                autoFocus
                                            />
                                            <button onClick={() => handleSave(item.id)} className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg hover:bg-green-200">
                                                <CheckIcon className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200">
                                                <NoSymbolIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-gray-700 dark:text-gray-200 font-medium">
                                                {item[fieldName]}
                                            </span>
                                           <span className="text-gray-700 dark:text-gray-200 font-medium">
                                                {item[fieldName_en]}
                                            </span>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 flex justify-end border-t border-gray-100 dark:border-gray-800">
                    <button onClick={closeModal} className="px-6 py-2 text-gray-600 dark:text-gray-300 font-semibold hover:text-gray-800 dark:hover:text-white transition-colors">
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenericManagerModal;
