import express from 'express';
import connectDB from './conexao.js';
connectDB();

const app = express();
app.use(express.json())

const users = [];


app.post('/usuarios', (req, res) => {
    users.push(req.body)
    res.status(201).send('deu bom')
});
app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
});


app.listen(3000, () => {
    console.log('Server Rodando em porta 3000')
});
