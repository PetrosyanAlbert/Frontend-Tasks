import { useState } from "react";
import { useToDos } from "../context/ToDoContext";

const AddToDo = () => {
    const [text, setText] = useState("");
    const { addTodo } = useToDos();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                placeholder="Write todo..."
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">add</button>
        </form>
    );
};

export default AddToDo;
