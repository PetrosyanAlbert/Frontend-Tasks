"use client";

import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lockedUntil, setLockedUntil] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setLockedUntil(null);
        setLoading(true);
        try {
            await axios.post("/api/auth/login", { name, password });
            alert("Login successful");
        } catch (err: any) {
            const status = err.response?.status;
            const data = err.response?.data;
            if (status === 403 && data?.lockedUntil) {
                setLockedUntil(new Date(data.lockedUntil).toLocaleString());
                setError("Account is locked");
            } else {
                setError(data?.message || "Login failed");
            }
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
                    Login
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

                {/* Lock info */}
                {lockedUntil && (
                    <div className="mb-4 text-sm text-yellow-300 font-semibold bg-yellow-900/40 border border-yellow-500 px-3 py-2 rounded">
                        Try again after: <b>{lockedUntil}</b>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded
                               transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-5 text-sm text-center text-slate-300">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-400 hover:text-blue-300 underline font-semibold"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
