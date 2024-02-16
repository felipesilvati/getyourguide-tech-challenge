const activities = require('../../resources/activities.json');
const suppliers = require('../../resources/suppliers.json');
const { getActivitiesWithSuppliers } = require('../utils/utils');

exports.getActivities = (req, res) => {
  res.status(200).json(activities);
}

exports.getActivitiesWithSupplier = (req, res) => {
  let filteredActivities = req.query?.query ?
    activities.filter(activity => activity.title.toLowerCase().includes(req.query.query?.toLowerCase()))
    : activities;

  // query parameter onlyShowSpecialOffers is a string, so we need to compare it to the string 'true'
  if (req.query?.onlyShowSpecialOffers === 'true') {
    filteredActivities = filteredActivities.filter(activity => activity.specialOffer);
  }

  res.status(200).json(getActivitiesWithSuppliers(filteredActivities, suppliers));
}