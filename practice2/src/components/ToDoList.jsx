import { useToDos } from "../context/ToDoContext";
import ToDoItem from "./ToDoItem";
const ToDoList = () => {
    const {todos} = useToDos();
    if (todos.length === 0) {
        return <p>No todos yet</p>;
    }
    return (
        <div>
            {todos.map(t => (
                <ToDoItem key={t.id} todo={t}/>
            ))}
        </div>
    )
}
export default ToDoList;