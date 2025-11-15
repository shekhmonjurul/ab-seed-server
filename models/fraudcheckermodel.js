'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class FraudCheckerModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FraudCheckerModel.init({
    mobile_number: DataTypes.STRING,
    total_parcels: DataTypes.INTEGER,
    total_delivered: DataTypes.INTEGER,
    total_cancel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FraudCheckerModel',
  });
  return FraudCheckerModel;
};