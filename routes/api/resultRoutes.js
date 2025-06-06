const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/resultController');

router.post('/classify', ctrl.classifyImage);
router.get('/', ctrl.getResults);

module.exports = router;
