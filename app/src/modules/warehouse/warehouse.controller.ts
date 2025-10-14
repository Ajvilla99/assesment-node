import { Request, Response } from 'express';
import * as dao from './warehouse.dao';
import { CreateWarehouseDTO, UpdateWarehouseStatusDTO } from './warehouse.dto';

export const WarehouseController = {
  async create(req: Request, res: Response) {
    try {
      const data: CreateWarehouseDTO = req.body;
      const result = await dao.createWarehouse(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await dao.findAllWarehouses();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async setStatus(req: Request, res: Response) {
    try {
      const data: UpdateWarehouseStatusDTO = req.body;
      const warehouse = await dao.findWarehouseById(data.id);
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      await dao.updateWarehouseStatus(data.id, data.isActive);
      res.status(200).json({ ...warehouse.toJSON(), isActive: data.isActive });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
