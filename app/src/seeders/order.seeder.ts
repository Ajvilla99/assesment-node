import { Order, OrderItem } from '../modules/order/order.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const ordersCsvPath = path.resolve(__dirname, '../data/orders.csv');
const orderItemsCsvPath = path.resolve(__dirname, '../data/order_items.csv');

export const seedOrders = async () => {
  const orders: any[] = [];
  const orderItems: any[] = [];

  // Leer órdenes
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(ordersCsvPath)
      .pipe(csv())
      .on('data', (row) => orders.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  // Leer items de órdenes
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(orderItemsCsvPath)
      .pipe(csv())
      .on('data', (row) => orderItems.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const order of orders) {
    const exists = await Order.findOne({ where: { id: order.id } });
    if (!exists) {
      const createdOrder = await Order.create({
        id: order.id,
        clientId: order.clientId,
        warehouseId: order.warehouseId,
        status: order.status,
      });
      console.log(`✅ Created order: ${order.id}`);

      // Agregar items a la orden
      const items = orderItems.filter((item) => String(item.orderId) === String(order.id));
      for (const item of items) {
        await OrderItem.create({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        });
        console.log(`➕ Added item productId: ${item.productId} x${item.quantity}`);
      }
    } else {
      console.log(`⚠️  Order ${order.id} already exists`);
    }
  }
};
