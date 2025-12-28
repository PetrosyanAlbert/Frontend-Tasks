import { useToDos } from "../context/ToDoContext";

const Filter = () => {
    const { setFilter } = useToDos();
    return (
        <div>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
    );
};

export default Filter;
