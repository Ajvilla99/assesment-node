import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from './env';
import { Express } from 'express';

// Swagger base configuration
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FHL Logistics Delivery Orders API',
      version: '1.0.0',
      description: 'REST API built with Express, TypeScript, Sequelize, and PostgreSQL for managing delivery orders, clients, warehouses, and products.',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Files where Swagger will look for documented routes
  apis: ['src/modules/**/*.routes.ts', 'src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

// Helper to load Swagger in the app
export const setupSwagger = (app: Express) => {
  // Mount Swagger UI at /api-docs to match README and common conventions
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
