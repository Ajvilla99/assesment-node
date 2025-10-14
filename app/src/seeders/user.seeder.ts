import { User } from '../modules/user/user.model';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvPath = path.resolve(__dirname, '../data/users.csv');

/**
 * Reads users from CSV and seeds the database.
 */
export const seedUsers = async () => {
  const users: any[] = [];

  // Read users from CSV
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const user of users) {
    const exists = await User.findOne({ where: { email: user.email } });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });
      console.log(`✅ Created user: ${user.username}`);
    } else {
      console.log(`⚠️  User ${user.username} already exists`);
    }
  }
};
