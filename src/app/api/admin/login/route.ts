import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { admin, adminSession } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usernameOrEmail, password } = body;

    // Validate required fields
    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { 
          error: 'Username/email and password are required',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      );
    }

    // Trim and validate non-empty
    const trimmedUsernameOrEmail = usernameOrEmail.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsernameOrEmail || !trimmedPassword) {
      return NextResponse.json(
        { 
          error: 'Username/email and password cannot be empty',
          code: 'EMPTY_FIELDS'
        },
        { status: 400 }
      );
    }

    // Query admin by username or email
    const admins = await db
      .select()
      .from(admin)
      .where(
        or(
          eq(admin.username, trimmedUsernameOrEmail),
          eq(admin.email, trimmedUsernameOrEmail.toLowerCase())
        )
      )
      .limit(1);

    // Check if admin exists
    if (admins.length === 0) {
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    const foundAdmin = admins[0];

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(trimmedPassword, foundAdmin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');

    // Calculate expiration date (7 days from now)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Create admin session
    const newSession = await db
      .insert(adminSession)
      .values({
        adminId: foundAdmin.id,
        token,
        expiresAt,
        createdAt: new Date()
      })
      .returning();

    // Return success response with token and admin info (excluding password)
    return NextResponse.json(
      {
        success: true,
        token,
        admin: {
          id: foundAdmin.id,
          username: foundAdmin.username,
          email: foundAdmin.email
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}