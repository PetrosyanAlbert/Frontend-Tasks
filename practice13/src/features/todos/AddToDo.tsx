import { useState } from "react";
import { useAddToDosMutation } from "./todosApiSlice";

export const AddToDo = () => {
    const [title, setTitle] = useState("");
    const [addToDo, { isLoading }] = useAddToDosMutation();

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addToDo({ title });
        setTitle("");
    };

    return (
        <form onSubmit={onSubmit} className="flex gap-3">
            <div className="flex-1">
                <input
                    placeholder="Add a new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading || !title.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-600/50 flex items-center gap-2"
            >
                {isLoading ? (
                    <>
                        <span className="inline-block animate-spin">⟳</span>
                        Adding...
                    </>
                ) : (
                    <>
                        <span>+</span>
                        Add
                    </>
                )}
            </button>
        </form>
    );
};
