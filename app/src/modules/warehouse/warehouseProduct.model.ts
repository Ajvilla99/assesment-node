import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { Warehouse } from './warehouse.model';
import { Product } from '../product/product.model';

export class WarehouseProduct extends Model {
  public id!: number;
  public warehouseId!: number;
  public productId!: number;
  public stock!: number;
}

WarehouseProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'WarehouseProduct',
    tableName: 'warehouse_products',
    timestamps: true,
  }
);

// Associations
Warehouse.hasMany(WarehouseProduct, { foreignKey: 'warehouseId', as: 'warehouseProducts' });
WarehouseProduct.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

Product.hasMany(WarehouseProduct, { foreignKey: 'productId', as: 'warehouseProducts' });
WarehouseProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
