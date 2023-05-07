const Sequelize = require('sequelize');
const database = require('./db.js');

const User = database.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
        /*   sequelize data types
            The DATEONLY type that converts to the SQL DATE format
            The DATE type that converts to the SQL DATETIME format
        */
    data_nascimento: {
        type: Sequelize.DATEONLY
    }  
    /*    sequelize cria estes por padrao
    ,
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
    */
});

module.exports = User;