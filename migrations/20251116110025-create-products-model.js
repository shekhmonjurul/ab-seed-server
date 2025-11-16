'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_name: {
      type: Sequelize.STRING
    },
    sku: {
      type: Sequelize.STRING
    },
    long_description: {
      type: Sequelize.TEXT
    },
    short_descriptin: {
      type: Sequelize.TEXT
    },
    sale_price: {
      type: Sequelize.FLOAT
    },
    reguler_price: {
      type: Sequelize.FLOAT
    },
    stock: {
      type: Sequelize.INTEGER
    },
    main_image_src: {
      type: Sequelize.STRING
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
  await queryInterface.dropTable('Products');
}