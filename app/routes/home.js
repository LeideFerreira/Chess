module.exports = function(app){ //encapsulando
    app.get('/',function(req,res){
        var username = 'Leide';
        const conteudo = 'Página principal da aplicação';
        res.render('home/index',{
            username:username, isRyan:(username=='Ryan'),
            conteudo:conteudo,
            layout:false,
            
        });
    });

    app.get('/', function(req, res) {
        res.render('home/index', {
            message:'Olá, você está aprendendo Express + HBS!',
            layout: false,
        });
    });
};

