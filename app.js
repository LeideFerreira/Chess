var express = require('express');
const router = require("./config/routes");
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
var uid = require('uuid/v4');
var session = require('express-session');

//var consign =  require('consign');
var app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const PORT = process.env.PORT ||3000;
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(session({
  genid: (req) => {
    return uid() // usamos UUIDs para gerar os SESSID
  },
  secret: 'Hi9Cf#mK98',
  resave: true,
  saveUninitialized: true
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});
app.use(router);

app.use(express.static('/public')); //pegar imagens
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/uuid', function (req, res) {
  const uniqueId = uuid()
  res.send(`UUID: ${uniqueId}`)
})

app.get('/apaga_cookie', function (req, res) {
  res.clearCookie('nome');
  res.send('cookie apagado');
});

//Handlebars ------ expbs eh a funcao handlbars do slide do profeessor
const expbs = require('express-handlebars');
app.engine('handlebars', expbs({
  helpers: require(__dirname + '/app/views/helpers/helpers.js'),
  layoutsDir: __dirname + '/app/views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', './app/views/');

//utilizando isso eu crio na pasta stylesheets o arquivo css gerado do sass 
// scss de onde ele saiu da pasta sass
app.use('/js', [
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
  express.static(__dirname + '/public/js')
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
express.static(path.join(__dirname, 'public')))
app.listen(4567, function () {
  console.log("Express app iniciada na porta 4567.");
});
