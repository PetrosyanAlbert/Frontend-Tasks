import { Todos } from "./features/todos/Todos";

export const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                            My Tasks
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Stay organized and track your daily tasks
                        </p>
                    </div>

                    {/* Card container */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 space-y-6">
                        <Todos />
                    </div>
                </div>
            </div>
        </div>
    );
};
