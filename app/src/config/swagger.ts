import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from './env';
import { Express } from 'express';

// Configuración base de Swagger
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Example',
      version: '1.0.0',
      description: 'REST API built with Express, TypeScript, Sequelize, and PostgreSQL',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
        description: 'Development server',
      },
    ],
  },
  // Aquí se definen los archivos donde Swagger buscará las rutas documentadas
  apis: ['src/modules/**/*.routes.ts', 'src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

// Helper para cargar Swagger en la app
export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
