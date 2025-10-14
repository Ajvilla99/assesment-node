import { Warehouse } from '../modules/warehouse/warehouse.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvPath = path.resolve(__dirname, '../data/warehouses.csv');

export const seedWarehouses = async () => {
  const warehouses: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => warehouses.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const warehouse of warehouses) {
    const exists = await Warehouse.findOne({ where: { name: warehouse.name } });
    if (!exists) {
      await Warehouse.create({
        name: warehouse.name,
        isActive: warehouse.isActive === 'true' || warehouse.isActive === true,
      });
      console.log(`✅ Created warehouse: ${warehouse.name}`);
    } else {
      console.log(`⚠️  Warehouse ${warehouse.name} already exists`);
    }
  }
};
