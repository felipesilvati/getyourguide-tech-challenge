const request = require('supertest');
const app = require('../app');
const suppliers = require('../resources/suppliers.json')

describe('GET /suppliers', () => {
  it('responds with status 200 and an array of suppliers', async () => {
    const response = await request(app)
      .get('/suppliers')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(suppliers);
  });
})
