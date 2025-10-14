import { Warehouse } from '../modules/warehouse/warehouse.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve the absolute path to the CSV file containing warehouse data
const csvPath = path.resolve(__dirname, '../data/warehouses.csv');

export const seedWarehouses = async () => {
  // Array to store the warehouses read from the CSV file
  const warehouses: any[] = [];

  // Read and parse the CSV file asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      // Each row from the CSV is pushed into the warehouses array
      .on('data', (row) => warehouses.push(row))
      // Resolve the promise when the file has been fully read
      .on('end', resolve)
      // Reject the promise if any error occurs during the reading process
      .on('error', reject);
  });

  // Iterate over each warehouse record extracted from the CSV
  for (const warehouse of warehouses) {
    // Check if a warehouse with the same name already exists in the database
    const exists = await Warehouse.findOne({ where: { name: warehouse.name } });

    // If the warehouse does not exist, create a new one
    if (!exists) {
      await Warehouse.create({
        name: warehouse.name,
        // Convert the 'isActive' field from string to boolean if necessary
        isActive: warehouse.isActive === 'true' || warehouse.isActive === true,
      });
      console.log(`✅ Created warehouse: ${warehouse.name}`);
    } else {
      // If the warehouse already exists, skip creation and log a warning
      console.log(`⚠️  Warehouse ${warehouse.name} already exists`);
    }
  }
};
