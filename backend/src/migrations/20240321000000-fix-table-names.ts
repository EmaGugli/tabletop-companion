import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Drop uppercase tables if they exist
  await queryInterface.dropTable('users', { force: true });
  await queryInterface.dropTable('characters', { force: true });
}

export async function down(queryInterface: QueryInterface) {
  // No need for down migration as we're cleaning up incorrect tables
} 