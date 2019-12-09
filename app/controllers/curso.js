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

    if (req.route.methods.get) {
        res.render('curso/create',{
            areas: areas,
            token: token
        });
    } else {
        try {
            console.log("Ta no Try")
            await Curso.create({
                nome: req.body.nome,
                sigla: req.body.sigla,
                descricao:req.body.descricao,
                areas: areas,
                id_area: req.body.id_area
            });
        } catch (e) {
            console.log("Ta no Catch")
            res.render('curso/create', {
                areas: areas,
                errors: e.errors,
                token: token
            });
            return;
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