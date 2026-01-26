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
        <main className="min-h-screen bg-black relative overflow-hidden">
            {/* background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-extrabold text-green-400 tracking-tight">
                            Users
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Fullstack CRUD system
                        </p>
                        <div className="mt-4 h-[2px] w-40 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-full" />
                    </div>

                    <Link
                        href="/users/new"
                        className="inline-flex items-center gap-2 px-6 py-3 
                                   bg-green-500/10 border border-green-500/40 
                                   text-green-400 font-semibold rounded-xl
                                   hover:bg-green-500 hover:text-black 
                                   hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]
                                   transition-all duration-300"
                    >
                        <span className="text-xl">+</span>
                        Add User
                    </Link>
                </div>

                {/* Content */}
                {users.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <p className="text-xl text-gray-400 mb-2">No users yet</p>
                            <p className="text-sm text-gray-600">Create your first user</p>
                        </div>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {users.map((user: any) => (
                            <li
                                key={user.id}
                                className="group relative bg-black/60 backdrop-blur 
                                           border border-green-500/20 rounded-2xl p-6
                                           hover:border-green-400/60 
                                           hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
                                           transition-all duration-300"
                            >
                                {/* glow border */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 
                                                group-hover:opacity-100 
                                                transition duration-300
                                                shadow-[inset_0_0_30px_rgba(34,197,94,0.15)]" />

                                <div className="relative z-10 space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                                            Name
                                        </p>
                                        <p className="text-xl font-semibold text-white">
                                            {user.name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                                            Email
                                        </p>
                                        <p className="text-green-300 break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                                            Age
                                        </p>
                                        <p className="text-white">
                                            {user.age}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-green-500/20 flex gap-3">
                                        <Link
                                            href={`/users/${user.id}`}
                                            className="flex-1 text-center px-4 py-2 rounded-lg
                                                       bg-green-500 text-black font-semibold
                                                       hover:bg-green-400 
                                                       transition-all duration-200"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={`/users/edit/${user.id}`}
                                            className="flex-1 text-center px-4 py-2 rounded-lg
                                                       bg-black border border-green-500/40
                                                       text-green-400 font-semibold
                                                       hover:bg-green-500 hover:text-black
                                                       transition-all duration-200"
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
