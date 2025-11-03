import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock database - replace with actual database
const userFavorites = new Map<string, string[]>();

export async function GET(request: NextRequest) {
  try {
    // Get user ID from access_token cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Decode JWT to get user ID
    // For now, using a mock user ID
    const userId = 'mock-user-id';
    
    const favorites = userFavorites.get(userId) || [];
    
    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { favorites } = await request.json();
    
    // TODO: Decode JWT to get user ID
    const userId = 'mock-user-id';
    
    userFavorites.set(userId, favorites);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save favorites' },
      { status: 500 }
    );
  }
}
