import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [
        { id: 1, text: "Learn Redux", completed: false },
        { id: 2, text: "Learn React", completed: true },
        { id: 3, text: "Build Todo App", completed: false },
    ],
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addToDo: (state, action) => {
            state.list.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },
        removeToDo: (state, action) => {
            state.list = state.list.filter((t) => t.id !== action.payload);
        },
        toggleToDo: (state, action) => {
            const todo = state.list.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
    },
});

export const { addToDo, removeToDo, toggleToDo } = todosSlice.actions;
export const todosReduser = todosSlice.reducer;
