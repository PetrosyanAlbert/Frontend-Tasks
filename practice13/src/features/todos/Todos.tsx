import { AddToDo } from "./AddToDo";
import {
    useDeleteToDosMutation,
    useGetToDosQuery,
    useToggleToDosMutation,
} from "./todosApiSlice";

export const Todos = () => {
    const { data, isLoading } = useGetToDosQuery();
    const [deleteToDo] = useDeleteToDosMutation();
    const [toggleToDo] = useToggleToDosMutation();

    const handleDelete = (id: number) => {
        deleteToDo(id);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-blue-500"></div>
            </div>
        );
    }

    const completedCount = data?.filter((t) => t.completed).length || 0;
    const totalCount = data?.length || 0;

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-blue-400">
                        {totalCount}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Total Tasks</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-green-400">
                        {completedCount}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Completed</p>
                </div>
            </div>

            {/* Progress bar */}
            {totalCount > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-blue-400 font-semibold">
                            {Math.round((completedCount / totalCount) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full"
                            style={{
                                width: `${(completedCount / totalCount) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Add Todo form */}
            <div className="border-t border-slate-700/50 pt-6">
                <AddToDo />
            </div>

            {/* Todo list */}
            {data && data.length > 0 ? (
                <ul className="space-y-3">
                    {data.map((t) => (
                        <li
                            key={t.id}
                            className={`group flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                                t.completed
                                    ? "bg-slate-800/30 border-green-500/30 hover:bg-slate-800/50"
                                    : "bg-slate-800/50 border-purple-500/30 hover:bg-slate-800/70 hover:border-purple-400/50"
                            }`}
                        >
                            {/* Checkbox */}
                            <button
                                onClick={() => toggleToDo(t)}
                                className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center transition-all duration-200 hover:border-purple-400"
                                style={{
                                    borderColor: t.completed
                                        ? "#22c55e"
                                        : undefined,
                                    backgroundColor: t.completed
                                        ? "#22c55e"
                                        : undefined,
                                }}
                            >
                                {t.completed && (
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* Title */}
                            <span
                                className={`flex-1 text-base transition-all ${
                                    t.completed
                                        ? "line-through text-gray-500"
                                        : "text-white font-medium"
                                }`}
                            >
                                {t.title}
                            </span>

                            {/* Status badge */}
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    t.completed
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                }`}
                            >
                                {t.completed ? "✓ Done" : "Todo"}
                            </span>
                            <button onClick={() => handleDelete(t.id)}>
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No tasks yet. Create one to get started! 🚀
                    </p>
                </div>
            )}
        </div>
    );
};
