import { DataTypes } from "sequelize"
import sequelizeConfig from "../../config/database/database.config.js"

const db = sequelizeConfig

const FraudCheckerModel = db.define("FraudCheckerModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_parcels: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_delivered: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_cancel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "fraud_checker",
  timestamps: true,
});


const FraudCourierHistoryModel = db.define("FraudCourierHistoryModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fraud_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FraudChecker,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  courier_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_parcels: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_delivered_parcels: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_cancelled_parcels: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "fraud_courier_history",
  timestamps: true,
});

FraudCheckerModel.hasMany(FraudCourierHistoryModel, { foreignKey: "fraud_id", as: "couriers" });
FraudCourierHistoryModel.belongsTo(FraudChecker, { foreignKey: "fraud_id", as: "fraud" });


export default {
  FraudCheckerModel,
  FraudCourierHistoryModel
}