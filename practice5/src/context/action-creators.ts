import type { Action, IUser } from "./types";

export const addUser = (user: IUser): Action => ({
    type: "ADD_USER",
    payload: user,
});

export const deleteUser = (id: number): Action => ({
    type: "DELETE_USER",
    payload: id,
});

export const salaryUp = (id: number): Action => ({
    type: "SALARY_UP",
    payload: id,
});

export const setLimit = (value: number | "all"): Action => ({
    type: "SET_LIMIT",
    payload: value,
});
