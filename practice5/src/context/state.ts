import type { IState } from "./types";

export const initialState: IState = {
    users: [
        { id: 101, name: "Tiko", age: 21, salary: 1200000 },
        { id: 102, name: "Gago", age: 26, salary: 12200000 },
        { id: 103, name: "Grno", age: 27, salary: 2200000 },
        { id: 104, name: "Alen", age: 29, salary: 4200000 },
        { id: 105, name: "Arman", age: 40, salary: 5200000 },
        { id: 106, name: "Bond", age: 48, salary: 200000 },
        { id: 107, name: "James", age: 49, salary: 600000 },
        { id: 108, name: "Bob", age: 50, salary: 400000 },
        { id: 109, name: "Jora", age: 51, salary: 100000 },
    ],
    limit: "all",
};
