import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo } from "../../types/todo";

export const todosApi = createApi({
    reducerPath: "todosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),

    tagTypes: ["Todo"],

    endpoints: (builder) => ({
        getToDos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: ["Todo"],
        }),

        addToDos: builder.mutation<Todo, { title: string }>({
            query: ({ title }) => ({
                url: "/todos",
                method: "POST",
                body: {
                    title,
                    completed: false,
                },
            }),
            invalidatesTags: ["Todo"],
        }),

        deleteToDos: builder.mutation<void, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"],
        }),

        toggleToDos: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: "PATCH",
                body: {
                    completed: !todo.completed,
                },
            }),
            invalidatesTags: ["Todo"],
        }),
    }),
});

export const {
    useGetToDosQuery,
    useAddToDosMutation,
    useDeleteToDosMutation,
    useToggleToDosMutation,
} = todosApi;
