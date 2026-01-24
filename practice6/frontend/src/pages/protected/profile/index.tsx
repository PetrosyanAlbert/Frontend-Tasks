import { useNavigate, useOutletContext } from "react-router-dom";
import type { IContext } from "../../types/utility";
import { Search } from "./Search";

export const Profile = () => {
    const { user } = useOutletContext<IContext>();
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
                {/* Hero Section */}
                <div className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 mb-12">
                            {/* Avatar */}
                            <div className="relative group flex-shrink-0">
                                {/* Glow Background */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                                {/* Avatar Container */}
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border-4 border-indigo-500/80 shadow-2xl overflow-hidden ring-1 ring-indigo-400/20">
                                    <img
                                        src={
                                            user.avatar ||
                                            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
                                        }
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Online Status Badge */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-slate-950 rounded-full shadow-lg"></div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent mb-2">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-indigo-400/80 text-lg font-medium mb-6">
                                    @{user.username}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() =>
                                            navigate("/account/requests")
                                        }
                                        className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transform hover:scale-105"
                                    >
                                        Follow Requests
                                    </button>
                                    <button className="px-6 sm:px-8 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-indigo-300 font-semibold rounded-lg border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                    {user.followers.length}
                                </p>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                    Followers
                                </p>
                            </div>

                            <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                    {user.followings.length}
                                </p>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                    Following
                                </p>
                            </div>

                            <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                    {user.posts.length}
                                </p>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                    Posts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                {user.posts.length > 0 && (
                    <div className="pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300">
                                    My Posts
                                </h2>
                                <span className="ml-auto px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                                    {user.posts.length}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {user.posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-slate-800/60"
                                    >
                                        {post.title && (
                                            <h3 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 group-hover:text-indigo-200 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        )}
                                        {post.description && (
                                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
                                                {post.description}
                                            </p>
                                        )}

                                        {/* Post Meta & Actions */}
                                        <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <time>
                                                    {new Date(
                                                        post.createdAt,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </time>
                                            </div>

                                            {/* Like & Comments Actions */}
                                            <div className="flex items-center gap-2">
                                                {/* Like Button */}
                                                <button className="group/like flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-900/20">
                                                    <svg
                                                        className="w-4 h-4 transition-all duration-200 text-red-400/60 group-hover/like:text-red-400 group-hover/like:scale-110"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-xs text-slate-400 group-hover/like:text-red-400 transition-colors duration-200">
                                                        {post.likesCount}
                                                    </span>
                                                </button>

                                                {/* Comments Button */}
                                                <button className="group/comment flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-indigo-900/20">
                                                    <svg
                                                        className="w-4 h-4 transition-all duration-200 text-indigo-400/60 group-hover/comment:text-indigo-400 group-hover/comment:scale-110"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                        />
                                                    </svg>
                                                    <span className="text-xs text-slate-400 group-hover/comment:text-indigo-400 transition-colors duration-200">
                                                        0
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Bio Card */}
                        <div className="bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-indigo-300">
                                    About Me
                                </h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                                {user.bio ||
                                    "This user hasn't added a bio yet."}
                            </p>
                        </div>

                        {/* Discover Friends Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-indigo-300">
                                    Discover Friends
                                </h2>
                            </div>
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
