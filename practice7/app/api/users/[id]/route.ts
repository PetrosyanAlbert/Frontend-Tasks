import { deleteUser, getUserById, updateUser } from "@/lib/usersStore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to get user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const body = await request.json();

    const updated = await updateUser(id, body);

    if (!updated) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const deleted = await deleteUser(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted" },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
