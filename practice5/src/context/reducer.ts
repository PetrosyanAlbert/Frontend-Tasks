import type { IState, Action } from "./types";

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
                users: state.users.filter(
                    user => user.id !== action.payload
                ),
            };

        case "SALARY_UP":
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload
                        ? { ...user, salary: user.salary + 50000 }
                        : user
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
