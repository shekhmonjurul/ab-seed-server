'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CategorysModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategorysModel.init({
    category_name: DataTypes.STRING,
    image_src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategorysModel',
  });
  return CategorysModel;
};