"use client";

import axios from "axios";
import { useState } from "react";

type Props = {
    onUserCreated: (user: any) => void;
};

export default function СreateUserForm({ onUserCreated }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!name || !email) return;
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post("/api/users", { name, email });
            onUserCreated(res.data);
            setName("");
            setEmail("");
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError("User with this email already exists");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-black/80 p-6 rounded-lg shadow-lg border border-emerald-200 dark:border-emerald-900">
            <h2 className="text-xl font-semibold text-black dark:text-emerald-300 mb-4">
                Create User
            </h2>
            <div className="space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-black dark:text-emerald-200">
                        Name
                    </span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1 block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:bg-gray-900 dark:border-emerald-800 dark:text-emerald-50"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-black dark:text-emerald-200">
                        Email
                    </span>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:bg-gray-900 dark:border-emerald-800 dark:text-emerald-50"
                        type="email"
                        inputMode="email"
                    />
                </label>

                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => {
                            setName("");
                            setEmail("");
                            setError(null);
                        }}
                        type="button"
                        className="rounded-md px-3 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-emerald-200 dark:hover:bg-gray-700"
                    >
                        Reset
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Add User"}
                    </button>
                </div>
            </div>
            {error && (
                <p
                    className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
