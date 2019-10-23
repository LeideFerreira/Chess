const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const areaController = require('../app/controllers/area');
router.get('/', mainController.index);
router.get('/about',mainController.about);
router.get('/area',areaController.index);
module.exports = router;