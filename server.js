import { PrismaClient } from '@prisma/client'; //isso aqui tendi nn kkj
const prisma = new PrismaClient() //tem haver com banco online kkj

import express from 'express'; //usando a blibliotaca de
const app = express(); //express para fazer as rotas

import connectDB from './static/conexao.js';
connectDB(); //conexão do banco

app.use(express.json())
app.use(express.static('public')); //para usar seus aqruivos no front


app.post('/usuarios', async (req, res) => {  //essa serve para criar
    try {
      const newUser = await prisma.users.create({  
        data: {
          email: req.body.email, //o email n pode ser repitido
          nome: req.body.nome,
          password: req.body.password
        }
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  //rota para criar

app.put('/usuarios', async (req, res) => {  //editar um user esxistente
      const newUser = await prisma.users.update({ //filrando pelo id
        data: {
          email: req.body.email, //o email n pode ser repitido
          nome: req.body.nome,
          password: req.body.password
        }
      });
      res.status(201).json(newUser);
});

app.get('/usuarios', async (req, res) => {          //aqui serve
    const users = await prisma.users.findMany();    //para exibir
                                                    //usuarios 
    res.status(200).json(users);                    //já cadastrados      
});

app.get('/home', (req, res) => { //pagin inicial
    res.status(200).redirect('home.html');
});

app.listen(3000, () => {  //porta usado para rodar o sistema
    console.log('Server Rodando em porta 3000'); // sem precisar de servidor
}); //resumindo rodar local na porta 3000
