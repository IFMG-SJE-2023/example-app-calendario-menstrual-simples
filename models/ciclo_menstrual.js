'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciclo_Menstrual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ciclo_Menstrual.belongsTo(models.User);
    }
  }
  Ciclo_Menstrual.init({
    id_usuario: DataTypes.INTEGER,
    data_inicio: DataTypes.DATE,
    data_final: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ciclo_Menstrual',
  });
  return Ciclo_Menstrual;
};