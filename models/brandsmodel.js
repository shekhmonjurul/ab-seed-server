'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class BrandsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BrandsModel.init({
    brand_name: DataTypes.STRING,
    images_src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BrandsModel',
  });
  return BrandsModel;
};