/**
 * Main entrypoint of the application.
 * Responsible for:
 * - Loading environment variables (dotenv + env.ts validation).
 * - Connecting and syncing the database (Sequelize).
 * - Running seeders (optional on startup).
 * - Starting the Express server.
 */

import 'dotenv/config';
import app from './server';
import sequelize from './config/database';
import { env } from './config/env';
import { runAllSeeders } from './seeders/runAllSeeders';


(async () => {
  try {
    // console.log('🔍 Validating environment configuration...');
    // env is already validated in env.ts, no need for an extra function.

    console.log('🔌 Connecting to the database...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // console.log('🛠️ Syncing models...');
    // await sequelize.sync({ alter: false }); // use { force: true } for full reset (careful!)

    // console.log('🌱 Running seeders...');
    // await runAllSeeders();

    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('❌ Failed to start the application:', error);
    process.exit(1);
  }
})();
