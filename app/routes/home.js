module.exports = function(app){ //encapsulando
    app.get('/',function(req,res){
        var username = 'Leide';
        res.render('home/index',{
            username:username, isRyan:(username=='Ryan'),
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

