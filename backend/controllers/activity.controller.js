const activities = require('../../resources/activities.json');
const suppliers = require('../../resources/suppliers.json');
const { getActivitiesWithSuppliers } = require('../utils/utils');

exports.getActivities = (req, res) => {
  res.status(200).json(activities);
}

exports.getActivitiesWithSupplier = (req, res) => {
  res.status(200).json(getActivitiesWithSuppliers(activities, suppliers));
}