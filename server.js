import express from 'express';
import connectDB from './static/conexao.js';
connectDB();

const app = express();
app.use(express.json())
app.use(express.static('public'));

const users = [];

app.post('/usuarios', (req, res) => {
    users.push(req.body)
    
    res.status(201).redirect('criar_conta.html')
});
app.get('/usuarios', (req, res) => {
    console.log(users);
    res.status(200).redirect('home.html')
});


app.listen(3000, () => {
    console.log('Server Rodando em porta 3000')
});
