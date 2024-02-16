const request = require('supertest');
const app = require('../app');
const activities = require('../../resources/activities.json')
const suppliers = require('../../resources/suppliers.json');
const { getActivitiesWithSuppliers } = require('../utils/utils');

const DEFAULT_PAGINATION_SLICE = 10;

describe('GET /activities', () => {
  it('responds with status 200 and the full array of activities', async () => {
    const response = await request(app)
      .get('/activities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(activities);
  });
})

describe('GET /activities/with-suppliers', () => {
  it('responds with status 200 and the first page of activities with suppliers', async () => {
    const response = await request(app)
      .get('/activities/with-suppliers')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.activities).toEqual(
      getActivitiesWithSuppliers(activities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE)
    );
  });

  describe('with search query parameter', () => {
    it('responds with status 200 and the first page of filtered activities with suppliers when a query is provided', async () => {
      const searchTerm = 'Berlin';
      const filteredActivities = activities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const expectedResponse = getActivitiesWithSuppliers(filteredActivities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE);

      const response = await request(app)
        .get(`/activities/with-suppliers?query=${searchTerm}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(expectedResponse);
    });

    it('responds with status 200 and an empty array when no matching activities are found for the search term', async () => {
      const searchTerm = 'NonExistingActivity';
      const response = await request(app)
        .get(`/activities/with-suppliers?query=${searchTerm}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual([]);
    });

    it('responds with status 200 and the first page of activities ignoring case when filtering by title', async () => {
      const searchTerm = 'berlin'.toUpperCase();
      const filteredActivities = activities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const expectedResponse = getActivitiesWithSuppliers(filteredActivities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE);

      const response = await request(app)
        .get(`/activities/with-suppliers?query=${searchTerm}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(expectedResponse);
    });

    it('responds with status 200 and the first page of activities when handling search terms with special characters', async () => {
      const searchTerm = '&';

      const expectedResponse = getActivitiesWithSuppliers(
        activities.filter(activity => activity.title.includes(searchTerm)),
        suppliers
      ).slice(0, DEFAULT_PAGINATION_SLICE);

      const response = await request(app)
        .get(`/activities/with-suppliers?query=${encodeURIComponent(searchTerm)}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(expectedResponse);
    });

    it('responds with status 200 and the first page of activities when the search query parameter is empty', async () => {
      const response = await request(app)
        .get(`/activities/with-suppliers?query=`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(
        getActivitiesWithSuppliers(activities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE)
      );
    });
  });

  describe('with onlyShowSpecialOffers query parameter', () => {
    it('responds with status 200 and the first page of activities with suppliers featuring special offers when onlyShowSpecialOffers is true', async () => {
      const response = await request(app)
        .get(`/activities/with-suppliers?onlyShowSpecialOffers=true`)
        .expect('Content-Type', /json/)
        .expect(200);

      const specialOfferActivities = activities.filter(activity => activity.specialOffer);
      expect(response.body.activities).toEqual(
        getActivitiesWithSuppliers(specialOfferActivities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE)
      );
    });

    it('responds with status 200 and the first page of all activities with suppliers when onlyShowSpecialOffers is false', async () => {
      const response = await request(app)
        .get(`/activities/with-suppliers?onlyShowSpecialOffers=false`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(
        getActivitiesWithSuppliers(activities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE)
      );
    });

    it('responds with status 200 and the first page of all activities with suppliers when onlyShowSpecialOffers is not provided', async () => {
      const response = await request(app)
        .get(`/activities/with-suppliers`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(
        getActivitiesWithSuppliers(activities, suppliers).slice(0, DEFAULT_PAGINATION_SLICE)
      );
    });
  })

  describe('with pagination query parameters', () => {
    it('responds with status 200 and the specified page of activities with suppliers when page and pageSize parameters are provided', async () => {
      const page = 2;
      const pageSize = DEFAULT_PAGINATION_SLICE;
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const response = await request(app)
        .get(`/activities/with-suppliers?page=${page}&pageSize=${pageSize}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual(
        getActivitiesWithSuppliers(activities.slice(startIndex, endIndex), suppliers)
      );
      expect(response.body.totalCount).toEqual(activities.length);
    });

    it('responds with status 200 and the specified number of activities when pageSize is provided', async () => {
      const page = 1;
      const pageSize = 5;
      const response = await request(app)
        .get(`/activities/with-suppliers?page=${page}&pageSize=${pageSize}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities.length).toEqual(pageSize);
    });

    it('responds with status 200 and an empty array when the requested page number exceeds the total number of available pages', async () => {
      const page = 100; // Assuming this is beyond the last page
      const pageSize = DEFAULT_PAGINATION_SLICE;
      const response = await request(app)
        .get(`/activities/with-suppliers?page=${page}&pageSize=${pageSize}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.activities).toEqual([]);
      expect(response.body.totalCount).toEqual(activities.length);
    });
  })
})