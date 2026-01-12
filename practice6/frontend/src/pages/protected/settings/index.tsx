import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";
import type { IContext } from "../../types/utility";

export const Settings = () => {
    const { user, setUser } = useOutletContext<IContext>();
    const location = useLocation();

    const menuItems = [
        { path: "password", label: "Update Password" },
        { path: "privacy", label: "Privacy" },
        { path: "bio", label: "Bio" },
    ];

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div className="flex gap-6">
            <aside className="w-48 flex flex-col gap-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            isActive(item.path)
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                                : "text-slate-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </aside>

            <div className="flex-1">
                <Outlet context={{ user, setUser }} />
            </div>
        </div>
    );
};
