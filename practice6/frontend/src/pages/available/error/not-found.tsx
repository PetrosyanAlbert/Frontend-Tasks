import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* 404 Text */}
                <div className="relative mb-8">
                    <h1 className="text-9xl md:text-[150px] font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 -z-10"></div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved
                    to another location.
                </p>

                {/* Decorative Elements */}
                <div className="flex justify-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
                    <div
                        className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                        className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                    ></div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-indigo-500/50"
                    >
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-slate-600 text-slate-100 font-semibold hover:bg-slate-800/50 hover:border-indigo-400 transform hover:scale-105 transition-all duration-200"
                    >
                        Go Back
                    </button>
                </div>

                {/* Illustration */}
                <div className="mt-12 relative">
                    <div className="w-32 h-32 mx-auto opacity-20 mb-6">
                        <svg
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full text-indigo-400"
                        >
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M70 100 L85 115 L130 70"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <p className="text-sm text-slate-400">
                        Lost in the void? Let's get you back on track.
                    </p>
                </div>
            </div>
        </div>
    );
};
