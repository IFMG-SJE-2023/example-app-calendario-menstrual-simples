//   arquivo testando o uso do sequelize ORM sem uso do nodemon
//  para utilizar diretamente no app, sem API  fetch 





( async ()=>{
    const database = require('./db.js');
    const User = require('./user.js');
    await database.sync();  //   cria e modifica tabelas, colunas... 

    const novoUser4 = await User.create({ name: 'fulana',  email: 'fulana@gmail.com', password: '123', data_nascimento: '2000-01-01'});
    const novoUser3 = await User.create({ name: 'beltrana',  email: 'beltrana@gmail.com', password: '123', data_nascimento: '2000-01-01'});
    const novoUser1 = await User.create({ name: 'doriana',  email: 'doriana@gmail.com', password: '123', data_nascimento: '2000-01-01'});
    const novoUser2 = await User.create({ name: 'cicrana',  email: 'cicrana@gmail.com', password: '123', data_nascimento: '2000-01-01'});
    console.log(" ====== CRIADOS ===== "); console.log(novoUser1); console.log( novoUser2); console.log(" ======= / =======" );

    // const acharUser1 =  await User.findOne({where: { email: 'doriana@gmail.com' } } );
    // console.log(" ====== FIND ONE ===== "); console.log( acharUser1); console.log(" ======= / =======" );
    // acharUser1.name = 'doriana Sousa';
    // acharUser1.save();

    // const acharUser2 = await  User.findAll({where: { email: 'cicrana@gmail.com', password: '123' } } );
    // console.log(" ====== FIND ALL cicrana 123 ===== " ); console.log(acharUser2); console.log(" ======= / =======" );
    
    // const acharUser3 = await  User.findOne({where: { email: 'cicrana@gmail.com', password: '123' } } );
    // console.log(" ====== FIND ONE cicrana 123 ===== " ); console.log(acharUser3);console.log(" ======= / =======" );
    // // // acharUser3.destroy();

    // const acharUserAll =  await User.findAll({where: {  password: '123' } } );
    // console.log(" ====== FIND ALL  123 ========= "); console.log(acharUserAll); console.log(" ======= / =======" );
    

    
})(); 

// criar
// { name: 'doriana',  email: 'doriana@gmail.com', password: '123', data_nascimento: '2000-01-01'}
// localizar  
// {where: { email: 'cicrana@gmail.com', password: '123' } } 