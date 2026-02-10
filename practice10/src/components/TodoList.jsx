import { useDispatch, useSelector } from "react-redux";
import { removeToDo, toggleToDo } from "../features/todos/todosSlice";

export const ToDoList = () => {
    const todos = useSelector((state) => state.todos.list);
    const dispatch = useDispatch();

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
                Tasks ({todos.length})
            </h2>
            <ul className="space-y-3">
                {todos.length === 0 ? (
                    <li className="text-center py-8 text-white/50">
                        No tasks yet. Add one to get started! 🚀
                    </li>
                ) : (
                    todos.map((t) => (
                        <li
                            key={t.id}
                            onClick={() => dispatch(toggleToDo(t.id))}
                            className={`flex items-center justify-between p-4 rounded-lg border border-white/20 transition-all ${
                                t.completed
                                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white/60 line-through"
                                    : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-2xl">
                                    {t.completed ? "✅" : "⭕"}
                                </span>
                                <span className="text-lg">{t.text}</span>
                            </div>
                            <button
                                onClick={() => dispatch(removeToDo(t.id))}
                                className="px-4 py-2 rounded-lg bg-red-500/30 text-red-200 hover:bg-red-500/50 transition-all text-sm font-medium"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};
