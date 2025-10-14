import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger';
import { authRoutes } from './modules/user';
import { OrderRoutes } from './modules/order';
import { productRoutes } from './modules/product';
import { warehouseRoutes } from './modules/warehouse';
import { clientRoutes } from './modules/client';

const app = express();

app.use(express.json())
app.use(cors())

// Aquí montas Swagger
setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);

// export app
export default app;