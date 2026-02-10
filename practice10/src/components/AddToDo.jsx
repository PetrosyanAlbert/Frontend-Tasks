import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../features/todos/todosSlice";

export const AddToDo = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addToDo(text));
        setText("");
    };
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">
                Add New Task
            </h2>
            <div className="flex gap-3">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="What needs to be done?"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <button
                    onClick={handleAdd}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
                >
                    Add
                </button>
            </div>
        </div>
    );
};
