import { db } from '@/db';
import { admin } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function seedAdmin() {
  try {
    console.log('🌱 Seeding admin credentials...');

    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(admin)
      .where(eq(admin.username, 'admin'))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log('✅ Admin already exists, skipping seed');
      return;
    }

    // Hash default password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Insert default admin
    await db.insert(admin).values({
      username: 'admin',
      email: 'admin@astropari.com',
      password: hashedPassword,
    });

    console.log('✅ Admin seeded successfully');
    console.log('📝 Default credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    throw error;
  }
}

seedAdmin();
