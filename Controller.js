const express=require('express');
const bodyParser=require('body-parser');
const mercadopago=require('mercadopago');
const cors=require('cors');

let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.post('/create',async(req,res)=>{
    let reqs = await model.User.create({
        'name':req.body.nomeUser,
        'data_nascimento': req.body.data_nascimentoUser,
        'email':req.body.emailUser,
        'password':req.body.passwordUser,
        'createdAt':new Date(),
        'updatedAt':new Date()
    });
    if(reqs){
        res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
    }
});

//Start server
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});