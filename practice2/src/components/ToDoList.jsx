import {useState} from "react" 
import  {AddToDo} from "./AddToDo"
import  {List}  from "./List"

export const  ToDoList = () => {
    const [todos, setTodos] = useState([
        {id: 101, text: "go to gym", complete: false},
        {id: 102, text: "read a book", complete: false},
        {id: 103, text: "eat burger", complete: true}
    ])

    const removeItem = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const addToDo = (text) => {
        if (!text.trim()) {
            alert("ToDo cannot be empty");
            return;
        }
        const newToDo = {
            id: Date.now(),
            text,
            complete: false
        }

        const exists = todos.some(t => t.text.toLowerCase() === text.toLowerCase());
        if (exists) {
            alert("This todo already exists!");
            return;
        }
        setTodos([...todos, newToDo]);
    }

    const toggleComplete = (id) => {
        setTodos(
            todos.map(todo => todo.id === id ? 
                {...todo, complete: !todo.complete} : todo)
        )
    }

    return (
        <div className="todo-container">
            <AddToDo onAdd={addToDo} />
            <List 
            items={todos} 
            onRemove={removeItem} 
            onToggle={toggleComplete} 
            />
        </div>
    )
}