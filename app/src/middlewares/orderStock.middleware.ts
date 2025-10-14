import { Request, Response, NextFunction } from 'express';
import { Product } from '../modules/product/product.model';
import { Warehouse } from '../modules/warehouse/warehouse.model';
import { WarehouseProduct } from '../modules/warehouse/warehouseProduct.model';

export const checkOrderStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, warehouseId } = req.body;
    if (!Array.isArray(items) || !warehouseId) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    for (const item of items) {
      const product = await Product.findOne({ where: { id: item.productId, isDeleted: false } });
      if (!product) {
        return res.status(400).json({ message: `Product with id ${item.productId} not found` });
      }

      const wp = await WarehouseProduct.findOne({ where: { productId: item.productId, warehouseId }, });
      if (!wp) {
        return res.status(400).json({ message: `Product ${product.name} not available in warehouse ${warehouseId}` });
      }
      if (wp.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name} in warehouse ${warehouseId}` });
      }
    }

    // Optionally, check if warehouse exists and is active
    const warehouse = await Warehouse.findOne({ where: { id: warehouseId, isActive: true } });
    if (!warehouse) {
      return res.status(400).json({ message: 'Warehouse not found or inactive' });
    }

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
