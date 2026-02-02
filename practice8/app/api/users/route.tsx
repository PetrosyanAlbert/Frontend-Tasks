import { User } from "@/app/(lib)/(models)/UserModel";
import { NextRequest } from "next/server";
import { col } from "sequelize";

export const GET = async () => {
    const users = await User.findAll({
        order: [[col("created_at"), "DESC"]],
    });
    return Response.json(users);
};

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const user = await User.create({
            name: body.name,
            email: body.email,
        });
        return Response.json(user, { status: 201 });
    } catch (err: any) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return Response.json(
                { message: "Email already exists" },
                { status: 409 },
            );
        }

        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
};
