const activities = require('../../resources/activities.json');

exports.getActivities = (req, res) => {
  res.status(200).json(activities);
}