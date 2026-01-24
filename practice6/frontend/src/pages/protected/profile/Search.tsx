import { useEffect, useState } from "react";
import { Axios } from "../../../config/axios";
import type { IAccount } from "../../types/utility";
import { Link } from "react-router-dom";
import { Image } from "./Image";

export const Search = () => {
    const [text, setText] = useState("");
    const [users, setUsers] = useState<IAccount[]>([]);
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!text.trim()) {
            setUsers([]);
            return;
        }

        const timeId = setTimeout(() => {
            Axios.get<{ users: IAccount }>(`/account/search/${text}`)
                .then((response) => {
                    setUsers(response.data.users);
                })
                .catch((err) => setError(err?.response?.data));
        }, 400);

        return () => clearTimeout(timeId);
    }, [text]);

    return (
        <div className="w-full space-y-6">
            {/* Search Input */}
            <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isFocused
                        ? "bg-slate-700/80 border-2 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/20"
                        : "bg-slate-700/40 border border-slate-600/50 hover:bg-slate-700/50"
                }`}
            >
                {/* Search Icon */}
                <svg
                    className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                        isFocused ? "text-indigo-400" : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search users by name or username..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-400 text-sm"
                />

                {/* Clear Button */}
                {text && (
                    <button
                        onClick={() => setText("")}
                        className="p-1.5 hover:bg-slate-600/50 rounded-lg transition-colors duration-200 flex-shrink-0"
                        title="Clear search"
                    >
                        <svg
                            className="w-4 h-4 text-slate-400 hover:text-slate-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                    <p className="text-red-300 text-sm flex items-center gap-2">
                        <span>⚠️</span>
                        {typeof error === "string"
                            ? error
                            : "Failed to search users"}
                    </p>
                </div>
            )}

            {/* Results */}
            {text && users.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-3 px-1">
                        <h3 className="text-sm font-semibold text-slate-300">
                            Found {users.length}{" "}
                            {users.length === 1 ? "user" : "users"}
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {users.map((user) => (
                            <Link
                                key={user.id}
                                to={`/account/${user.username}`}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                            >
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600/50 group-hover:border-indigo-500/50 transition-colors duration-300">
                                        <Image
                                            src={user.avatar}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-100 font-semibold text-sm group-hover:text-indigo-300 transition-colors duration-300 truncate">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1 truncate">
                                        @{user.username}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/30 flex-shrink-0">
                                    View
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State - No Search */}
            {!text && (
                <div className="text-center py-12 px-6">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        Find new friends
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        Search by name or username to discover and connect with
                        other users
                    </p>
                </div>
            )}

            {/* Empty State - No Results */}
            {text && users.length === 0 && !error && (
                <div className="text-center py-12 px-6">
                    <div className="text-5xl mb-4">🤔</div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        No users found
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        Try searching with a different name or username
                    </p>
                </div>
            )}
        </div>
    );
};
