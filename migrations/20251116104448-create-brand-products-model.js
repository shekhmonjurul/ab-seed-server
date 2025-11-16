'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Brand_Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    brand_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Brands",
        key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    product_id: {
      type: Sequelize.INTEGER
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Brand_Products');
}