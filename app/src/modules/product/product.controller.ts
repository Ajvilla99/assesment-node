import { Request, Response } from 'express';
import * as dao from './product.dao';
import { CreateProductDTO } from './product.dto';

export const ProductController = {
  async create(req: Request, res: Response) {
    try {
      const data: CreateProductDTO = req.body;
      const result = await dao.createProduct(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getByCode(req: Request, res: Response) {
    try {
      const code = req.params.code;
      const result = await dao.findProductByCode(code);
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await dao.findAllProducts();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const code = req.params.code;
      const product = await dao.findProductByCode(code);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await dao.logicalDeleteProduct(code);
      res.status(200).json({ ...product.toJSON(), deleted: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
