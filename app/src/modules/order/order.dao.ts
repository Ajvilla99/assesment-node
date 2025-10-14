import { Order, OrderItem } from './order.model';
import { CreateOrderDTO } from './order.dto';

export const createOrder = async (data: CreateOrderDTO) => {
  const order = await Order.create({
    clientId: data.clientId,
    warehouseId: data.warehouseId,
    status: 'pendiente',
  });
  for (const item of data.items) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    });
  }
  return order;
};

export const findOrderById = async (id: number) => {
  return Order.findByPk(id, { include: [OrderItem] });
};

export const findAllOrders = async () => {
  return Order.findAll({ include: [OrderItem] });
};

export const updateOrderStatus = async (id: number, status: string) => {
  return Order.update({ status }, { where: { id } });
};

export const findOrdersByClient = async (clientId: number) => {
  return Order.findAll({ where: { clientId }, include: [OrderItem] });
};
