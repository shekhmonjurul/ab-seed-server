'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    customer_name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    note: {
      type: Sequelize.TEXT
    },
    invoice: {
      type: Sequelize.STRING
    },
    order_id: {
      type: Sequelize.STRING
    },
    subtotal: {
      type: Sequelize.FLOAT
    },
    delivery_charge: {
      type: Sequelize.FLOAT
    },
    discount: {
      type: Sequelize.FLOAT
    },
    advance: {
      type: Sequelize.FLOAT
    },
    grand_total: {
      type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.STRING
    },
    isprint: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Orders');
}