import { User } from "@/entities/User/model/types";
import { createUserServer } from "@/entities/User/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: User = await req.json();
        const user = await createUserServer(data);
        return NextResponse.json(user)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}