import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class Character extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public class!: string;
  public level!: number;
  public details!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'Character',
    tableName: 'characters',
  }
);

// Set up associations
Character.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Character, { foreignKey: 'userId' });

export default Character; 