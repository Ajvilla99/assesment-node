import { Order, OrderItem } from './order.model';
import { CreateOrderDTO } from './order.dto';
import sequelize from '../../config/database';
import { Product } from '../product/product.model';
import { WarehouseProduct } from '../warehouse/warehouseProduct.model';

/**
 * Create an order in a transaction and decrement product stock safely.
 * Rolls back on any error.
 */
export const createOrder = async (data: CreateOrderDTO) => {
  return await sequelize.transaction(async (t) => {
    const order = await Order.create(
      {
        clientId: data.clientId,
        warehouseId: data.warehouseId,
        status: 'pending',
      },
      { transaction: t }
    );

    for (const item of data.items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) throw new Error(`Product ${item.productId} not found`);

      // Find warehouse-specific stock
      const wp = await WarehouseProduct.findOne({ where: { productId: item.productId, warehouseId: data.warehouseId }, transaction: t });
      if (!wp) throw new Error(`Product ${product.code} not available in warehouse ${data.warehouseId}`);
      if (wp.stock < item.quantity) throw new Error(`Insufficient stock for product ${product.code} in warehouse ${data.warehouseId}`);

      // Create order item
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        },
        { transaction: t }
      );

      // Decrement warehouse-product stock
      await wp.update({ stock: wp.stock - item.quantity }, { transaction: t });
    }

    return order;
  });
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
