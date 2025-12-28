import type { Dispatch } from "react";

export interface IUser {
    id: number;
    name: string;
    age: number;
    salary: number;
}

export interface IState {
    users: IUser[];
    limit: Limit;
}

export type Limit = number | "all";

export type Action =
    | { type: "DELETE_USER"; payload: number }
    | { type: "SALARY_UP"; payload: number }
    | { type: "ADD_USER"; payload: IUser }
    | { type: "SET_LIMIT"; payload: Limit };

export interface IContextType {
    state: IState;
    dispatch: Dispatch<Action>;
}
