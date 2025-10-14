import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { Address } from '../address/address.model';
import { Order } from '../order/order.model';

export class Client extends Model {
  public id!: number;
  public dni!: string;
  public name!: string;
  public email!: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
  }
);

Client.hasMany(Address, { foreignKey: 'clientId', as: 'addresses' });
Address.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

Client.hasMany(Order, { foreignKey: 'clientId', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
