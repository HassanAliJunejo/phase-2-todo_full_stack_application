import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // In a real app, you would validate the JWT token here
    // For this example, we'll just check if the token exists and is valid
    if (!token || token !== 'valid-mock-token') {
      return NextResponse.json(
        { error: 'Unauthorized', authenticated: false },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Return sample protected data
    return NextResponse.json({
      message: 'This is protected data',
      timestamp: new Date().toISOString(),
      userId: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Protected data API error:', error);
    
    // Ensure we always return JSON even in error cases
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}