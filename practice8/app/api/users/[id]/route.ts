import { User } from "@/app/(lib)/(models)/UserModel";
import { NextRequest } from "next/server";

type Params = {
    params: { id: string };
};

export async function DELETE(_: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const userId = Number(id);
        const deletedCount = await User.destroy({
            where: { id: userId },
        });
        if (deletedCount === 0) {
            return Response.json(
                { message: "User not found" },
                { status: 404 },
            );
        }
        return Response.json({ message: "User deleted" }, { status: 200 });
    } catch (err: any) {
        return Response.json({ message: err.message }, { status: 500 });
    }
}
