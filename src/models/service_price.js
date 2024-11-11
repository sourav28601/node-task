'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service_Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service_Price.belongsTo(models.Service,{foreignKey:"service_id"})
    }
  }
  Service_Price.init({
    service_id: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service_Price',
    tableName:'service_price'
  });
  return Service_Price;
};