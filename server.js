import express from 'express'; //usando a blibliotaca de
const app = express(); //express para fazer as rotas

import connectDB from './static/conexao.js';
connectDB(); 

import User from './static/create_user.js'

import ValidaCPF from './static/valida_cpf.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('public')); 

app.get('/home', (req, res) => { 
  res.status(200).redirect('home.html');
});

app.post('/criar_conta', async (req, res) => {  
    try {
      const {email, nome, password, confirm_password, cpf} = req.body

      if (password !== confirm_password){
        return res.send.status(400).json({ error: "As senhas não coincidem" })
      }

      let validaCpf = new ValidaCPF(cpf)
      if(!validaCpf.valida()){
        return res.send.status(400).json({ error: "CPF informado é invalido" })
      }

      const newUser = new User({

        email: email,
        nome: nome,
        password: password,
        cpf: cpf

      })

      await newUser.save();
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
