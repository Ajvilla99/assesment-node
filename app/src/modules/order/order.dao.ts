import { Order, OrderItem } from './order.model';
import { CreateOrderDTO } from './order.dto';

export const createOrder = async (data: CreateOrderDTO) => {
  const order = await Order.create({
    clientId: data.clientId,
    warehouseId: data.warehouseId,
    status: 'pending',
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

// Example: get all orders with items (using alias 'items')
export const findAllOrders = async () => {
  return Order.findAll({
    include: [
      {
        model: OrderItem,
        as: 'items',
      },
    ],
  });
};

// Example: get orders by client with items (using alias 'items')
export const findOrdersByClient = async (clientId: number) => {
  return Order.findAll({
    where: { clientId },
    include: [
      {
        model: OrderItem,
        as: 'items', 
      },
    ],
  });
};

export const updateOrderStatus = async (id: number, status: string) => {
  return Order.update({ status }, { where: { id } });
};
