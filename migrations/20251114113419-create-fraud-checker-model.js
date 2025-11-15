'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('FraudCheckerModels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    mobile_number: {
      type: Sequelize.STRING
    },
    total_parcels: {
      type: Sequelize.INTEGER
    },
    total_delivered: {
      type: Sequelize.INTEGER
    },
    total_cancel: {
      type: Sequelize.INTEGER
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
  await queryInterface.dropTable('FraudCheckerModels');
}