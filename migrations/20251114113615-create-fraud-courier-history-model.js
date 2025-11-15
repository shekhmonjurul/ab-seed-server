'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('FraudCourierHistoryModels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fraud_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'FraudCheckerModels', // table name from FraudCheckerModel
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    courier_name: {
      type: Sequelize.STRING
    },
    total_parcels: {
      type: Sequelize.INTEGER
    },
    total_delivered_parcels: {
      type: Sequelize.INTEGER
    },
    total_cancelled_parcels: {
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
  await queryInterface.dropTable('FraudCourierHistoryModels');
}