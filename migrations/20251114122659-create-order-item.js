'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('OrderItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    order_id: {
      type: Sequelize.INTEGER,
      references: { model: 'Orders', key: 'id' },
      onDelete: 'CASCADE'
    }
    ,
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    subtotal: {
      type: Sequelize.FLOAT
    },
    update_price: {
      type: Sequelize.FLOAT
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('OrderItems');
}