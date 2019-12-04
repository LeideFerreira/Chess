var models = require('../models/index');
var Curso = models.curso;
var Area = models.area;
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

const create = async (req, res) => {
    const areas = await Area.findAll();
    const token = req.csrfToken();
    console.log(token);
    if (req.route.methods.get) {
        res.render('curso/create',{
            curso: req.body,
            areas: areas,
            token: token
        });
    } else {
        try {
            await Curso.create(req.body);
        } catch (e) {
            const error = new Error(e);
            res.render('curso/create', {
                curso: req.body,
                areas: areas,
                errors: error.errors,
                token: token
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