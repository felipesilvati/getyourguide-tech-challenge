const express = require('express');
const activityController = require('../controllers/activity.controller');
const router = express.Router();

router.get('/', activityController.getActivities);
router.get('/with-suppliers', activityController.getActivitiesWithSupplier);

module.exports = router;