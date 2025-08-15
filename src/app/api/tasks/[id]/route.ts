import { updateTaskServer } from '@/entities/Task/model/tasks';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(req: NextRequest) {
    const body = await req.json();

    const updatedTask = await updateTaskServer(body);

    return NextResponse.json(updatedTask);
}
