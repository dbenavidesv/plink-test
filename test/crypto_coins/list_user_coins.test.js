const request = require('supertest');

const userHelpers = require('../utils/helpers/users');
const coinHelpers = require('../utils/helpers/crypto_coins');
const app = require('../../app');
// const errors = require('../../app/errors');

describe('GET /users/:id/crypto-coins', () => {
  it.only('Should succesfully fetch the list of coins the user has added', () =>
    userHelpers
      .createUserAndLogIn()
      .then(session =>
        coinHelpers.addMultipleCoins().then(() =>
          request(app)
            .get('/users/1/crypto-coins')
            .set({ authorization: session.headers.authorization })
        )
      )
      .then(response => {
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('cryptoCoins', expect.any(Array));
      }));
});
