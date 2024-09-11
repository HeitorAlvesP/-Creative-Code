import { PrismaClient } from '@prisma/client'; //isso aqui tendi nn kkj
const prisma = new PrismaClient() //tem haver com banco online kkj

import express from 'express'; //usando a blibliotaca de
const app = express(); //express para fazer as rotas

import connectDB from './static/conexao.js';
connectDB(); //conexão do banco

//import ValidaCPF from './static/valida_cpf.js';

app.use(express.json()) //para ler json
app.use(express.urlencoded({ extended: true })) // para ler o html
app.use(express.static('public')); //para usar seus aqruivos no front

app.get('/home', (req, res) => { //pagin inicial
  res.status(200).redirect('home.html');
});

app.post('/criar_conta', async (req, res) => {  //essa serve para criar
    try {
      const {email, nome, password, confirm_password} = req.body

      if (password !== confirm_password){
        return res.send.status(400).json({ error: "As senhas não coincidem" })
      }

      // let validaCpf = new ValidaCPF(cpf)
      // if(!validaCpf.valida()){
      //   return res.send.status(400).json({ error: "CPF informado é invalido" })
      // }

      const newUser = await prisma.users.create({  
        data: {
          //cpf,    // o cpf n pode ser repitido
          email, //o email n pode ser repitido
          nome,
          password,
        }
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  //rota para criar




































app.put('/usuarios/:id', async (req, res) => {  //editar um user esxistente
      const newUser = await prisma.user.update({ //filrando pelo id
        where: {
            id: req.params.id
        },
        data: {
          cpf: req.body.cpf,
          email: req.body.email,
          nome: req.body.nome,
          password: req.body.password
        }
      });
      res.status(201).json(newUser);
});

app.delete('/usuarios/:id', async (req, res) => { //para deletar
  await prisma.users.delete({
    where: {
      id: req.params.id //pegue i id como parametro na propria rota
    }
  }) 
  res.status(200).json({ "messagem": "Usuario deletado com sucesso" })
})

app.get('/usuarios', async (req, res) => {          //aqui serve
    const users = await prisma.users.findMany();    //para exibir
                                                    //usuarios 
    res.status(200).json(users);                    //já cadastrados      
});



app.listen(3000, () => {  //porta usado para rodar o sistema
    console.log('Server Rodando em porta 3000'); // sem precisar de servidor
}); //resumindo rodar local na porta 3000
