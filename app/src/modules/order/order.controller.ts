import { Request, Response } from 'express';
import * as dao from './order.dao';
import { CreateOrderDTO, UpdateOrderStatusDTO } from './order.dto';
import { OrderService } from './order.service';

export const OrderController = {
  async create(req: Request, res: Response) {
    try {
      const data: CreateOrderDTO = req.body;
      // Here you should validate stock and existence of client/warehouse/product
      const result = await dao.createOrder(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const data: UpdateOrderStatusDTO = req.body;
      const order = await dao.findOrderById(data.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      await dao.updateOrderStatus(data.id, data.status);
      res.status(200).json({ ...order.toJSON(), status: data.status });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getByClient(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.clientId);
      const result = await dao.findOrdersByClient(clientId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
