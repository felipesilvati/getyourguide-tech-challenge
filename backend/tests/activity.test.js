const request = require('supertest');
const app = require('../app');
const activities = require('../../resources/activities.json')

describe('GET /activities', () => {
  it('responds with status 200 and an array of activities', async () => {
    const response = await request(app)
      .get('/activities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(activities);
  });
})
