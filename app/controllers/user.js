var models = require('../models/index');
const bcrypt = require('bcryptjs');


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

const create = async (req, res) => {
    const cursos = await Curso.findAll();
    const token = req.csrfToken()
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
            if (req.route.methods.get) {
               console.log("Tá no GET");
               res.render('user/create',{
                   cursos:cursos, //pra selecionar o curso
                   csrf: token
               });
            } else {
                try {
                    console.log("Ta no Try");
                    await User.create({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: hash,
                        cursos:cursos,
                        id_curso: req.body.id_curso
                    });
                } catch (e) {
                    console.log("Ta no Catch")
                    res.render('user/create', {
                        cursos:cursos,
                        errors: e.errors,
                        csrf: token
                    });
                return;
                }
                res.redirect('/user');
            }
        });
    });
};

module.exports = { index, read, create, update, remove }
