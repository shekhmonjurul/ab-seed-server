'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProductsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsModel.init({
    product_name: DataTypes.STRING,
    sku: DataTypes.STRING,
    long_description: DataTypes.TEXT,
    short_descriptin: DataTypes.TEXT,
    sale_price: DataTypes.FLOAT,
    reguler_price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    main_image_src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductsModel',
  });
  return ProductsModel;
};