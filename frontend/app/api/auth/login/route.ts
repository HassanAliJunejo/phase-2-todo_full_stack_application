import { NextRequest, NextResponse } from 'next/server';

// Mock user data - in a real app, this would come from your database
const mockUsers = [
  { id: 1, email: 'user@example.com', password: 'password123' }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = mockUsers.find(u => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // In a real app, you would generate a JWT token here
    // For this example, we'll return a mock token
    return NextResponse.json({
      token: 'valid-mock-token',
      user: { id: user.id, email: user.email }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Login API error:', error);

    // Ensure we always return JSON even in error cases
    return NextResponse.json(
      { message: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}