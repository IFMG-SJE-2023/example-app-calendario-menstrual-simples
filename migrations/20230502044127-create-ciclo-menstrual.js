'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ciclo_Menstruals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      data_inicio: {
        type: Sequelize.DATE
      },
      data_final: {
        type: Sequelize.DATE
      },
      intervalo: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ciclo_Menstruals');
  }
};