var express = require('express');
var consign =  require('consign');
var app = express();


app.use(express.static('./public')); //pegar imagens
//Handlebars ------ expbs eh a funcao handlbars do slide do profeessor
//app.engine('handlebars',expbs({defaultLayout:'main'}));

const expbs = require('express-handlebars');
app.engine('handlebars', expbs({  
    layoutsDir: __dirname + '/../app/views/layouts',
    defaultLayout: 'main',
}));
app.set('view engine','handlebars');
app.set('views', './app/views');

// Setup SASS directories
// app.use('/js', [
//   express.static(__dirname + './node_modules/jquery/dist'),
//   express.static(__dirname + './node_modules/popper.js/dist/umd/'),
//   express.static(__dirname + './node_modules/bootstrap/dist/js/')
// ]);

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
//utilizando isso eu crio na pasta stylesheets o arquivo css gerado do sass 
// scss de onde ele saiu da pasta sass
app.use(sassMiddleware({
    src: __dirname + '/../public/scss', //Deu certo
    dest: __dirname + '/../public/stylesheets', //esses dois pontos eh pra andar pra tras
    debug: true, 
    outputStyle: 'compressed'
  }),
  // The static middleware must come after the sass middleware-
  express.static(path.join(__dirname, 'public'))
)


//Utilizando o Consign para diminuir a chamada de rotas
//com consign
//Com isso automaticamente do todos os requires da aplicacao
consign().include('app/routes').into(app);
module.exports = app;
 