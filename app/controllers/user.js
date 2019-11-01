var models = require('../models/index');
var User = models.user;

const update = (req, res) => { };
const remove = (req, res) => { };

const index = async (req, res) => {
    const users = await User.findAll(
        // include: [{
        //     model: Curso,
        //     as: 'curso'
        // }],
    );
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
    if (req.route.methods.get) {
        res.render('user/create');
    } else {
        try {
            await User.create(req.body);
           
        } catch (e) {
            res.render('user/create', {
                user: req.body,
                errors: error.errors,
                csrf: req.csrfToken()
            });
        }
        res.redirect('/user');
    }

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
module.exports = {index, read, create, update, remove, showError }

