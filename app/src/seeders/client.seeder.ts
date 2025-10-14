import { Client } from '../modules/client/client.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Resolve the absolute path to the CSV file containing client data
const csvPath = path.resolve(__dirname, '../data/clients.csv');

/**
 * Reads clients from a CSV file and seeds them into the database.
 * If a client with the same DNI already exists, it is skipped.
 */
export const seedClients = async () => {
  // Array to store client records read from the CSV file
  const clients: any[] = [];

  // Read and parse the CSV file asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      // Push each row (client record) into the clients array
      .on('data', (row) => clients.push(row))
      // Resolve the promise once the entire CSV file has been read
      .on('end', resolve)
      // Reject the promise if any error occurs during the reading process
      .on('error', reject);
  });

  // Iterate through each client record read from the CSV file
  for (const client of clients) {
    // Check if a client with the same DNI already exists in the database
    const exists = await Client.findOne({ where: { dni: client.dni } });

    if (!exists) {
      // Create a new client record in the database
      await Client.create({
        dni: client.dni,
        name: client.name,
        email: client.email,
      });

      console.log(`✅ Created client: ${client.name}`);
    } else {
      // If the client already exists, skip creation and log a message
      console.log(`⚠️  Client ${client.name} already exists`);
    }
  }
};