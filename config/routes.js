const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const areaController = require('../app/controllers/area');
const cursoController = require('../app/controllers/curso');
const userController = require('../app/controllers/user');
const partidaController = require('../app/controllers/partida');

//mainController
router.get('/', mainController.index);
router.get('/sobre',mainController.about);
router.get('/logout',mainController.logout);

//partidaController
router.get('/partida',partidaController.socket);
router.get('/partida/socket',partidaController.socket);
router.get('/partida/jogo', partidaController.jogo)
router.get('/partida/:color',partidaController.jogo);

//areaController
router.get('/area',areaController.index);

//cursoController
router.get('/curso',cursoController.index);

router.get('/curso/read/:id',cursoController.read);

router.get('/curso/create',cursoController.create);
router.post('/curso/create',cursoController.create);

router.get('/curso/update/:id',cursoController.update);
router.post('/curso/update/:id',cursoController.update);
router.post('/curso/remove',cursoController.remove);
//userController
router.get('/user',userController.index);

router.get('/login',userController.login);
router.get('/user/login',userController.login);
router.post('/user/login',userController.login);

router.get('/siginup',userController.create);
router.get('/user/siginup',userController.create);
router.post('/user/siginup',userController.create);

router.get('/user/create',userController.create);
router.post('/user/create',userController.create);

module.exports = router;