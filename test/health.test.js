const request = require('supertest');

const app = require('../app');

describe('GET /health', () => {
  it('Should respond 200 OK showing the uptime', () =>
    request(app)
      .get('/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('uptime', expect.any(Number));
      }));
});
