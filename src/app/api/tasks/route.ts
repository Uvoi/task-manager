import { NextRequest, NextResponse } from 'next/server';
import { createTask, getTasksFiltered, updateTask } from '@/entities/Task/model/tasks';
import { TaskCreateInput, TaskStatus } from '@/entities/Task/model/types';
import { TaskPriority } from '@prisma/client';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') as TaskStatus | undefined;
    const priority = url.searchParams.get('priority') as TaskPriority | undefined;
    const creatorId = url.searchParams.get('creatorId') ? Number(url.searchParams.get('creatorId')) : undefined;
    const tagIds = url.searchParams.getAll('tagIds').map(id => Number(id));

    const filters = {
        status,
        priority,
        creatorId,
        tagIds: tagIds.length ? tagIds : undefined,
    };

    const tasks = await getTasksFiltered(filters);
    return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
    try {
        const data: TaskCreateInput = await req.json();

        const task = await createTask(data);

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}