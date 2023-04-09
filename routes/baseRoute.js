const express = require('express');
const router = express.Router();


const baseController = require('../controllers/baseController');

//#region GET
router.get('/healthz', baseController.healthz);
//#endregion

//#region POST
router.post('/convert', baseController.convert);
router.post('/convert-multiple', baseController.convertMultiple);
//#endregion

module.exports = router;