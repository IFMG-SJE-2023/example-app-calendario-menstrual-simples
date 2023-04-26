'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistrosDiarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RegistrosDiarios.init({
    id_ciclo_menstrual: DataTypes.INTEGER,
    data_registro: DataTypes.DATE,
    sintomas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RegistrosDiarios',
  });
  return RegistrosDiarios;
};