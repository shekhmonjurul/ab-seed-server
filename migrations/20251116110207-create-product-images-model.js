'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ProductImagesModels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    image_src: {
      type: Sequelize.STRING
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ProductImagesModels');
}