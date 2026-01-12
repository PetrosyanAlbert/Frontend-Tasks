import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "../../config/axios";
import type { IAccount } from "../types/utility";

export const Protected = () => {
    const [account, setAccount] = useState<IAccount | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get<{ user: IAccount }>("/auth/user")
            .then((res) => {
                setAccount(res.data.user);
            })
            .catch(() => navigate("/signin"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        account && (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
                {/* Sidebar */}
                <aside className="w-64 bg-slate-800/80 backdrop-blur-md border-r border-slate-700 p-6 shadow-2xl">
                    <h2 className="text-2xl font-bold text-lime-400 mb-8">
                        Profile
                    </h2>

                    <nav className="flex flex-col gap-3">
                        <Link
                            to={"/account"}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                        >
                            Profile
                        </Link>
                        <Link
                            to={"/account/settings"}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                        >
                            Settings
                        </Link>
                        <Link
                            to={"/account/followers"}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                        >
                            Followers
                        </Link>
                        <Link
                            to={"/account/followings"}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                        >
                            Followings
                        </Link>
                        <Link
                            to={"/account/posts"}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                        >
                            Posts
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200 border border-slate-700"
                        >
                            Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-6">
                        <Outlet context={{ user: account, setUser: setAccount }} />
                    </div>
                </main>
            </div>
        )
    );
};
