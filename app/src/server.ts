import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger';
import { authRoutes } from './modules/auth';

const app = express();

app.use(express.json())
app.use(cors())

// Aquí montas Swagger
setupSwagger(app);

app.use('api/auth', authRoutes)

// export app
export default app;