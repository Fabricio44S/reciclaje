const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/materialController');

router.post('/', ctrl.createMaterial);
router.get('/', ctrl.getMaterials);

module.exports = router;
