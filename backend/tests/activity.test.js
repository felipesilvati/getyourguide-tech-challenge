const request = require('supertest');
const app = require('../app');
const activities = require('../../resources/activities.json')
const suppliers = require('../../resources/suppliers.json');
const { getActivitiesWithSuppliers } = require('../utils/utils');

describe('GET /activities', () => {
  it('responds with status 200 and an array of activities', async () => {
    const response = await request(app)
      .get('/activities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(activities);
  });
})

describe('GET /activities/with-suppliers', () => {
  it('responds with status 200 and an array of activities with suppliers', async () => {
    const response = await request(app)
      .get('/activities/with-suppliers')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      getActivitiesWithSuppliers(activities, suppliers)
    );
  });

  it('responds with status 200 and an array of filtered activities with suppliers when a query is provided', async () => {
    const searchTerm = 'Berlin';
    const filteredActivities = activities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const expectedResponse = getActivitiesWithSuppliers(filteredActivities, suppliers);

    const response = await request(app)
      .get(`/activities/with-suppliers?query=${searchTerm}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  it('responds with status 200 and an empty array when no activities match the search term', async () => {
    const searchTerm = 'NonExistingActivity';
    const response = await request(app)
      .get(`/activities/with-suppliers?query=${searchTerm}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('correctly ignores case when filtering activities by title', async () => {
    const searchTerm = 'berlin'.toUpperCase();
    const filteredActivities = activities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const expectedResponse = getActivitiesWithSuppliers(filteredActivities, suppliers);

    const response = await request(app)
      .get(`/activities/with-suppliers?query=${searchTerm}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  it('handles search terms with special characters', async () => {
    const searchTerm = '&';

    const expectedResponse = getActivitiesWithSuppliers(
      activities.filter(activity => activity.title.includes(searchTerm)),
      suppliers
    );

    const response = await request(app)
      .get(`/activities/with-suppliers?query=${encodeURIComponent(searchTerm)}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  it('returns all activities when the query parameter is provided but is empty', async () => {
    const response = await request(app)
      .get(`/activities/with-suppliers?query=`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      getActivitiesWithSuppliers(activities, suppliers)
    );
  });
})