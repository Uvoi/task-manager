import { NextResponse } from 'next/server';
import { getTags } from '@/entities/Tag/model/tags';

export async function GET() {
    try {
        const tags = await getTags();
        return NextResponse.json(tags);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}
