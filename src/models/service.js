'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.Category,{foreignKey:'category_id'});
      Service.hasMany(models.Service_Price,{foreignKey:'service_id'})
    }
  }
  Service.init({
    category_id: DataTypes.INTEGER,
    service_name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
    tableName:'service'
  });
  return Service;
};