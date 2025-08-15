import { prisma } from '@/shared/lib/prisma';
import { TaskCreateInput, TaskFilter, TaskUpdateClient } from './types';

export async function getTasksServer() 
{
    return prisma.task.findMany();
}

export async function getTasksFilteredServer(filters: TaskFilter) {
  return prisma.task.findMany({
    where: {
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
      ...(filters.creatorId && { creatorId: filters.creatorId }),
      ...(filters.tagIds && {
        tags: {
          some: {
            id: { in: filters.tagIds },
          },
        },
      }),
    },
  });
}

export async function createTaskServer(data: TaskCreateInput) {
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            dueDate: new Date(data.dueDate),
            priority: data.priority || 'unset',
            status: data.status || 'todo',
            creatorId: data.creatorId,
            parentTaskId: data.parentTaskId,
            tags: data.tagIds
                ? { connect: data.tagIds.map(id => ({ id })) }
                : undefined,
        },
        include: {
        tags: true,
        },
    });
}

export async function updateTaskServer(data: TaskUpdateClient) {
  const { id, tags, ...rest } = data;

  return prisma.task.update({
    where: { id },
    data: {
      ...rest,
      ...(tags ? { tags: { set: tags.map(tagId => ({ id: tagId })) } } : {}),
    }
  });
}


export async function deleteTaskServer(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}