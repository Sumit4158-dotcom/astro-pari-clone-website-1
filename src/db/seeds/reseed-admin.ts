import { db } from '@/db';
import { admin } from '@/db/schema';
import bcrypt from 'bcrypt';

async function reseedAdmin() {
  try {
    console.log('🔄 Reseeding admin credentials...');

    // Delete existing admin
    await db.delete(admin);
    console.log('✅ Deleted existing admins');

    // Hash password with bcrypt (matching the API)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('✅ Hashed password with bcrypt');

    // Insert new admin
    await db.insert(admin).values({
      username: 'admin',
      email: 'admin@astropari.com',
      password: hashedPassword,
    });

    console.log('✅ Admin reseeded successfully');
    console.log('📝 Credentials:');
    console.log('   Username: admin');
    console.log('   Email: admin@astropari.com');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('❌ Error reseeding admin:', error);
    throw error;
  }
}

reseedAdmin();
