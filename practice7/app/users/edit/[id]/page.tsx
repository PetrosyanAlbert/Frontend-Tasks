"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    age: number;
};

export default function EditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();

    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { id } = await params;
            setId(id);

            const res = await fetch(`http://localhost:3000/api/users/${id}`);
            const data = await res.json();

            setUser(data);
            setLoading(false);
        })();
    }, [params]);

    const handleUpdate = async () => {
        if (!user || !id) return;

        await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                age: user.age,
            }),
        });
        console.log(user);
        router.refresh();
        router.push(`/users/${id}`);
    };

    const handleDelete = async () => {
        if (!id) return;
        const ok = confirm("Are you sure you want to delete this user?");
        if (!ok) return;
        await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "DELETE",
        });
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-green-400 text-lg">
                Loading user...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-lg">
                User not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md border border-green-500/40 rounded-xl p-8 bg-black shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <h2 className="text-green-400 text-2xl font-bold mb-6 text-center">
                    Edit User
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />

                    <input
                        className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                        placeholder="Age"
                        value={user.age}
                        onChange={(e) =>
                            setUser({ ...user, age: Number(e.target.value) })
                        }
                    />

                    <button
                        onClick={handleUpdate}
                        className="mt-4 bg-green-500/10 border border-green-500 text-green-400 py-2 rounded-lg font-semibold 
                       hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                        Update User
                    </button>
                    <button
                        onClick={handleDelete}
                        className="mt-4 bg-green-500/10 border border-green-500 text-green-400 py-2 rounded-lg font-semibold 
                       hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                        Delete User
                    </button>
                </div>
            </div>
        </div>
    );
}
