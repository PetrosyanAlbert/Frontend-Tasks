import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ToDoContext = createContext(null);
export const ToDoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const API_URL = "http://localhost:3000/todos";

    const axiosTodos = async () => {
        try {
            const res = await axios.get(API_URL);
            setTodos(res.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        axiosTodos();
    }, []);

    const addTodo = async (text) => {
        try {
            const newToDo = {
                text,
                completed: false,
            };
            const res = await axios.post(API_URL, newToDo);
            setTodos((todo) => [...todo, res.data]);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos((todo) => todo.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const toggleTodo = async (id) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        try {
            const res = await axios.patch(`${API_URL}/${id}`, {
                completed: !todo.completed,
            });
            setTodos((t) => t.map((p) => (p.id === id ? res.data : p)));
        } catch (err) {
            console.error(err.message);
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <ToDoContext.Provider
            value={{
                todos: filteredTodos,
                filter,
                setFilter,
                addTodo,
                deleteToDo,
                toggleTodo,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

export const useToDos = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("useToDos must be used inside ToDoProvider");
    }
    return context;
}