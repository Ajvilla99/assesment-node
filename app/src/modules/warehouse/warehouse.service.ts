import * as dao from './warehouse.dao';
import { CreateWarehouseDTO, UpdateWarehouseStatusDTO } from './warehouse.dto';

export const WarehouseService = {
  async createWarehouse(data: CreateWarehouseDTO) {
    return dao.createWarehouse(data);
  },

  async getAllWarehouses() {
    return dao.findAllWarehouses();
  },

  async setWarehouseStatus(data: UpdateWarehouseStatusDTO) {
    const warehouse = await dao.findWarehouseById(data.id);
    if (!warehouse) throw new Error('Warehouse not found');
    await dao.updateWarehouseStatus(data.id, data.isActive);
    return { ...warehouse.toJSON(), isActive: data.isActive };
  },
};
