/**
 * Sequelize configuration and initialization.
 * Responsible for:
 * - Creating and exporting a Sequelize instance.
 * - Using environment variables validated in env.ts.
 */

import { Sequelize } from 'sequelize';
import { DATABASE_URL, env } from './env';

// Create Sequelize instance
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: env.NODE_ENV === 'development' ? console.log : false, // enable SQL logs only in dev
});

export default sequelize;
