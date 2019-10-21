module.exports = function(app){ //encapsulando
    app.get('/',function(req,res){
        var username = 'Leide';
        const conteudo = 'Página principal da aplicação';
        res.render('index',{
            username:username, isRyan:(username=='Ryan'),
            message:'Olá, você está aprendendo Express + HBS!',
            conteudo:conteudo,
            layout:'main',
            
        });
    });
};

