import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { Order } from '../order/order.model';

export class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public isActive!: boolean;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Warehouse',
    tableName: 'warehouses',
    timestamps: true,
  }
);

Warehouse.hasMany(Order, { foreignKey: 'warehouseId', as: 'orders' });
Order.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
