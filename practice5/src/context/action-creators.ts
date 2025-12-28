import type { Action, Limit } from "./types";

export const deleteUser = (id: number): Action => ({
    type: "DELETE_USER",
    payload: id,
});

export const salaryUp = (id: number): Action => ({
    type: "SALARY_UP",
    payload: id,
});

export const setLimit = (limit: Limit): Action => ({
    type: "SET_LIMIT",
    payload: limit,
});
