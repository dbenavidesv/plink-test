const request = require('supertest');
const nock = require('nock');

const userHelpers = require('../utils/helpers/users');
const coinHelpers = require('../utils/helpers/crypto_coins');
const coinMocks = require('../utils/mocks/crypto_coins');
const app = require('../../app');

describe('GET /users/:id/crypto-coins', () => {
  it('Should succesfully fetch the list of coins the user has added', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() => {
          nock.cleanAll();
          coinMocks.mulipleMockGetCoinOK();
          return request(app)
            .get('/users/1/crypto-coins')
            .set({ authorization: session.headers.authorization });
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
      }));

  it('Should respond OK indicating that the user has not added any coins', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        request(app)
          .get('/users/1/crypto-coins')
          .set({ authorization: session.headers.authorization })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body.cryptoCoins).toEqual([]);
      }));

  it("Should fail due to user trying to see another user's coins", () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        request(app)
          .get('/users/2/crypto-coins')
          .set({ authorization: session.headers.authorization })
      )
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', expect.any(Array));
      }));
});
