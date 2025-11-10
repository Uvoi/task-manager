import { NextRequest, NextResponse } from 'next/server';
import { createTagServer, getTagsServer } from '@/entities/Tag/model/tags';
import { Tag } from '@/entities/Tag/model/types';

export async function GET() {
    try {
        const tags = await getTagsServer();
        return NextResponse.json(tags);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data: Tag = await req.json();

        const task = await createTagServer(data);

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}