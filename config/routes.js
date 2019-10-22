const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');

router.get('/', mainController.index);
router.get('/about',mainController.about);

module.exports = router;