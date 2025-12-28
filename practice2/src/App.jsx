import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import { ToDoProvider } from "./context/ToDoContext";
import Filter from "./components/Filter";

function App () {
    return (
        <ToDoProvider>
            <AddToDo />
            <Filter/>
            <ToDoList />
        </ToDoProvider>
    )
}

export default App;