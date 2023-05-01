const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const cors = require('cors');
const model = require('./models');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.post('/create', async (req, res) => {
    let reqs = await model.User.create({
        'name': req.body.nomeUser,
        'email': req.body.emailUser,
        'password': req.body.passwordUser,
        'data_nascimento': req.body.data_nascimentoUser,
        'createdAt': new Date(),
        'updatedAt': new Date()
    });
    if (reqs) {
        res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
    }
});
app.post('/login', async (req, res) => {
    try {
        const { emailUser, passwordUser } = req.body;
        const user = await model.User.findOne({
            where: {
                email: emailUser,
                password: passwordUser
            }
        });
        if (user) {
            console.log(user.id);
            res.send(JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                message: 'Login bem-sucedido!'
            }));
        } else {
            res.status(401).send(JSON.stringify({ message: 'Credenciais inválidas!' }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(JSON.stringify({ message: 'Ocorreu um erro ao fazer login!' }));
    }
});
app.post('/add-relacao-sexual', async (req, res) => {
    try {
        const { id_usuario, data } = req.body;
        const relacaoSexual = await model.RelacaoSexual.create({
            id_usuario,
            data
        });
        res.status(201).json(relacaoSexual);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar relação sexual' });
    }
});


//Start server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});