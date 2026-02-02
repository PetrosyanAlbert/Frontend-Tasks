"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: User;
};

export default function PostPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<Post[]>("/api/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-emerald-400 text-xl">
                Loading posts...
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-black p-8 text-white">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-wider text-emerald-400">
                    Posts
                </h1>
                <p className="text-sm text-gray-400 mt-2">
                    All posts created by users
                </p>
                <div className="h-1 w-24 bg-emerald-500 mt-4 rounded-full" />
            </div>

            {/* Posts list */}
            <div className="space-y-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="border border-emerald-500/30 rounded-lg p-6 bg-gray-950 hover:border-emerald-400 transition"
                        >
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {post.title}
                            </h2>

                            {/* Content */}
                            <p className="text-gray-300 mb-4 whitespace-pre-line">
                                {post.content}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-800 pt-4">
                                <div>
                                    By{" "}
                                    <span className="text-emerald-400 font-medium">
                                        {post.user.name}
                                    </span>{" "}
                                    ({post.user.email})
                                </div>

                                <div>
                                    {new Date(post.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No posts yet.</p>
                )}
            </div>
        </div>
    );
}



