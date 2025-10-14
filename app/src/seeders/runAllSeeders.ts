import sequelize from '../config/database';

// Import models so Sequelize registers them (required before sync)
import '../modules/user/user.model';
import '../modules/client/client.model';
import '../modules/address/address.model';
import '../modules/warehouse/warehouse.model';
import '../modules/product/product.model';
import '../modules/order/order.model';

import { seedAddresses } from './address.seeder';
import { seedClients } from './client.seeder';
import { seedOrders } from './order.seeder';
import { seedProducts } from './product.seeder';
import { seedUsers } from './user.seeder';
import { seedWarehouses } from './warehouse.seeder';

/**
 * Runs all seeders in the correct order.
 */
export const runAllSeeders = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Ensure all models are initialized and associations applied
    await sequelize.sync({ alter: true });
    console.log('📦 Database synchronized');

    // Run seeders (order matters if there are FK constraints)
    await seedUsers();
    await seedClients();
    await seedWarehouses();
    await seedProducts();
    await seedOrders();
    await seedAddresses();

    console.log('🌱 Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};