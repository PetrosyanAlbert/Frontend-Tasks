"use client";

import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const res = await axios.post("/api/auth/register", {
                name,
                password,
            });

            setSuccess(res.data.message || "Registered successfully");
            setName("");
            setPassword("");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-slate-800 border border-slate-600 p-6 rounded-xl shadow-2xl"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Register
                </h1>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-slate-200">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-500 text-white rounded px-3 py-2
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-slate-200">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-500 text-white rounded px-3 py-2
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-400 font-semibold bg-red-950 border border-red-500 px-3 py-2 rounded">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-4 text-sm text-green-400 font-semibold bg-green-950 border border-green-500 px-3 py-2 rounded">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded
                               transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="mt-5 text-sm text-center text-slate-300">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-400 hover:text-blue-300 underline font-semibold"
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
