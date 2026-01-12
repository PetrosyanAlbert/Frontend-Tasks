import { useState } from "react";
import { Axios } from "../../../config/axios";
import type { IUser } from "../../types/utility";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp: SubmitHandler<IUser> = (form) => {
        Axios.post("/auth/signup", form)
            .then(() => {
                navigate("/signin")
            })
            .catch((err) => {
                setError(err.response.data?.message);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-lime-400 mb-2">
                        SignUp
                    </h1>
                    <p className="text-slate-400">Create your account today</p>
                </div>
                {error && <p className="text-red-400">{error}</p>}
                {/* Form Card */}
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700 hover:border-lime-400/30 transition-colors duration-300"
                >
                    {/* First Name */}
                    <div className="mb-6">
                        <label className="block text-lime-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                            First Name
                        </label>
                        <input
                            {...register("firstName", {
                                required: "First name is required",
                                pattern: {
                                    value: /^[A-Za-z]{2,18}$/,
                                    message:
                                        "First name must be 2-18 letters (A-Z)",
                                },
                            })}
                            type="text"
                            placeholder="John"
                            className="w-full px-4 py-3 bg-slate-700 text-white border-2 border-slate-600 rounded-lg focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-200 placeholder-slate-400"
                        />
                        {errors.firstName && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-6">
                        <label className="block text-lime-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                            Last Name
                        </label>
                        <input
                            {...register("lastName", {
                                required: "Last name is required",
                                pattern: {
                                    value: /^[A-Za-z]{2,18}$/,
                                    message:
                                        "Last name must be 2-18 letters (A-Z)",
                                },
                            })}
                            type="text"
                            placeholder="Doe"
                            className="w-full px-4 py-3 bg-slate-700 text-white border-2 border-slate-600 rounded-lg focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-200 placeholder-slate-400"
                        />
                        {errors.lastName && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div className="mb-6">
                        <label className="block text-lime-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                            Username
                        </label>
                        <input
                            {...register("username", {
                                required: "Username is required",
                                pattern: {
                                    value: /^[A-Za-z0-9_]{3,18}$/,
                                    message:
                                        "Username must be 3-18 characters (letters, numbers, _)",
                                },
                            })}
                            type="text"
                            placeholder="johndoe_123"
                            className="w-full px-4 py-3 bg-slate-700 text-white border-2 border-slate-600 rounded-lg focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-200 placeholder-slate-400"
                        />
                        {errors.username && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-8">
                        <label className="block text-lime-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d).{8,18}$/,
                                    message:
                                        "Password must be 8-18 chars and include letters and numbers",
                                },
                            })}
                            type="password"
                            placeholder="test1234"
                            className="w-full px-4 py-3 bg-slate-700 text-white border-2 border-slate-600 rounded-lg focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-200 placeholder-slate-400"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-lime-400 to-lime-300 text-slate-900 font-bold py-3 rounded-lg uppercase tracking-widest hover:from-lime-300 hover:to-lime-200 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-lime-400/50"
                    >
                        SignUp
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-slate-600"></div>
                        <span className="px-4 text-slate-400 text-sm">or</span>
                        <div className="flex-1 border-t border-slate-600"></div>
                    </div>

                    {/* Sign In Link */}
                    <p className="text-center text-slate-400">
                        Already have an account?{" "}
                        <a
                            href="/signin"
                            className="text-lime-400 font-semibold hover:text-lime-300 transition-colors duration-200"
                        >
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};
