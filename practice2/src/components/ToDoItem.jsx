import { useToDos } from "../context/ToDoContext";

const ToDoItem = ({ todo }) => {
    const { toggleTodo, deleteToDo } = useToDos();

    return (
        <div>
            <p>{todo.text}</p>
            <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "cancel" : "complete"}
            </button>
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
        </div>
    );
};

export default ToDoItem;
