import express from 'express';
const app = express();

import connectDB from './static/model/conexao.js';
connectDB(); 

import session from 'express-session';
import authMiddleware from './authMiddleware.js';
import { cria_conta } from './static/controllers/controllersCriaConta.js';
import { realiza_login } from './static/controllers/controllersLogin.js';
import User from './static/model/create_user.js'


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}))

app.get('/index_black-jack',(req, res) => {
  res.redirect(302, '/index_black-jack')
});

app.get('/home', authMiddleware, (req, res) => {
  res.sendFile('home.html', { root: ('private') })
})

app.get('/adm-menu', authMiddleware, (req, res) => {
  res.redirect(302, 'adm_menu.html');
});

app.get('/user/status', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }


  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
    res.json({ adm: user.adm });
  });
})


app.post('/login', realiza_login);
app.post('/criar_conta', cria_conta);

app.use(express.static('public'));

app.listen(3000, () => {console.log('Rodando em porta 3000')});
























// app.get('/adm_menu', authMiddleware, async (req, res) => {
//   const userId = req.session.userId;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'Usuário não encontrado' });
//     }

//     res.json({ isAdmin: user.adm === 1 });
//   } catch (error) {
//     return res.status(500).json({ error: 'Erro ao buscar usuário' });
//   }
// });






// app.put('/usuarios/:id', async (req, res) => {  //editar um user esxistente
//       const newUser = await prisma.user.update({ //filrando pelo id
//         where: {
//             id: req.params.id
//         },
//         data: {
//           cpf: req.body.cpf,
//           email: req.body.email,
//           nome: req.body.nome,
//           password: req.body.password
//         }
//       });
//       res.status(201).json(newUser);
// });

// app.delete('/usuarios/:id', async (req, res) => { //para deletar
//   await prisma.users.delete({
//     where: {
//       id: req.params.id //pegue i id como parametro na propria rota
//     }
//   }) 
//   res.status(200).json({ "messagem": "Usuario deletado com sucesso" })
// })

// app.get('/usuarios', async (req, res) => {          //aqui serve
//     const users = await prisma.users.findMany();    //para exibir
//                                                     //usuarios 
//     res.status(200).json(users);                    //já cadastrados      
// });
