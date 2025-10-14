import { Address } from '../modules/address/address.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve the absolute path to the CSV file containing address data
const csvPath = path.resolve(__dirname, '../data/addresses.csv');

/**
 * Reads client addresses from a CSV file and seeds them into the database.
 * If the same address for a given client already exists, it is skipped.
 */
export const seedAddresses = async () => {
  // Array to store address records read from the CSV file
  const addresses: any[] = [];

  // Read and parse the CSV file asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      // Push each row (address record) into the addresses array
      .on('data', (row) => addresses.push(row))
      // Resolve the promise once the entire file has been processed
      .on('end', resolve)
      // Reject the promise if any error occurs while reading the file
      .on('error', reject);
  });

  // Iterate over each address record obtained from the CSV
  for (const address of addresses) {
    // Check if an address for the same client already exists in the database
    const exists = await Address.findOne({
      where: { clientId: address.clientId, address: address.address },
    });

    if (!exists) {
      // Create a new address record for the given client
      await Address.create({
        clientId: address.clientId,
        address: address.address,
      });

      console.log(`✅ Created address for clientId: ${address.clientId}`);
    } else {
      // Skip creation if the address already exists and log a message
      console.log(`⚠️  Address for clientId ${address.clientId} already exists`);
    }
  }
};
