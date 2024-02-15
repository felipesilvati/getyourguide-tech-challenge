const request = require('supertest');
const app = require('../app');

describe('GET /healthcheck', () => {
  it('responds with status 200 and { status: "ok" }', async () => {
    const response = await request(app)
      .get('/healthcheck')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
