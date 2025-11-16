'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class BrandProductsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BrandProductsModel.init({
    brand_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BrandProductsModel',
  });
  return BrandProductsModel;
};