'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class FraudCourierHistoryModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FraudCourierHistoryModel.init({
    fraud_id: DataTypes.INTEGER,
    courier_name: DataTypes.STRING,
    total_parcels: DataTypes.INTEGER,
    total_delivered_parcels: DataTypes.INTEGER,
    total_cancelled_parcels: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FraudCourierHistoryModel',
  });
  return FraudCourierHistoryModel;
};