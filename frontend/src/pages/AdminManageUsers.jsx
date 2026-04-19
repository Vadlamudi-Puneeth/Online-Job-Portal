import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAuthHeader, isAdmin } from "../utils/auth";

const API_BASE_URL = "http://localhost:8082";

function AdminManageUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!isAdmin()) {
            navigate("/HomeAfterLogin");
            return;
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/auth/users`, {
                headers: getAuthHeader(),
            });
            if (response.ok) {
                setUsers(await response.json());
            }
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 font-sans transition-colors duration-300">
            <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/HomeAfterLogin")}>
                    <div className="w-10 h-10 bg-brand-ocean rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                        <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h2 className="text-2xl font-black text-brand-ocean">User Management</h2>
                </div>
                <button onClick={() => navigate("/HomeAfterLogin")} className="px-5 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white font-bold rounded-xl transition-all">Back</button>
            </header>

            <main className="container mx-auto px-6 pt-12 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h1 className="text-4xl font-black dark:text-white">Platform <span className="text-brand-ocean">Users</span></h1>
                    <input 
                        type="text"
                        placeholder="Filter by name, email or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 px-6 py-3 bg-white dark:bg-gray-800 border-none rounded-2xl shadow-xl outline-none dark:text-white"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-brand-ocean border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {filteredUsers.map((user, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                            <td className="px-8 py-6 font-bold dark:text-white">{user.username}</td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400">{user.email}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 
                                                    user.role === 'RECRUITER' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400">{user.phoneNumber || 'N/A'}</td>
                                            <td className="px-8 py-6">
                                                <button className="text-red-500 font-bold hover:underline">Revoke Access</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminManageUsers;
