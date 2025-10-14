import * as dao from './order.dao';
import { CreateOrderDTO, UpdateOrderStatusDTO } from './order.dto';

export const OrderService = {
  async createOrder(data: CreateOrderDTO) {
    // Here you should validate stock and existence of client/warehouse/product
    return dao.createOrder(data);
  },

  async getAllOrders() {
    return dao.findAllOrders();
  },

  async updateOrderStatus(data: UpdateOrderStatusDTO) {
    const order = await dao.findOrderById(data.id);
    if (!order) throw new Error('Order not found');
    await dao.updateOrderStatus(data.id, data.status);
    return { ...order.toJSON(), status: data.status };
  },

  async getOrdersByClient(clientId: number) {
    return dao.findOrdersByClient(clientId);
  },
};
