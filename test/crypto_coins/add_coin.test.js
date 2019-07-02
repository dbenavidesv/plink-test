const request = require('supertest');
const nock = require('nock');

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
        nock.cleanAll();
        coinMocks.mockGetCoinOK({ coin: 'BTC' });
        return request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: session.headers.authorization });
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', expect.any(String));
      }));

  it('Should fail to add the same coin to the same user twice', () => {
    let token = '';
    return userHelpers
      .createUserAndLogIn()
      .then(session => {
        nock.cleanAll();
        coinMocks.mockGetCoinOK({ coin: 'BTC' });
        token = session.headers.authorization;
        return request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: token });
      })
      .then(() => {
        nock.cleanAll();
        coinMocks.mockGetCoinOK({ coin: 'BTC' });
        return request(app)
          .post('/crypto-coins/BTC')
          .set({ authorization: token });
      })
      .then(response => {
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.UNIQUE_USER_COIN_ERROR);
      });
  });

  it('Should fail to find the requested coin', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session => {
        coinMocks.mockGetCoinNotFound();
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
        coinMocks.mockGetCoinFailure();
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
