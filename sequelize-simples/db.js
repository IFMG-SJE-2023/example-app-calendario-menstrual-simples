const Sequelize = require('sequelize');


//   FUNCIONA,   precisa apenas  ter o banco criado
// const sequelize = new Sequelize('appcalendar2','root','12345' , {
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3306
// });

//  FUNCIONA, CRIA O ARQUIVO DO BANCO SE NAO EXISTIR
// SUGESTAO use heidiSQL (alternativa leve para  mysql workbench) para monitorar mudancas no sqlite   heidisql.com
const sequelize = new Sequelize(  {
    dialect: 'sqlite',
    storage: './databasev1.sqlite'
});

module.exports = sequelize;