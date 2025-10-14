import { Client } from '../modules/client/client.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvPath = path.resolve(__dirname, '../data/clients.csv');

export const seedClients = async () => {
  const clients: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => clients.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const client of clients) {
    const exists = await Client.findOne({ where: { dni: client.dni } });
    if (!exists) {
      await Client.create({
        dni: client.dni,
        name: client.name,
        email: client.email,
      });
      console.log(`✅ Created client: ${client.name}`);
    } else {
      console.log(`⚠️  Client ${client.name} already exists`);
    }
  }
};
