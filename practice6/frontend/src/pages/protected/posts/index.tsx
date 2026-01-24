import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../types/utility";
import { useState } from "react";
import { Axios } from "../../../config/axios";

export const Posts = () => {
    const { user, setUser } = useOutletContext<IContext>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async () => {
        if (!title.trim() || !description.trim()) return;

        try {
            setLoading(true);
            setError("");

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);

            const res = await Axios.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newPost = res.data.postInfo;

            setUser({
                ...user,
                posts: [newPost, ...user.posts],
            });

            setTitle("");
            setDescription("");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId: number) => {
        try {
            await Axios.delete(`/posts/${postId}`);

            setUser({
                ...user,
                posts: user.posts.filter((p) => p.id !== postId),
            });
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to delete post");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center md:text-left mb-8">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-3">
                    Posts
                </h1>
                <p className="text-slate-400 text-lg">
                    Share your ideas and connect with your community
                </p>
            </div>

            {/* Create Post Card */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-xl hover:shadow-indigo-500/10 transition-shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-indigo-300 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        Create New Post
                    </h2>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        Post Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your post a catchy title..."
                        className="w-full px-5 py-3 bg-slate-700/50 text-white border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-400 text-base"
                    />
                </div>

                {/* Description Textarea */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Share your thoughts, ideas, or stories..."
                        rows={6}
                        className="w-full px-5 py-3 bg-slate-700/50 text-white border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-400 resize-none text-base leading-relaxed"
                    />
                    <div className="text-xs text-slate-400 mt-2">
                        {description.length} characters
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-300 flex items-start gap-3">
                        <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleCreate}
                    disabled={loading || !title.trim() || !description.trim()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-slate-600 disabled:to-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/40 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Posting...
                        </>
                    ) : (
                        <>
                            <span>✨</span> Publish Post
                        </>
                    )}
                </button>
            </div>

            {/* Posts Feed */}
            <div>
                <h2 className="text-2xl font-bold text-indigo-200 mb-6">
                    Your Posts
                </h2>

                {!user.posts || user.posts.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-16 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-slate-300 text-xl font-semibold mb-2">
                            No posts yet
                        </h3>
                        <p className="text-slate-500">
                            Be the first to share your thoughts!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {user.posts.map((post) => (
                            <div
                                key={post.id}
                                className="group bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        {/* Post Title */}
                                        <h3 className="text-2xl font-bold text-indigo-300 mb-3 break-words">
                                            {post.title}
                                        </h3>

                                        {/* Post Content */}
                                        <p className="text-slate-200 text-base leading-relaxed mb-4 break-words">
                                            {post.description}
                                        </p>

                                        {/* Post Meta & Actions */}
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
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
                                                {post.location && (
                                                    <div className="flex items-center gap-1">
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span>
                                                            {post.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Like & Comments Actions */}
                                        <div className="flex items-center gap-2 mt-4">
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
                                                    0
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

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 text-red-400/70 hover:text-red-400 hover:bg-red-900/20 rounded-lg flex-shrink-0"
                                        title="Delete post"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
