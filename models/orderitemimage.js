'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class OrderItemImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItemImage.belongsTo(models.OrderItem, {
        foreignKey: "order_item_id"
      })
    }
  }
  OrderItemImage.init({
    order_item_id: DataTypes.INTEGER,
    src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderItemImage',
  });
  return OrderItemImage;
};