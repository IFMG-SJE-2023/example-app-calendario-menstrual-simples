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
    try {
      let user = await model.User.create({
        'name': req.body.nomeUser,
        'email': req.body.emailUser,
        'password': req.body.passwordUser,
        'data_nascimento': req.body.data_nascimentoUser,
        'createdAt': new Date(),
        'updatedAt': new Date()
      });
  
      if (user) {
        res.status(200).json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            data_nascimento: user.data_nascimento
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Erro ao criar usuário'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
});





app.post('/login', async (req, res) => {
    try {
        const { emailUser, passwordUser } = req.body;
        let user = await model.User.findOne({
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



// grava  um dia de relacao sexual
app.post('/add-relacao-sexual', async (req, res) => {
    try {

        const { id_usuarioRelacao, dataRelacao } = req.body;
        const relacaoSexual = await model.RelacaoSexual.create({
            'id_usuario': id_usuarioRelacao,
            'data': dataRelacao,
            'createdAt': new Date().toISOString(),
            'updatedAt': new Date().toDateString()

        });
        res.status(201).json(relacaoSexual);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar relação sexual' });
    }
});
app.post('/add-ciclo-menstrual', async (req, res) => {
  try {
    const { id_usuarioCiclo, dataInicio , dataFim, intervalo1} = req.body;
      const cicloMenstrual = await model.Ciclo_Menstrual.create({
          'id_usuario': id_usuarioCiclo,
          'data_inicio': dataInicio,
          'data_final': dataFim,
          'intervalo': intervalo1,
          'createdAt': new Date(),
          'updatedAt': new Date()
      });
      res.status(201).json(cicloMenstrual);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar ciclo menstrual' });
  }
});



// busca todas  dias  de relacao sexual
app.post('/get-relacao-sexual', async (req, res) => {
    try {
        const { id_usuarioRelacao } = req.body;
        const relacaoSexual = await model.RelacaoSexual.findAll({
            where: {
                id_usuario: id_usuarioRelacao
            },
            order: [['data', 'DESC']]
        });
        if (relacaoSexual) {
            console.log(relacaoSexual);
            res.send(JSON.stringify( relacaoSexual));
        } else {
            res.status(401).send(JSON.stringify({ message: 'erro ao buscar todas relacoes' }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(JSON.stringify({ message: 'Ocorreu um erro ao buscar todas relacoes' }));
    }
});




// busca ultima menstruacao
app.post('/get-ultima-menstruacao', async (req, res) => {
    try {
        const { id_usuarioCiclo } = req.body;
        const Ciclo_Menstrual = await model.Ciclo_Menstrual.findAll({
            where: {
                id_usuario: id_usuarioCiclo
            },
            order: [['data_inicio', 'DESC']],
            limit: 1
        });
        if (Ciclo_Menstrual) {
            console.log(Ciclo_Menstrual);
            res.send(JSON.stringify( Ciclo_Menstrual));
        } else {
            res.status(401).send(JSON.stringify({ message: 'erro ao buscar ultimo menstru' }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(JSON.stringify({ message: 'Ocorreu um erro ao buscar mentruacao' }));
    }
});



//Start server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
