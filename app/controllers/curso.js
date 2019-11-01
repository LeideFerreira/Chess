var models = require('../models/index');
var Curso = models.curso;

const index = async (req, res) => {
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        cursos: cursos,
        message: "Listando os cursos",
    });
};

//const read = (req, res) => {};
const read = async function (req, res) {
    var cursoId = req.param('id');
    res.end(cursoId);
};

//const create = (req, res) => {};
// const create = async function (req, res) {
//     if (req.route.methods.get) {
//         res.render('curso/create');
//     } else {
//         curso = await Curso.create({
//             sigla: req.body.sigla,
//             nome: req.body.nome,
//             descricao: req.body.descricao,
//             id_area: req.body.area,
//         });

//     } 
// } 
const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('curso/create');
    } else {
        try {
            await Curso.create(req.body);
        } catch (e) {
            res.render('curso/create', {
                curso: req.body,
                errors: error.errors,
                csrf: req.csrfToken()
            });
        }
        res.redirect('/curso');
    }
    
};
const update = (req, res) => { };
const remove = (req, res) => { };
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
module.exports = { index, read, create, update, remove,showError }