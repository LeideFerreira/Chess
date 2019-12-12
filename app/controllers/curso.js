var models = require('../models/index');
var Curso = models.curso;
var Area = models.area;

const index = async (req, res) => {
    const token = req.csrfToken();
    const cursos = await Curso.findAll();
    console.log("Router index");
    res.render('curso/index', {
        cursos: cursos, token: token
    });
};

const read = async function (req, res) {
    var cursoId = req.param('id');
    console.log("Router read");
    var curso = await Curso.findOne({ where: { id: cursoId } });
    var area = await Area.findOne({ where: { id: curso.id_area } });
    res.render('curso/read', { curso: curso, area: area });
};

const remove = async function (req, res) {
    console.log("Router remove");
    var cursoId = req.param('id'); //pegar o id do curso
    await Curso.destroy({ where: { id: cursoId } });
    res.json({ success: true });
};

const update = async function (req, res) {
    var cursoId = req.param('id'); //pegar o id do curso
    var curso = await Curso.findOne({ where: { id: cursoId } });
    const areas = await Area.findAll();
    const token = req.csrfToken();

    if (req.route.methods.get) {
        console.log("Ta GET")
        res.render('curso/update', { areas: areas, curso: curso, token: token });
    } else {
        try {
            console.log("Ta no Try");
            await Curso.update({
                nome: req.body.nome,
                sigla: req.body.sigla,
                descricao: req.body.descricao,
                id_area: req.body.id_area
            },
                { where: { id: cursoId } });
        } catch (e) {
            console.log(e);
            res.render('curso/update', { areas: areas, errors: e.errors, token: token });
            return;
        }
        res.redirect('/curso');
    }
};

const create = async (req, res) => {
    const areas = await Area.findAll();
    const token = req.csrfToken();

    if (req.route.methods.get) {
        res.render('curso/create', { areas: areas, token: token });
    } else {
        try {
            console.log("Ta no Try");
            await Curso.create({ nome: req.body.nome, sigla: req.body.sigla, descricao: req.body.descricao, id_area: req.body.id_area });
        } catch (e) {
            console.log("Ta no Catch")
            res.render('curso/create', { areas: areas, errors: e.errors, token: token });
            return;
        }
        res.redirect('/curso');
    }
};
module.exports = { index, read, create, update, remove }