import { NextResponse } from 'next/server';
import { fetchEmojis } from '@/lib/emoji-api';

export async function GET() {
  try {
    const emojis = await fetchEmojis();
    return NextResponse.json(emojis);
  } catch (error) {
    console.error('Error in /api/emojis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emojis' },
      { status: 500 }
    );
  }
}

// Add cache headers
export const dynamic = 'force-dynamic';
export const revalidate = 600;
