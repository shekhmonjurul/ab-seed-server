'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id"
      })
      OrderItem.hasMany(models.OrderItemImage, {
        foreignKey: "order_item_id",
        as: "images"
      })

    }

  }

  OrderItem.init({
    name: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    update_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};