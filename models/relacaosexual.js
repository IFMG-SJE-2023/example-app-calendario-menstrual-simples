'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelacaoSexual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RelacaoSexual.belongsTo(models.User);
    }
  }
  RelacaoSexual.init({
    id_usuario: DataTypes.INTEGER,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RelacaoSexual',
  });
  return RelacaoSexual;
};