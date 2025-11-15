'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('OrderItemImages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    order_item_id: {
      type: Sequelize.INTEGER,
      references: { model: 'OrderItems', key: 'id' },
      onDelete: 'CASCADE'
    },
    src: {
      type: Sequelize.STRING
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('OrderItemImages');
}