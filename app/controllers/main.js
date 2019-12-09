const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
        layout:'main'
    });
};
const about = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/about', {//dentro da view main
        conteudo: conteudo,
        layout:'main'
    });
};
const socket = (req, res)=>{
    res.render('main/socket',{
        layout:''
    })
}

const siginup = (req,res)=>{
    res.redirect('user/create');
}

const login = (req,res)=>{
    res.redirect('user/login');
}
const logout = (req, res) => {
    req.session.destroy(function (err) {
    if (err) {
    return console.log(err);
    }
    res.redirect('/');
    });
    }

module.exports = { socket,index, about ,siginup,login,logout}