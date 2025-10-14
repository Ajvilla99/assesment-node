import { Client } from './client.model';
import { CreateClientDTO } from './client.dto';

export const createClient = async (data: CreateClientDTO): Promise<Client> => {
  return Client.create({
    dni: data.dni,
    name: data.name,
    email: data.email,
  });
};

export const findClientByDni = async (dni: string) => {
  return Client.findOne({ where: { dni } });
};

export const findAllClients = async () => {
  return Client.findAll();
};
