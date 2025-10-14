import { User } from '../modules/user/user.model';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve the absolute path to the CSV file containing user data
const csvPath = path.resolve(__dirname, '../data/users.csv');

/**
 * Reads users from a CSV file and seeds them into the database.
 * If a user with the same email already exists, it is skipped.
 */
export const seedUsers = async () => {
  // Array to temporarily store user records read from the CSV file
  const users: any[] = [];

  // Read and parse the CSV file asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      // Each row from the CSV file is added to the 'users' array
      .on('data', (row) => users.push(row))
      // Resolve the promise when the entire file has been processed
      .on('end', resolve)
      // Reject the promise if any error occurs during the reading process
      .on('error', reject);
  });

  // Iterate over each user record obtained from the CSV file
  for (const user of users) {
    // Check if a user with the same email already exists in the database
    const exists = await User.findOne({ where: { email: user.email } });

    if (!exists) {
      // Hash the user's password before storing it in the database
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create a new user record with the provided information
      await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });

      console.log(`✅ Created user: ${user.username}`);
    } else {
      // Skip creation if the user already exists and log a message
      console.log(`⚠️  User ${user.username} already exists`);
    }
  }
};
