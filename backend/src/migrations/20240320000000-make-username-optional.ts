import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn('users', 'username', {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn('users', 'username', {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  });
} 