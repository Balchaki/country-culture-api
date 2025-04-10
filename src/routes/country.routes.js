const express = require('express');
const router = express.Router();
const controller = require('../controllers/country.controller')

router.get('/country', controller.country)

module.exports = router;
