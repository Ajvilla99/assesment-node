import { Product } from '../modules/product/product.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve the absolute path to the CSV file containing product data
const csvPath = path.resolve(__dirname, '../data/products.csv');

/**
 * Reads products from a CSV file and seeds them into the database.
 * If a product with the same code already exists, it is skipped.
 */
export const seedProducts = async () => {
  // Array to store the product records read from the CSV file
  const products: any[] = [];

  // Read and parse the CSV file asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      // Push each row (product) from the CSV into the products array
      .on('data', (row) => products.push(row))
      // Resolve the promise once the entire CSV has been read
      .on('end', resolve)
      // Reject the promise if an error occurs during reading
      .on('error', reject);
  });

  // Iterate over each product record obtained from the CSV
  for (const product of products) {
    // Check if a product with the same code already exists in the database
    const exists = await Product.findOne({ where: { code: product.code } });

    if (!exists) {
      // Create a new product record with the provided data
      await Product.create({
        code: product.code,
        name: product.name,
        description: product.description,
        // Convert stock value from string to integer
        stock: parseInt(product.stock, 10),
        // Convert isDeleted value to a boolean if necessary
        isDeleted: product.isDeleted === 'true' || product.isDeleted === true,
      });

      console.log(`✅ Created product: ${product.name}`);
    } else {
      // If the product already exists, skip creation and log a warning
      console.log(`⚠️  Product ${product.name} already exists`);
    }
  }
};
