import { Order, OrderItem } from '../modules/order/order.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve absolute paths to both CSV files
const ordersCsvPath = path.resolve(__dirname, '../data/orders.csv');
const orderItemsCsvPath = path.resolve(__dirname, '../data/order_items.csv');

/**
 * Reads orders and order items from CSV files and seeds them into the database.
 * Each order is created only if it does not already exist.
 * Corresponding order items are then created and linked to the order.
 */
export const seedOrders = async () => {
  // Arrays to store the data read from both CSV files
  const orders: any[] = [];
  const orderItems: any[] = [];

  // Read and parse the orders CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(ordersCsvPath)
      .pipe(csv())
      // Push each order row into the orders array
      .on('data', (row) => orders.push(row))
      // Resolve the promise when the file has been fully processed
      .on('end', resolve)
      // Reject the promise if any error occurs during reading
      .on('error', reject);
  });

  // Read and parse the order items CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(orderItemsCsvPath)
      .pipe(csv())
      // Push each item row into the orderItems array
      .on('data', (row) => orderItems.push(row))
      // Resolve the promise when the file has been fully processed
      .on('end', resolve)
      // Reject the promise if any error occurs during reading
      .on('error', reject);
  });

  // Iterate over each order record from the CSV file
  for (const order of orders) {
    // Check if an order with the same ID already exists in the database
    const exists = await Order.findOne({ where: { id: order.id } });

    if (!exists) {
      // Create a new order record
      const createdOrder = await Order.create({
        id: order.id,
        clientId: order.clientId,
        warehouseId: order.warehouseId,
        status: order.status,
      });

      console.log(`✅ Created order: ${order.id}`);

      // Filter the order items belonging to the current order
      const items = orderItems.filter(
        (item) => String(item.orderId) === String(order.id)
      );

      // Create each order item and link it to the created order
      for (const item of items) {
        await OrderItem.create({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        });

        console.log(`➕ Added item productId: ${item.productId} x${item.quantity}`);
      }
    } else {
      // If the order already exists, skip creation and log a warning
      console.log(`⚠️  Order ${order.id} already exists`);
    }
  }
};