import { Address } from '../modules/address/address.model';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvPath = path.resolve(__dirname, '../data/addresses.csv');

export const seedAddresses = async () => {
  const addresses: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => addresses.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const address of addresses) {
    const exists = await Address.findOne({ where: { clientId: address.clientId, address: address.address } });
    if (!exists) {
      await Address.create({
        clientId: address.clientId,
        address: address.address,
      });
      console.log(`✅ Created address for clientId: ${address.clientId}`);
    } else {
      console.log(`⚠️  Address for clientId ${address.clientId} already exists`);
    }
  }
};
