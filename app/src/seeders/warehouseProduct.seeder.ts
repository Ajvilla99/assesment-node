import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Warehouse } from '../modules/warehouse/warehouse.model';
import { Product } from '../modules/product/product.model';
import { WarehouseProduct } from '../modules/warehouse/warehouseProduct.model';

export const seedWarehouseProducts = async () => {
  const products: any[] = [];
  const warehouses: any[] = [];

  const productsPath = path.resolve(__dirname, '../data/products.csv');
  const warehousesPath = path.resolve(__dirname, '../data/warehouses.csv');

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(productsPath)
      .pipe(csv())
      .on('data', (row) => products.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(warehousesPath)
      .pipe(csv())
      .on('data', (row) => warehouses.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const p of products) {
    const product = await Product.findOne({ where: { code: p.code } });
    if (!product) continue;
    const stock = parseInt(p.stock, 10) || 0;

    if (warehouses.length === 0) continue;

    // assign all stock to the first active warehouse, fallback to first
    const targetWarehouseRow = warehouses.find((w: any) => w.isActive === 'true') || warehouses[0];
    const warehouse = await Warehouse.findOne({ where: { name: targetWarehouseRow.name } });
    if (!warehouse) continue;

    await WarehouseProduct.create({
      warehouseId: warehouse.id,
      productId: product.id,
      stock,
    });
  }

  console.log('✅ Seeded warehouse_products');
};
