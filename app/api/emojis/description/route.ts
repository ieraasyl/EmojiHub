import { NextRequest, NextResponse } from 'next/server';
import { generateEmojiDescription } from '@/lib/gemini-ai';

// In-memory cache for emoji descriptions (prevents duplicate API calls)
const descriptionCache = new Map<string, string>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const emoji = searchParams.get('emoji');

  if (!emoji) {
    return NextResponse.json(
      { error: 'Missing emoji parameter' },
      { status: 400 }
    );
  }

  try {
    // Check cache first
    if (descriptionCache.has(emoji)) {
      console.log(`Using cached description for emoji: ${emoji}`);
      return NextResponse.json({ description: descriptionCache.get(emoji) });
    }

    // Generate new description
    const description = await generateEmojiDescription(emoji);
    
    // Cache the result
    descriptionCache.set(emoji, description);
    
    return NextResponse.json({ description });
  } catch (error) {
    console.error('Error generating description:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
