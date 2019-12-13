var express = require('express');
const router = require("./config/routes");
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
var uid = require('uuid/v4');
var session = require('express-session');

var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
// --------------------------- socket -------------->
var players = 0;

io.on('connect', function (socket) {
  const playerId = socket.id.substr(0, 4);
  var sala;
  console.log("Servidor---->  usuario conectado player: ", playerId);
  
  socket.on('joined', function (sala) {
    console.log("Servidor---->  joined");
    if (players < 2) {
      players++; //bota jogador
    } else {
      socket.emit('full', sala); //sala cheia
      return;
    }
    console.log("Servidor: Jogadores na sala: ",players);
    socket.emit('player', { playerId, players, sala});//iniciar tabuleiro
  });


  socket.on('move',  (msg) =>{
    socket.broadcast.emit('move', msg);
  });

  socket.on('play',  (msg) =>{
    socket.broadcast.emit('play', msg);
    console.log("Servidor----> ready " + msg);
  });

  socket.on('disconnect',  () =>{
    if(players > 0){
      players--;
    }

    console.log("Servidor----> "+ playerId + ' se  desconectou');
    console.log("Servidor----> Jogadores na sala: ",players);
  });
});

// --------------------------- socket -------------->
const PORT = process.env.PORT || 4567;
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
  express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
  express.static(__dirname + '/node_modules/chess.js/'),
  express.static(__dirname + '/public/js')
]);

app.use('/css', [
  express.static(__dirname + '/public/css/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/css/'),
  express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
]);

var sassMiddleware = require('node-sass-middleware');//Setup SASS directories
var path = require('path');

app.use(sassMiddleware({
  src: __dirname + '/public/scss',
  dest: __dirname + '/public/css',
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}),
  // The static middleware must come after the sass middleware-
  express.static(path.join(__dirname, 'public')))
http.listen(PORT, function () {
  console.log("Ouvindo a porta " + PORT);
});
