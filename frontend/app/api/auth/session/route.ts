import { NextRequest, NextResponse } from 'next/server';

// Mock user data - in a real app, this would come from your database
const mockUsers = [
  { id: 1, email: 'user@example.com', password: 'password123' }
];

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Also check for token in localStorage (sent via frontend fetch)
      // For this mock implementation, we'll check for a custom header
      token = request.headers.get('x-auth-token') || request.cookies.get('auth-token')?.value;
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

    // Find user based on token (in a real app, decode the JWT to get user ID)
    // For this example, we'll return mock user data
    const user = mockUsers[0];

    // Return user data without sensitive information
    const { password, ...userData } = user;

    return NextResponse.json({
      user: userData,
      authenticated: true
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Session API error:', error);

    // Ensure we always return JSON even in error cases
    return NextResponse.json(
      { error: 'Internal server error', authenticated: false },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}