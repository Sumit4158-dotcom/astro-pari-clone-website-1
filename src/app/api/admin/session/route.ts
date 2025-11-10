import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { admin, adminSession } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided', code: 'NO_TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided', code: 'NO_TOKEN' },
        { status: 401 }
      );
    }

    // Query adminSession table to find session
    const sessions = await db
      .select()
      .from(adminSession)
      .where(eq(adminSession.token, token))
      .limit(1);

    if (sessions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid session', code: 'INVALID_SESSION' },
        { status: 401 }
      );
    }

    const sessionRecord = sessions[0];

    // Check if session is expired
    const now = new Date();
    const expiresAt = new Date(sessionRecord.expiresAt);

    if (expiresAt < now) {
      // Delete expired session
      await db
        .delete(adminSession)
        .where(eq(adminSession.id, sessionRecord.id));

      return NextResponse.json(
        { error: 'Session expired', code: 'SESSION_EXPIRED' },
        { status: 401 }
      );
    }

    // Query admin table using adminId from session
    const admins = await db
      .select({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      })
      .from(admin)
      .where(eq(admin.id, sessionRecord.adminId))
      .limit(1);

    if (admins.length === 0) {
      return NextResponse.json(
        { error: 'Admin not found', code: 'ADMIN_NOT_FOUND' },
        { status: 401 }
      );
    }

    const adminRecord = admins[0];

    // Return success response
    return NextResponse.json(
      {
        success: true,
        admin: {
          id: adminRecord.id,
          username: adminRecord.username,
          email: adminRecord.email,
          createdAt: adminRecord.createdAt,
          updatedAt: adminRecord.updatedAt,
        },
        session: {
          token: sessionRecord.token,
          expiresAt: sessionRecord.expiresAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}