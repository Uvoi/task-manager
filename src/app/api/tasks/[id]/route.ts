import { deleteTaskServer, updateTaskServer } from '@/entities/Task/model/tasks';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(req: NextRequest) {
    const body = await req.json();

    const updatedTask = await updateTaskServer(body);

    return NextResponse.json(updatedTask);
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
    ) {
    const taskId = Number(params.id);

    if (isNaN(taskId)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const deletedTask = await deleteTaskServer(taskId);

    return NextResponse.json(deletedTask);
}