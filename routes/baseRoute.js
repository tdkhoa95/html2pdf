const express = require('express');
const router = express.Router();


const baseController = require('../controllers/baseController');

router.post('/convert', baseController.convert);

module.exports = router;