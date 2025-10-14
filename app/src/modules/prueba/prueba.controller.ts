// prueba.controller.ts
import { Request, Response } from 'express';
import { PruebaService } from './prueba.service';

const service = new PruebaService();

export const getAllPrueba = async (req: Request, res: Response) => {
  const data = await service.getAll();
  res.json(data);
};
