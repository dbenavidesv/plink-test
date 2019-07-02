const errors = require('../errors');
const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const usersService = require('../services/users');

exports.logIn = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User authentication.`);
  const inUser = req.body;
  return usersService
    .findUserBy({ username: inUser.username })
    .then(user => {
      if (user) {
        return sessionsHelpers
          .comparePassword(inUser.password, user.password)
          .then(isPassword => (isPassword ? sessionsHelpers.generateToken(user) : null));
      }
      throw errors.badLogInError('The username or password provided is incorrect');
    })
    .then(token => {
      if (token) {
        return res
          .status(200)
          .set({ authorization: token })
          .send({
            message: `User ${inUser.username} authenticated`,
            expirationTime: `${sessionsHelpers.getExpirationTime(token)}`
          });
      }
      throw errors.badLogInError('The username or password provided is incorrect');
    })
    .catch(next);
};
