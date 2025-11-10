import { prisma } from "@/shared/lib/prisma";
import { Tag } from "./types";

export async function getTagsServer() { 
    return prisma.tag.findMany();
}

export async function createTagServer(data: Tag) {
    return prisma.tag.create({
        data: {
            name: data.name,
            hex: data.hex
        }
    });
}