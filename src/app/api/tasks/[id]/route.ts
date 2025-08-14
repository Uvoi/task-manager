import { updateTask } from '@/entities/Task/model/tasks';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(req: NextRequest) {
    const id = Number(req.nextUrl.pathname.split('/').pop());
    const body = await req.json();

    const updatedTask = await updateTask(body);

    return NextResponse.json(updatedTask);
}
