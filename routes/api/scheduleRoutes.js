const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/scheduleController');

router.post('/', ctrl.createSchedule);
router.get('/', ctrl.getSchedules);

module.exports = router;
