const errors = require('../errors');
const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const usersService = require('../services/users');

exports.logIn = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User authentication.`);
  const inUser = req.body;
  let user = {};
  return usersService
    .findUserBy({ username: inUser.username })
    .then(result => {
      if (result) {
        user = result;
        return sessionsHelpers.comparePassword(inUser.password, user.password);
      }
      return Promise.reject(errors.badLogInError('The email or password provided is incorrect'));
    })
    .then(isPassword =>
      isPassword
        ? sessionsHelpers.generateToken(user)
        : Promise.reject(errors.badLogInError('The email or password provided is incorrect'))
    )
    .then(token =>
      res
        .status(200)
        .set({ authorization: token })
        .send({
          message: `User authenticated. Session expires at ${sessionsHelpers.getExpirationTime(token)}`
        })
    )
    .catch(next);
};
