'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CategoryProductsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryProductsModel.init({
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryProductsModel',
  });
  return CategoryProductsModel;
};