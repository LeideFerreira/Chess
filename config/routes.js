const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const areaController = require('../app/controllers/area');
const cursoController = require('../app/controllers/curso');
const userController = require('../app/controllers/user');

//mainController
router.get('/', mainController.index);
router.get('/sobre',mainController.about);
router.get('/socket',mainController.socket);
router.get('/logout',mainController.logout);

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