const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.greet);
router.get('/homes/:city/:type', homeController.getSpecificTypeHomes)
router.get('/homes', homeController.getAllHomes)

module.exports = router;