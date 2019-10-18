const express = require("express");
const app = express();


//Handlebars ------ expbs eh a funcao handlbars do slide do profeessor
const expbs = require('express-handlebars');
app.engine('handlebars',expbs());
app.set('view engine','handlebars');

app.get('/', function(req, res) {
    res.render('index', {
        message:'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
});
app.get("/about",function(req,res){
    res.render('about',{
        message:'Olá, entrou a view About',
        layout: false,
    });
});

app.get('/',function(req,res){
    var username = 'Leide';
    res.render('index',{
        username:username, isRyan:(username=='Ryan'),
        layout:false,
    });
});

//var logger = require("morgan");

//app.use(logger("short"));
 
app.use('/img', [express.static(__dirname +'/public/img')]);
 app.use(function(req, res) {
     res.end("/img/print.png");
});


app.listen(8080, function() {
    console.log("Express app iniciada na porta 8080.");
});