var express = require('express');
var consign =  require('consign');
var app = express();

app.use(express.static('./public')); //pegar imagens
    
const expbs = require('express-handlebars');
//Handlebars ------ expbs eh a funcao handlbars do slide do profeessor
app.engine('handlebars',expbs());
app.set('view engine','handlebars');
app.set('views','./app/views');



//Utilizando o Consign para diminuir a chamada de rotas
//com consign
//Com isso automaticamente do todos os requires da aplicacao
consign().include('app/routes').into(app);

module.exports = app;
 