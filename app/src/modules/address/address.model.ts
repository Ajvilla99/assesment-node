import { DataTypes, Model } from 'sequelize';
import sequelize  from '../../config/database';

export class Address extends Model {
  public id!: number;
  public clientId!: number;
  public address!: string;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    timestamps: true,
  }
);
