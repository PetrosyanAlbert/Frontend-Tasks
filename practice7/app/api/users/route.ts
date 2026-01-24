import { createUser, readFile } from "@/lib/usersStore";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    try {
        const users = await readFile();
        return NextResponse.json(users, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, age } = body;
        if (!name || !email || !age) {
            return NextResponse.json(
                { message: "name, email and age are required" },
                { status: 400 },
            );
        }
        const newUser = {
            id: uuidv4(),
            name,
            email,
            age: Number(age),
        };
        const created = await createUser(newUser);
        return NextResponse.json(created, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 },
        );
    }
}
