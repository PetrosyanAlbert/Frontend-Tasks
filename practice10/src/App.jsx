import { AddToDo } from "./components/AddToDo";
import { ToDoList } from "./components/TodoList";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
                            ✓
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">
                                Task Manager
                            </h1>
                            <p className="text-purple-200 text-sm mt-1">
                                Organize your day, boost your productivity
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid gap-8">
                    <AddToDo />
                    <ToDoList />
                </div>
            </main>
        </div>
    );
}
