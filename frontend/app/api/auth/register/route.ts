import { NextRequest, NextResponse } from 'next/server';

// Mock user data - in a real app, this would come from your database
let mockUsers = [
  { id: 1, email: 'user@example.com', password: 'password123' }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password // In a real app, you would hash the password
    };

    mockUsers.push(newUser);

    // In a real app, you would generate a JWT token here
    // For this example, we'll return a mock token
    return NextResponse.json({
      token: 'valid-mock-token',
      user: { id: newUser.id, email: newUser.email }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Register API error:', error);

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