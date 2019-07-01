const request = require('supertest');

const userObjects = require('../utils/objects/users');
const userHelpers = require('../utils/helpers/users');
const app = require('../../app');
const errors = require('../../app/errors');

describe('POST /sessions', () => {
  it('Should successfully login the user', () =>
    userHelpers
      .registerUser()
      .then(() =>
        request(app)
          .post('/sessions')
          .send(userObjects.testUserCredentials)
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.headers).toHaveProperty('authorization', expect.any(String));
      }));

  it('Should fail to login the user due to wrong credentials', () =>
    userHelpers
      .registerUser()
      .then(() =>
        request(app)
          .post('/sessions')
          .send(userObjects.testUserWrongCredentials)
      )
      .then(response => {
        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.BAD_LOGIN_ERROR);
      }));

  it('Should fail to login the user due to invalid credentials', () =>
    userHelpers
      .registerUser()
      .then(() =>
        request(app)
          .post('/sessions')
          .send(userObjects.testUserInvalidCredentials)
      )
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', expect.any(Array));
        expect(response.body).toHaveProperty('internal_code', errors.INVALID_INPUT_ERROR);
      }));
});
