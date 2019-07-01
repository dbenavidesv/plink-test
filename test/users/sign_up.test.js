const request = require('supertest');

const utils = require('../utils');
const app = require('../../app');
const errors = require('../../app/errors');
const { User } = require('../../app/models');

describe('POST /users', () => {
  it('Should successfully register a new user', () =>
    request(app)
      .post('/users')
      .send(utils.testUser)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', expect.any(String));
      }));

  it('Should fail to register user due to wrong input fields', () =>
    request(app)
      .post('/users')
      .send(utils.wrongTestUser)
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', expect.any(Array));
        expect(response.body).toHaveProperty('internal_code', errors.INVALID_INPUT_ERROR);
      }));

  it('Should fail to register user due to username in use', () =>
    request(app)
      .post('/users')
      .send(utils.testUser)
      .then(() =>
        request(app)
          .post('/users')
          .send(utils.testUser)
      )
      .then(response => {
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.UNIQUE_USERNAME_ERROR);
      }));

  it('Should fail to register user due to a failure with the database', () => {
    const createMock = jest.spyOn(User, 'create');
    createMock.mockImplementation(() =>
      Promise.reject(new Error('PostgreSQL could not connect to server: Connection refused'))
    );
    return request(app)
      .post('/users')
      .send(utils.testUser)
      .then(response => {
        expect(response.statusCode).toBe(503);
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('internal_code', errors.DATABASE_ERROR);
      });
  });
});
