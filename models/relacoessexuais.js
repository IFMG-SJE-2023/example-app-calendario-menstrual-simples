'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelacoesSexuais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RelacoesSexuais.belongsTo(models.User)
    }
  }
  RelacoesSexuais.init({
    id_usuario: DataTypes.INTEGER,
    data_relacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RelacoesSexuais',
  });
  return RelacoesSexuais;
};