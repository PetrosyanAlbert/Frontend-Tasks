import type { Dispatch } from "react";

export interface IUser {
    id: number;
    name: string;
    age: number;
    salary: number;
}

export interface IState {
    users: IUser[];
    limit: number | "all";
}

export type Action =
    | { type: "ADD_USER"; payload: IUser }
    | { type: "DELETE_USER"; payload: number }
    | { type: "SALARY_UP"; payload: number }
    | { type: "SET_LIMIT"; payload: number | "all" };

export interface IContextType {
    state: IState;
    dispatch: Dispatch<Action>;
}
