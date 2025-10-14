import { User } from '../modules/auth/auth.model';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      role: 'user',
    },
  ];

  // Evita duplicados
  for (const user of users) {
    const exists = await User.findOne({ where: { email: user.email } });
    if (!exists) {
      await User.create(user);
      console.log(`✅ Created user: ${user.username}`);
    } else {
      console.log(`⚠️  User ${user.username} already exists`);
    }
  }
};
