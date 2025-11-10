import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { admin, adminSession } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function PUT(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided', code: 'NO_TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify session
    const sessions = await db
      .select()
      .from(adminSession)
      .where(eq(adminSession.token, token))
      .limit(1);

    if (sessions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired session', code: 'INVALID_SESSION' },
        { status: 401 }
      );
    }

    const session = sessions[0];

    // Check if session is expired
    const now = new Date();
    if (session.expiresAt < now) {
      return NextResponse.json(
        { error: 'Invalid or expired session', code: 'EXPIRED_SESSION' },
        { status: 401 }
      );
    }

    const adminId = session.adminId;

    // Parse request body
    const body = await request.json();
    const { username, email, currentPassword, newPassword } = body;

    // Check if any updates provided
    if (!username && !email && !newPassword) {
      return NextResponse.json(
        { error: 'No updates provided', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    // Build update object
    const updates: any = {};

    // Handle username update
    if (username) {
      updates.username = username.trim();
    }

    // Handle email update
    if (email) {
      updates.email = email.trim().toLowerCase();
    }

    // Handle password update
    if (newPassword) {
      // Require currentPassword when updating password
      if (!currentPassword) {
        return NextResponse.json(
          {
            error: 'Current password is required to set a new password',
            code: 'MISSING_CURRENT_PASSWORD',
          },
          { status: 400 }
        );
      }

      // Get current admin record to verify current password
      const currentAdmin = await db
        .select()
        .from(admin)
        .where(eq(admin.id, adminId))
        .limit(1);

      if (currentAdmin.length === 0) {
        return NextResponse.json(
          { error: 'Admin not found', code: 'ADMIN_NOT_FOUND' },
          { status: 404 }
        );
      }

      // Verify current password
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        currentAdmin[0].password
      );

      if (!passwordMatch) {
        return NextResponse.json(
          {
            error: 'Current password is incorrect',
            code: 'INCORRECT_PASSWORD',
          },
          { status: 401 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    // Check if currentPassword provided without newPassword
    if (currentPassword && !newPassword) {
      return NextResponse.json(
        {
          error: 'New password is required when providing current password',
          code: 'MISSING_NEW_PASSWORD',
        },
        { status: 400 }
      );
    }

    // Add updatedAt timestamp
    updates.updatedAt = new Date();

    // Update admin record
    const updatedAdmin = await db
      .update(admin)
      .set(updates)
      .where(eq(admin.id, adminId))
      .returning();

    if (updatedAdmin.length === 0) {
      return NextResponse.json(
        { error: 'Admin not found', code: 'ADMIN_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Return updated admin record (exclude password)
    const { password: _, ...adminWithoutPassword } = updatedAdmin[0];

    return NextResponse.json(
      {
        success: true,
        admin: adminWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('PUT error:', error);

    // Handle unique constraint violations
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      if (error.message.includes('username')) {
        return NextResponse.json(
          { error: 'Username already exists', code: 'USERNAME_EXISTS' },
          { status: 409 }
        );
      }
      if (error.message.includes('email')) {
        return NextResponse.json(
          { error: 'Email already exists', code: 'EMAIL_EXISTS' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Duplicate entry found', code: 'DUPLICATE_ENTRY' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}