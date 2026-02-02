import { Post, User } from "@/app/(lib)/(models)";
import { NextRequest } from "next/server";
import { col } from "sequelize";

export async function GET() {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [[col("created_at"), "DESC"]],
        });
        return Response.json(posts);
    } catch (err: any) {
        return Response.json({ message: err.message });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const post = await Post.create({
            title: body.title,
            content: body.content,
            userId: body.userId,
        });
        return Response.json(post, { status: 201 });
    } catch (err: any) {
        return Response.json({ message: err.message }, { status: 500 });
    }
}
