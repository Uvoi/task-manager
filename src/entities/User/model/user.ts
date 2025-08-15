import { prisma } from '@/shared/lib/prisma';
import { User } from './types';

export async function createUserServer(user: User) {
    return prisma.user.create({
        data: {
            username: user.username,
            name: user.name,
            surname: user.surname,
        }
    });
}