const request = require('supertest');

// const utilCoinObjects = require('../utils//objects/crypto_coins');
const coinMocks = require('../utils/mocks/crypto_coins');
const userHelpers = require('../utils/helpers/users');
const app = require('../../app');
const errors = require('../../app/errors');

describe('POST /crypto-coins/:id', () => {
  it('Should successfully add coin to the logged user', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session => {
        coinMocks.mockCoinApiOK();
        return request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: session.headers.authorization });
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', expect.any(String));
      }));

  it('Should fail to find the requested coin', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session => {
        coinMocks.mockCoinApiItemNotFound();
        return request(app)
          .post('/crypto-coins/ABDCEFG')
          .set({ authorization: session.headers.authorization });
      })
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.ITEM_NOT_FOUND_ERROR);
      }));

  it('Should fail due to api not responding', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session => {
        coinMocks.mockCoinApiFailure();
        return request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: session.headers.authorization });
      })
      .then(response => {
        expect(response.statusCode).toBe(503);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.CRYPTO_COIN_API_ERROR);
      }));
});
