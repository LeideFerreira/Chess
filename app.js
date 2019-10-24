var express = require('express');
const router = require("./config/routes");
const cookieParser = require('cookie-parser');

//var consign =  require('consign');
var app = express();
app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(cookieParser());

app.use(express.static('/public')); //pegar imagens
//Handlebars ------ expbs eh a funcao handlbars do slide do profeessor
//app.engine('handlebars',expbs({defaultLayout:'main'}));


const expbs = require('express-handlebars');
app.engine('handlebars', expbs({  
    layoutsDir: __dirname + '/app/views/layouts',
    defaultLayout: 'main',
}));
app.set('view engine','handlebars');
app.set('views','./app/views/');

//utilizando isso eu crio na pasta stylesheets o arquivo css gerado do sass 
// scss de onde ele saiu da pasta sass
app.use('/js', [
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
  express.static(__dirname+'/public/js')
]);


var sassMiddleware = require('node-sass-middleware');//Setup SASS directories
var path = require('path');

app.use(sassMiddleware({
    src: __dirname + '/public/scss', //Deu certo
    dest: __dirname + '/public/css', //esses dois pontos eh pra andar pra tras
    debug: true, 
    outputStyle: 'compressed',
    prefix: '/css'
  }),
  // The static middleware must come after the sass middleware-
  express.static(path.join(__dirname, 'public'))
)

app.listen(8080, function() {
    console.log("Express app iniciada na porta 8080.");
});
