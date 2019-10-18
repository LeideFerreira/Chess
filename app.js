var app = require('./config/server');//direciona para o server


//Sem consign
// var rotaHome = require('./app/routes/home');
// rotaHome(app);

app.listen(8080, function() {
    console.log("Express app iniciada na porta 8080.");
});
