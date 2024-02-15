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
})