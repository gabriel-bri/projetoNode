const express = require('express');
const app = express();
const salmos = require('./biblia.json');

app.get('/', function(req, res){   
    res.json(salmos);
})

app.get('/aleatorio', function(req, res){
    const tamanhoJSON = Object.keys(salmos).length;
    const indiceAleatorio = Math.floor(Math.random() * tamanhoJSON); 
    
    res.json(salmos[indiceAleatorio]);
})

app.get('/salmo/:id', function(req, res){
    const idSalmo = parseInt(req.params.id);

    return buscaId(salmos, idSalmo) ? res.json(salmos[idSalmo]) : res.status(404).json({ mensagem: `Objeto com ID ${idSalmo} não encontrado.` });
})

// Rota de fallback para tratar rotas inválidas
app.use((req, res, next) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.listen(8080, function(){
    console.log("servidor rodando na porta 8080");
})

// Funções adicionais
function buscaId(salmos, ID) {
    return salmos[ID];
}