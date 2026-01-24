import Link from "next/link";

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}

export default async function HomePage() {
    const users = await getUsers();

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-green-400 mb-2">
                        Users List
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                </div>

                {users.length === 0 ? (
                    <div className="flex items-center justify-center min-h-96">
                        <p className="text-xl text-gray-400">No users yet...</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {users.map((user: any) => (
                            <li
                                key={user.id}
                                className="bg-gray-900 border border-green-500/30 rounded-lg p-6 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                            Name
                                        </span>
                                        <p className="text-white text-lg font-semibold">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                            Email
                                        </span>
                                        <p className="text-green-300">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                            Age
                                        </span>
                                        <p className="text-white">{user.age}</p>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-green-500/20">
                                        <Link
                                            href={`/users/${user.id}`}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-md transition-colors duration-200"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/users/edit/${user.id}`}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-green-400 font-semibold border border-green-500/30 hover:border-green-400 rounded-md transition-colors duration-200"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
