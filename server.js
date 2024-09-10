import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

import express from 'express';
const app = express();

import connectDB from './static/conexao.js';
connectDB();

app.use(express.json())
app.use(express.static('public'));

const users = [];

app.post('/usuarios', async (req, res) => {
    try {
      const newUser = await prisma.users.create({  
        data: {
          email: req.body.email,
          nome: req.body.nome,
          password: req.body.password
        }
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/usuarios', (req, res) => {
    res.status(200).redirect('home.html')
});


app.listen(3000, () => {
    console.log('Server Rodando em porta 3000')
});
