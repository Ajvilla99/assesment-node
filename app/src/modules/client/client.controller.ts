import { Request, Response } from 'express';
import * as dao from './client.dao';
import { CreateClientDTO } from './client.dto';

export const ClientController = {
  async create(req: Request, res: Response) {
    try {
      const data: CreateClientDTO = req.body;
      const exists = await dao.findClientByDni(data.dni);
      if (exists) {
        return res.status(400).json({ message: 'Client already exists' });
      }
      const result = await dao.createClient(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await dao.findAllClients();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getByDni(req: Request, res: Response) {
    try {
      const dni = req.body.dni || req.params.dni;
      const result = await dao.findClientByDni(dni);
      if (!result) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
