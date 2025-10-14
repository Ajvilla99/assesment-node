// Load environment variables from the .env file into process.env
import "dotenv/config";
// Import Zod for schema validation
import { z } from "zod";

// Define and validate environment variables using Zod schema
const envSchema = z.object({
  // Environment mode: can only be one of the three options
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Port number: loaded as string, then transformed into a number
  PORT: z.string().default("3000").transform(Number),

  // ---------- Database Configuration ----------
  DB_CONTAINER_NAME: z.string(),
  POSTGRES_PORT: z.string().default("5432").transform(Number), // Default PostgreSQL port
  POSTGRES_DB: z.string(), // Database name (required)
  POSTGRES_USER: z.string(), // Database username (required)
  POSTGRES_PASSWORD: z.string(), // Database password (required)
  POSTGRES_LOCAL: z.string(),
  DB_HOST: z.string().default('localhost'),

  // ---------- Optional Extras ----------
  // JWT secret key (must be at least 10 characters)
  JWT_SECRET: z.string().min(10).default("changeme"),

  // Application log level
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

// Validate the environment variables at runtime
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // If validation fails, print a detailed error message and stop the process
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1); // Exit the app to prevent running with invalid configuration
}

// Export the validated environment object
// This object is safe to import and use anywhere in your app
export const env = parsed.data;

// Build a PostgreSQL connection string (useful for ORMs like Sequelize)
// Prefer an explicit DATABASE_URL from the environment (e.g. provided by docker-compose).
// If not present, build the URL from the validated env values. Use POSTGRES_PORT for
// the database port to match docker-compose variable naming.
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.DB_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;
