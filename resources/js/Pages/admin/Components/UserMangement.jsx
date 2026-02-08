import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    UserPlusIcon,
    TrashIcon,
    ShieldCheckIcon,
    LockClosedIcon,
    EnvelopeIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import DeleteModel from "./DeleteModel";

export default function UserManagement() {
    const { app_url } = usePage().props;
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { auth } = usePage().props;
    const user = auth.user;
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${app_url}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${app_url}/users`, formData);
            setFormData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        await axios.delete(`${app_url}/users/${selectedUser.id}`);
        setDeleteIsOpen(false);
        fetchUsers();
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        إدارة المديرين
                    </h3>
                    <p className="text-sm text-gray-500">
                        إضافة وصلاحيات المسؤولين عن لوحة التحكم
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section:  */}
                <div className="lg:col-span-1">
                    <form
                        onSubmit={handleAddUser}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <h4 className="font-bold mb-4 flex items-center gap-2 dark:text-white">
                            <UserPlusIcon className="h-5 w-5 text-purple-500" />{" "}
                            إضافة مدير جديد
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    الاسم الكامل
                                </label>
                                <div className="relative">
                                    <UserIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full pr-10 pl-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="اسم المدير"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    البريد الإلكتروني
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full pr-10 pl-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
                                    <input
                                        required
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full pr-10 pl-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {" "}
                                    تأكيد كلمة المرور{" "}
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
                                    <input
                                        required
                                        type="password"
                                        value={formData.password_confirmation}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password_confirmation:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full pr-10 pl-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "جاري الحفظ..." : "إنشاء حساب مدير"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                                        المدير
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold dark:text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.role !== "super_admin" && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setDeleteIsOpen(true);
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {deleteIsOpen && (
                <DeleteModel
                    closeModal={() => setDeleteIsOpen(false)}
                    onConfirm={handleDelete}
                    itemName={`المدير: ${selectedUser.name}`}
                />
            )}
        </div>
    );
}
