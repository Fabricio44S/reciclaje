const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/robotController');

router.post('/', ctrl.createRobot);
router.get('/', ctrl.getRobots);

module.exports = router;
