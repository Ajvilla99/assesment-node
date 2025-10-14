import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'users', timestamps: true }
);
