import express from 'express';
const app = express();
//const http = require('http');

app.get('/usuario', (req, res) => {
    res.send('Okay, deu bom')
});



app.listen(3000, () => {
    console.log('Server Rodando em porta 3000')
});


