import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../types/utility";

export const Profile = () => {
    const { user } = useOutletContext<IContext>();

    return (
        <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-lime-400 shadow-lg overflow-hidden">
                    <img
                        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-white mb-2">
                {user.firstName} {user.lastName}
            </h1>

            {/* Username / Subtitle */}
            <p className="text-slate-400 mb-6">
                @{user.username}
            </p>

            {/* Bio Card */}
            <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-700 rounded-xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-lime-400 mb-3">
                    About me
                </h2>
                <p className="text-slate-300 leading-relaxed">
                    {user.bio || "This user hasn’t added a bio yet."}
                </p>
            </div>
        </div>
    );
};
