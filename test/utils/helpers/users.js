const request = require('supertest');

const userObjects = require('../objects/users');
const app = require('../../../app');
const { User } = require('../../../app/models');

exports.registerUser = (newUser = userObjects.testUserHashed) => User.create(newUser);

exports.createUserAndLogIn = (
  newUser = userObjects.testUserHashed,
  userCredentials = userObjects.testUserCredentials
) =>
  User.create(newUser).then(() =>
    request(app)
      .post('/sessions')
      .send(userCredentials)
  );
