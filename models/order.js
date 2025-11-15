'use strict';
import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items"
      })
    }
  }
  Order.init({
    customer_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.TEXT,
    invoice: DataTypes.STRING,
    order_id: DataTypes.STRING,
    subtotal: DataTypes.FLOAT,
    delivery_charge: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    advance: DataTypes.FLOAT,
    grand_total: DataTypes.FLOAT,
    status: DataTypes.STRING,
    isprint: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};