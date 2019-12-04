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

const create = async (req, res) => {
    const cursos = await Curso.findAll();
    const token = req.csrfToken(); 
    console.log(token);
    if (req.route.methods.get) {
        res.render('user/create',{
            cursos:cursos,
            token:token
        });
    } else {
        try {
            await User.create(req.body);     
        } catch (e) {
            const error = new Error(e);
            console.log(e);
            res.render('user/create', { 
                user: req.body,
                cursos: cursos,
                errors: error.errors,
                token:token
            });
            return;
        }
        res.redirect('/user');
    }
};

module.exports = {index, read, create, update, remove, showError }

