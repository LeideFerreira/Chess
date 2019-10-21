var app = require('./config/server');//direciona para o server

app.listen(8080, function() {
    console.log("Express app iniciada na porta 8080.");
});
