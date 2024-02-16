const activities = require('../../resources/activities.json');
const suppliers = require('../../resources/suppliers.json');
const { getActivitiesWithSuppliers } = require('../utils/utils');

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const BASE_TEN_RADIX = 10;

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

  const page = parseInt(req.query.page, BASE_TEN_RADIX) || DEFAULT_FIRST_PAGE;
  const pageSize = parseInt(req.query.pageSize, BASE_TEN_RADIX) || DEFAULT_PAGE_SIZE;

  const start = (page - DEFAULT_FIRST_PAGE) * pageSize;
  const end = page * pageSize;

  const paginatedActivities = filteredActivities.slice(start, end);

  res.status(200).json({
    activities: getActivitiesWithSuppliers(paginatedActivities, suppliers),
    totalCount: filteredActivities.length,
    page,
    pageSize,
  });
}