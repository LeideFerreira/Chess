var models = require('../models/index');
var User = models.user;
var Curso = models.curso;

const update = (req, res) => { };
const remove = (req, res) => { };

const index = async (req, res) => {
    const users = await User.findAll();
    res.render('user/index', {
        users: users,
        message: "Listando os users",
    });
};


const read = async function (req, res) {
    var userId = req.param('id');
    res.end(userId);
};

// const create = (req, res) => {};
// const create = async function (req, res) {
//     if (req.route.methods.get) {
//         res.render('user/create');
//     } else {
//         user = await User.create({
//             nome: req.body.nome,
//             senha: req.body.senha,
//             email: req.body.email,
//             id_curso: req.body.curso,
            
//         });
//         res.redirect('/user');
//     } 
// } 

const create = async (req, res) => {
    const cursos = await Curso.findAll();
    if (req.route.methods.get) {
        res.render('user/create',{
            cursos:cursos
        });
        console.log("Entrou aqui1");
    } else {
        try {
            await User.create(req.body);     
        } catch (e) {
            console.log("Entrou aqui");
            res.render('user/create', { 
                user: req.body,
                cursos: cursos,
                errors: error.errors,
                csrf: req.csrfToken()
            });
        }
        res.redirect('/user');
    }
};
// include: [{
//     model: Curso,
//     as: 'curso'
// }],
const showError = function (errors, field) {
    var mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            if (error.path == field) {
                mensagem = error.message;
                return;
            }
        });
        return mensagem;
    }
}
module.exports = {index, read, create, update, remove, showError }

