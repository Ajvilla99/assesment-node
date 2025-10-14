import { Product } from '../modules/product/product.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvPath = path.resolve(__dirname, '../data/products.csv');

export const seedProducts = async () => {
  const products: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => products.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const product of products) {
    const exists = await Product.findOne({ where: { code: product.code } });
    if (!exists) {
      await Product.create({
        code: product.code,
        name: product.name,
        description: product.description,
        stock: parseInt(product.stock, 10),
        isDeleted: product.isDeleted === 'true' || product.isDeleted === true,
      });
      console.log(`✅ Created product: ${product.name}`);
    } else {
      console.log(`⚠️  Product ${product.name} already exists`);
    }
  }
};
