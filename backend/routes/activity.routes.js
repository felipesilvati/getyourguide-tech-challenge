const express = require('express');
const activityController = require('../controllers/activity.controller');
const router = express.Router();

router.get('/', activityController.getActivities);

module.exports = router;