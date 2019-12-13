
const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    //console.log(req.session);
    if(req.session.uid){
        res.render('main/index', {
            conteudo: conteudo,
            layout:'main'
        });
    }else{
        res.redirect('/login');
    }
    
};

const about = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/about', {//dentro da view main
        conteudo: conteudo,
        layout:'main'
    });
};

const logout = (req, res) => {
    req.session.destroy(function (err) {
    if (err) {
    return console.log(err);
    }
    res.redirect('/');
    });
    }

module.exports = {index, about,logout}