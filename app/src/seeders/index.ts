import sequelize from '../config/database';
import { seedUsers } from './user.seeder';

export const runAllSeeders = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    await sequelize.sync({ alter: true });
    console.log('📦 Database synchronized');

    await seedUsers();

    console.log('🌱 Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};
