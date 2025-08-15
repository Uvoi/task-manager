import { prisma } from "@/shared/lib/prisma";

export async function getTagsServer() { 
    return prisma.tag.findMany();
}