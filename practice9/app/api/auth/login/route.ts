import { User } from "@/app/(lib)/(models)/UserModel";
import { initDB } from "@/app/(lib)/init-db";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

const MAX_ATTEMPTS = 3;
const LOCK_MINUTES = 10;

export async function POST(req: NextRequest) {
    await initDB();
    const { name, password } = await req.json();
    if (!name || !password) {
        return Response.json(
            { message: "All field are required" },
            { status: 400 },
        );
    }
    const user = await User.findOne({ where: { name } });
    if (!user) {
        return Response.json(
            { message: "Invalid credentials" },
            { status: 401 },
        );
    }
    console.log("password:", password);
    console.log("user.password:", user.password);
    console.log("user", user);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts === MAX_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
        }
        user.failedLoginAttempts = 0;
        await user.save();
        return Response.json({ message: "Try later" }, { status: 401 });
    }
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();
    return Response.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
        },
    });
}
