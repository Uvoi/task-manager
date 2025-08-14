import { prisma } from "@/shared/lib/prisma";

export async function getTags() { 
    return prisma.tag.findMany();
}