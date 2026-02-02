import { User } from "@/app/(lib)/(models)/UserModel";
import { initDB } from "@/app/(lib)/init-db";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await initDB();
    const { name, password } = await req.json();
    if (!name || !password) {
        return Response.json(
            { message: "All field are required" },
            { status: 400 },
        );
    }
    const exists = await User.findOne({ where: { name } });
    if (exists) {
        return Response.json(
            { message: "User alredy exists" },
            { status: 409 },
        );
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
        name,
        password: hashed,
    });
    return Response.json({ message: "Register Succsesfully" }, { status: 201 });
}
