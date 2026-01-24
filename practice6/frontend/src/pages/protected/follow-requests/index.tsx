import { Axios } from "../../../config/axios";
import { useHttp } from "../../../config/helpers/useHttp";
import type { IFollowRequest } from "../../types/utility";
import { Link } from "react-router-dom";
import { Image } from "../profile/Image";

export const FollowRequest = () => {
    const { data, loading, error, refetch } = useHttp<{
        requests: IFollowRequest[];
    }>("/follow/requests");

    const accept = async (requestId: number) => {
        await Axios.patch(`/follow/requests/accept/${requestId}`);
        refetch();
    };

    const reject = async (requestId: number) => {
        await Axios.patch(`/follow/requests/decline/${requestId}`);
        refetch();
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-10 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                                Follow Requests
                            </h1>
                        </div>
                        <p className="text-slate-400 text-lg ml-5">
                            Manage your incoming follow requests
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
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
                                    Loading requests...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="p-6 bg-red-900/20 border border-red-800/50 rounded-xl">
                            <p className="text-red-300 text-lg flex items-center gap-3">
                                <span>⚠️</span>
                                Failed to load follow requests
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {data && data.requests.length === 0 && !loading && (
                        <div className="bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 border-dashed rounded-xl p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-4">
                                <svg
                                    className="w-8 h-8 text-indigo-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3.5a1.5 1.5 0 01-1.5-1.5V5a1.5 1.5 0 011.5-1.5h17a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5z"
                                    />
                                </svg>
                            </div>
                            <p className="text-slate-300 text-lg font-medium mb-2">
                                No follow requests
                            </p>
                            <p className="text-slate-400">
                                You don't have any pending follow requests at
                                the moment.
                            </p>
                        </div>
                    )}

                    {/* Requests List */}
                    {data && data.requests.length > 0 && (
                        <div className="space-y-4">
                            {data.requests.map((req) => (
                                <div
                                    key={req.id}
                                    className="group bg-slate-800/40 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/60"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        {/* User Info */}
                                        <Link
                                            to={`/account/${req.sender.username}`}
                                            className="flex items-center gap-4 flex-1 min-w-0"
                                        >
                                            <div className="relative flex-shrink-0">
                                                {/* Avatar Glow */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                                                {/* Avatar */}
                                                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border-2 border-indigo-500/60 shadow-lg overflow-hidden">
                                                    <Image
                                                        src={req.sender.avatar}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* User Details */}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors truncate">
                                                    {req.sender.firstName}{" "}
                                                    {req.sender.lastName}
                                                </h3>
                                                <p className="text-indigo-400/70 text-sm group-hover:text-indigo-400 transition-colors truncate">
                                                    @{req.sender.username}
                                                </p>
                                                {req.sender.bio && (
                                                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                                        {req.sender.bio}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => accept(req.id)}
                                                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 text-sm sm:text-base"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => reject(req.id)}
                                                className="px-4 sm:px-6 py-2.5 bg-slate-700/80 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all duration-300 text-sm sm:text-base"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};