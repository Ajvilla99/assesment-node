import { Warehouse } from './warehouse.model';
import { CreateWarehouseDTO } from './warehouse.dto';

export const createWarehouse = async (data: CreateWarehouseDTO) => {
  // Map only the expected fields for Warehouse.create
  return Warehouse.create({
    name: data.name,
    isActive: data.isActive
  });
};

export const findWarehouseById = async (id: number) => {
  return Warehouse.findByPk(id);
};

export const findAllWarehouses = async () => {
  return Warehouse.findAll();
};

export const updateWarehouseStatus = async (id: number, activa: boolean) => {
  return Warehouse.update({ isActive: activa }, { where: { id } });
};
