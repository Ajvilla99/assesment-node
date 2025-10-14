import { Request, Response, NextFunction } from 'express';
import { Client } from '../modules/client/client.model';

export const checkUniqueDni = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dni } = req.body;
    if (!dni) {
      return res.status(400).json({ message: 'DNI is required' });
    }
    const exists = await Client.findOne({ where: { dni } });
    if (exists) {
      return res.status(400).json({ message: 'Client with this DNI already exists' });
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
