'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProductImagesModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductImagesModel.init({
    product_id: DataTypes.INTEGER,
    image_src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductImagesModel',
  });
  return ProductImagesModel;
};