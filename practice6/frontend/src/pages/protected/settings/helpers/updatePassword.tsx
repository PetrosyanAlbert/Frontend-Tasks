import { useState } from "react";
import { Axios } from "../../../../config/axios";

export const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!currentPassword || !newPassword || !confirmPassword) {
            return setError("All fields are required");
        }
        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            setLoading(true);
            await Axios.patch("/account/settings/password", {
                currentPassword,
                newPassword,
            });
            setSuccess("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            setError(err?.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-indigo-200 mb-2">
                    Update Password
                </h2>
                <p className="text-slate-400">
                    Keep your account secure by changing your password regularly
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4"
            >
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        Current Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400"
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-300">
                        <p className="font-semibold text-sm">Error</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 text-green-300">
                        <p className="font-semibold text-sm">Success</p>
                        <p className="text-sm mt-1">{success}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-indigo-500/50"
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </form>

            {/* Security Tips */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-indigo-300 mb-3">
                    Password Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>Use at least 8 characters</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>
                            Mix uppercase, lowercase, numbers and symbols
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>Avoid using personal information</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
