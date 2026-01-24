import { getUserById } from "@/lib/usersStore";
import Link from "next/link";

export default async function UserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const user = await getUserById(id);

    if (!user) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-green-400 mb-6">
                        User not found
                    </h2>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-md transition-colors duration-200"
                    >
                        Go Back
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 mb-8"
                    >
                        <span className="mr-2">←</span>
                        Back to Users
                    </Link>
                </div>

                <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-8">
                    <h2 className="text-4xl font-bold text-green-400 mb-8">
                        User Profile
                    </h2>

                    <div className="space-y-6">
                        <div className="pb-6 border-b border-green-500/20">
                            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                User ID
                            </span>
                            <p className="text-white text-lg mt-2 font-mono text-green-300">
                                {user.id}
                            </p>
                        </div>

                        <div className="pb-6 border-b border-green-500/20">
                            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                Full Name
                            </span>
                            <p className="text-white text-2xl font-semibold mt-2">
                                {user.name}
                            </p>
                        </div>

                        <div className="pb-6 border-b border-green-500/20">
                            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                Email Address
                            </span>
                            <p className="text-green-300 text-lg mt-2">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                                Age
                            </span>
                            <p className="text-white text-xl font-semibold mt-2">
                                {user.age} years old
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
