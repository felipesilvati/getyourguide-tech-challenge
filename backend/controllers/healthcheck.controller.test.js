const { healthCheck } = require('./healthcheck.controller');

describe('healthCheck Controller', () => {
  it('should return a 200 status and { status: "ok" }', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(), // Chainable
      json: jest.fn(),
    };

    healthCheck(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
  });
});