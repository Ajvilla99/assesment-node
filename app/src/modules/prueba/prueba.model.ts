// prueba.model.ts
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

export const Prueba = sequelize.define('prueba', {
  id_prueba: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
