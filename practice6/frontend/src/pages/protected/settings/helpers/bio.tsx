import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../../types/utility";
import { useState } from "react";
import { Axios } from "../../../../config/axios";

export const Bio = () => {
    const { user, setUser } = useOutletContext<IContext>();
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const maxLength = 160;

    const handleSubmit = async () => {
        setError("");
        setSuccess("");
        if (!bio.trim()) {
            return setError("Bio cannot be empty");
        }
        try {
            setLoading(true);
            const res = await Axios.patch("/account/bio", { bio });
            if (res.data.bio !== undefined) {
                setUser({ ...user, bio: res.data.bio });
            }
            setSuccess("Bio updated successfully");
            setBio("");
        } catch (err: any) {
            setError(err?.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const charCount = bio.length;
    const isOverLimit = charCount > maxLength;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-indigo-200 mb-2">
                    Update Bio
                </h2>
                <p className="text-slate-400">
                    Tell others a bit about yourself
                </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
                {/* Bio Textarea */}
                <div>
                    <label className="block text-sm font-semibold text-indigo-300 mb-2">
                        Your Bio
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) =>
                            setBio(e.target.value.slice(0, maxLength))
                        }
                        rows={5}
                        placeholder="Write something about yourself... (max 160 characters)"
                        className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400 resize-none"
                    />

                    {/* Character Counter */}
                    <div className="flex justify-between items-center mt-2">
                        <div
                            className={`text-sm font-medium ${
                                isOverLimit ? "text-red-400" : "text-slate-400"
                            }`}
                        >
                            {charCount} / {maxLength} characters
                        </div>
                        {isOverLimit && (
                            <span className="text-xs text-red-400">
                                Limit exceeded
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-200 ${
                                isOverLimit ? "bg-red-500" : "bg-indigo-500"
                            }`}
                            style={{
                                width: `${Math.min(
                                    (charCount / maxLength) * 100,
                                    100
                                )}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Current Bio Display */}
                {user.bio && (
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                            Current Bio
                        </p>
                        <p className="text-slate-100">{user.bio}</p>
                    </div>
                )}

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
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !bio.trim()}
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-indigo-500/50"
                >
                    {loading ? "Saving..." : "Save Bio"}
                </button>
            </div>

            {/* Bio Tips */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-indigo-300 mb-3">
                    Bio Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>Keep it short and memorable</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>Add your interests or profession</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        <span>Use emojis to make it fun</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
