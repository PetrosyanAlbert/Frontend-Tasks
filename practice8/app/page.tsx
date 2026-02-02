"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import СreateUserForm from "./components/СreateUserForm";

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            alert("Failed to delete user");
        }
    };

    const handleUserCreated = (user: User) => {
        setUsers((prev) => [...prev, user]);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-green-400 text-xl font-mono">
                Loading users...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black dark:bg-black p-8">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-wider text-emerald-400 dark:text-emerald-300">
                    User Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Create, view, and manage users
                </p>
                <div className="h-1 w-24 bg-emerald-500 mt-4 rounded-full" />
            </div>

            {/* Form Section */}
            <div className="mb-12">
                <СreateUserForm onUserCreated={handleUserCreated} />
            </div>

            {/* Users Grid */}
            <div>
                <h2 className="text-xl font-semibold text-black dark:text-emerald-200 mb-6">
                    Users List
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.length > 0 ? (
                        users.map((u) => (
                            <div
                                key={u.id}
                                className="group relative border border-emerald-500/30 dark:border-emerald-800/50 rounded-lg p-6 bg-white dark:bg-gray-950 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 shadow-md dark:shadow-emerald-900/20"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-lg bg-emerald-400/5 dark:bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70 font-medium mb-1">
                                                User #{u.id}
                                            </p>
                                            <h3 className="text-lg font-bold text-black dark:text-white">
                                                {u.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        {u.email}
                                    </p>

                                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                                        Created:{" "}
                                        {new Date(
                                            u.createdAt,
                                        ).toLocaleDateString()}
                                    </div>

                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="w-full rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-3 py-2 text-sm font-medium text-white transition-colors duration-200"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex items-center justify-center py-12">
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                No users yet. Create one using the form above.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
