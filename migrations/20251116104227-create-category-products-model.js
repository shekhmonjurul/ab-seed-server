'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Category_Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Categorys",
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
  await queryInterface.dropTable('Category_Products');
}