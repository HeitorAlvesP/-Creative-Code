import express from 'express';
import connectDB from './conexao.js';
const app = express();
connectDB();



app.get('/usuarios', (req, res) => {
    res.send('Okay, deu bom')
});


app.listen(3000, () => {
    console.log('Server Rodando em porta 3000')
});


