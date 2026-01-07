import type { Action, IState } from "./types";

export const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter((u) => u.id !== action.payload),
            };
        case "SALARY_UP":
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload
                        ? { ...u, salary: u.salary + 100000 }
                        : u
                ),
            };
        case "SET_LIMIT":
            return {
                ...state,
                limit: action.payload,
            };
        default:
            return state;
    }
};
