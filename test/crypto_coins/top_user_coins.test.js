const request = require('supertest');
const nock = require('nock');

const userHelpers = require('../utils/helpers/users');
const coinHelpers = require('../utils/helpers/crypto_coins');
const coinMocks = require('../utils/mocks/crypto_coins');
const app = require('../../app');
const errors = require('../../app/errors');

describe('GET /users/id/top-crypto-coins', () => {
  it('Should successfully fetch the list of user top 3 coins', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/1/top-crypto-coins')
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
        expect(response.body.cryptoCoins.length).toEqual(3);
      }));

  it("Should fail due to user trying to see another user's top coins", () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/2/top-crypto-coins')
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', expect.any(Array));
        expect(response.body).toHaveProperty('internal_code', errors.INVALID_INPUT_ERROR);
      }));
});

describe('GET /users/top-crypto-coins', () => {
  it('Should successfully fetch the list of the logged user top 3 coins', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/top-crypto-coins')
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
        expect(response.body.cryptoCoins.length).toEqual(3);
      }));
});

describe('GET /users/top-crypto-coins?userId=&top=&order=', () => {
  it('Should successfully get user top coins, specifying top: 2  and order: DESC', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/top-crypto-coins')
            .query({ userId: 1, top: 2, order: 'DESC' })
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
        const coins = response.body.cryptoCoins;
        expect(coins.length).toEqual(2);
        expect(coins[0].price > coins[1].price).toEqual(true);
      }));

  it('Should successfully get user top coins, specifying top: 4  and order: ASC', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/top-crypto-coins')
            .query({ userId: 1, top: 4, order: 'ASC' })
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
        const coins = response.body.cryptoCoins;
        expect(coins.length).toEqual(4);
        expect(coins[0].price < coins[1].price).toEqual(true);
      }));

  it('Should fail due to incorrect query params', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/top-crypto-coins')
            .query({ userId: 1, top: 'A', order: 'LEFT' })
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', expect.any(Array));
        expect(response.body).toHaveProperty('internal_code', errors.INVALID_INPUT_ERROR);
      }));
});
