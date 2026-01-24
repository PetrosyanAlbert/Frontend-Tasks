import { useNavigate, useParams } from "react-router-dom";
import { useAction, useHttp } from "../../../config/helpers/useHttp";
import type { IAccountView } from "../../types/utility";
import { Image } from "../profile/Image";
import { Axios } from "../../../config/axios";

export const Account = () => {
    const { username } = useParams();
    const { data, loading, refetch } = useHttp<IAccountView>(
        `/account/${username}`,
    );
    const navigate = useNavigate();

    if (data && !data.user) {
        return navigate("/account");
    }
    const { fetch: follow } = useAction(`/follow/${data?.user?.id}`);

    const handleFollow = () => {
        if (data) {
            follow();
            setTimeout(() => {
                refetch();
            }, 500);
        }
    };

    const getFollowRequest = () => {
        if (data?.followStatus) return "Unfollow";
        if (data?.requestSent) return "Cancel Request";
        if (data?.user.isAccountPrivate) return "Request Follow";
        return "Follow";
    };

    const handleLike = async (postId: number) => {
        await Axios.post(`/posts/${postId}/likes`);
        refetch();
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative w-16 h-16">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-spin"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                                }}
                            ></div>
                            <div className="absolute inset-2 bg-slate-950 rounded-full"></div>
                        </div>
                        <p className="text-slate-300 text-lg font-medium">
                            Loading profile...
                        </p>
                    </div>
                </div>
            )}

            {/* User Profile */}
            {data && (
                <div className="relative min-h-screen">
                    {/* Background Decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        {/* Header Section */}
                        <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Avatar with Glow Effect */}
                                <div className="flex flex-col items-center mb-10">
                                    <div className="relative mb-8 group">
                                        {/* Glow Background */}
                                        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                                        {/* Avatar Container */}
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border-4 border-indigo-500/80 shadow-2xl overflow-hidden ring-1 ring-indigo-400/20">
                                            <Image
                                                src={data.user.avatar}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Online Status Badge */}
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-slate-950 rounded-full shadow-lg"></div>
                                    </div>

                                    {/* User Info */}
                                    <div className="text-center">
                                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent mb-2">
                                            {data.user.firstName}{" "}
                                            {data.user.lastName}
                                        </h1>
                                        <p className="text-indigo-400/80 text-lg font-medium mb-6">
                                            @{username}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={() => handleFollow()}
                                                className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transform hover:scale-105"
                                            >
                                                {getFollowRequest()}
                                            </button>
                                            <button className="px-6 sm:px-8 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-indigo-300 font-semibold rounded-lg border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300">
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                                    <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                        <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                            {data.user.followers.length}
                                        </p>
                                        <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                            {data.user.followers.length === 1
                                                ? "Follower"
                                                : "Followers"}
                                        </p>
                                    </div>

                                    <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                        <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                            {data.user.followings.length}
                                        </p>
                                        <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                            Following
                                        </p>
                                    </div>

                                    <div className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-all duration-300">
                                        <p className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                                            {data.user.posts.length}
                                        </p>
                                        <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                            Posts
                                        </p>
                                    </div>
                                </div>

                                {/* Bio Section */}
                                {data.user.bio && (
                                    <div className="bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                            <h3 className="text-xl font-bold text-indigo-300">
                                                About
                                            </h3>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed text-base">
                                            {data.user.bio}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Posts Section */}
                        {data.user.posts.length > 0 && (
                            <div className="pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950">
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300">
                                            Posts
                                        </h2>
                                        <span className="ml-auto px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                                            {data.user.posts.length}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {data.user.posts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-slate-800/60 cursor-pointer"
                                            >
                                                {post.title && (
                                                    <h3 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 group-hover:text-indigo-200 transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                )}
                                                {post.description && (
                                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                                                        {post.description}
                                                    </p>
                                                )}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="text-indigo-400/60 text-xs font-medium group-hover:text-indigo-400 transition-colors">
                                                        Read more →
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* Like Button */}
                                                        <button
                                                            onClick={() =>
                                                                handleLike(post.id)
                                                            }
                                                            className="group/like flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-900/20"
                                                        >
                                                            <svg
                                                                className="w-4 h-4 transition-all duration-200 text-red-400/60 group-hover/like:text-red-400 group-hover/like:scale-110"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                                />
                                                            </svg>
                                                            <span className="text-xs text-slate-400 group-hover/like:text-red-400 transition-colors duration-200">
                                                                {
                                                                    post.likesCount
                                                                }
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
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

                        {/* Empty Posts State */}
                        {data.user.posts.length === 0 && (
                            <div className="pb-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <div className="bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 border-dashed rounded-xl p-12 text-center">
                                        <p className="text-slate-400 text-lg">
                                            No posts yet. Check back soon!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
