const request = require('supertest');

const userHelpers = require('../utils/helpers/users');
const sessionHelpers = require('../utils/helpers/sessions');
const app = require('../../app');
const errors = require('../../app/errors');

describe('POST /crypto-coins (endpoint which needs authentication)', () => {
  it('Should fail due to not token provided', () =>
    userHelpers
      .createUserAndLogIn()
      .then(() =>
        request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: '' })
      )
      .then(response => {
        expect(response.statusCode).toBe(440);
        expect(response.body).toHaveProperty('message', 'Session error: no token provided');
        expect(response.body).toHaveProperty('internal_code', errors.SESSION_ERROR);
      }));

  it('Should fail due to invalid token', () =>
    userHelpers
      .createUserAndLogIn()
      .then(() =>
        request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: sessionHelpers.invalidToken })
      )
      .then(response => {
        expect(response.statusCode).toBe(440);
        expect(response.body).toHaveProperty('message', 'Session error: invalid token');
        expect(response.body).toHaveProperty('internal_code', errors.SESSION_ERROR);
      }));

  it('Should fail due to expired token', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: sessionHelpers.forceTokenToExpire(session.headers.authorization) })
      )
      .then(response => {
        expect(response.statusCode).toBe(440);
        expect(response.body).toHaveProperty('message', 'Session error: jwt expired');
        expect(response.body).toHaveProperty('internal_code', errors.SESSION_ERROR);
      }));
});
