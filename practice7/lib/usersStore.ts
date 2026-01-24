import { IUser } from "@/types/user";
import fs from "node:fs/promises";
import path from "node:path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export async function readFile() {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
}

export async function writeFile(data: IUser[]) {
    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getUserById(id: string) {
    const users = await readFile();
    return users.find((u) => String(u.id) === String(id));
}

export async function createUser(user: IUser) {
    const users = await readFile();
    users.push(user);
    await writeFile(users);
    return user;
}

export async function updateUser(id: string, data: Partial<IUser>) {
    const users = await readFile();
    const index = users.findIndex((u) => String(u.id) === String(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    await writeFile(users);
    return users[index];
}

export async function deleteUser(id: string) {
    const users = await readFile();
    const filtred = users.filter((u) => u.id !== id);
    if (filtred.length === users.length) return false;
    await writeFile(filtred);
    return true;
}
