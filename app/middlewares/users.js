const usersService = require('../services/users');
const logger = require('../logger');

exports.getUserInfo = (req, res, next) => {
  logger.info('Adding user information to the session');
  const { id, username } = req.session;
  return usersService
    .findUserBy({ id, username })
    .then(result => {
      req.session.firstName = result.firstName;
      req.session.lastName = result.lastName;
      req.session.preferredCurrency = result.preferredCurrency;
      return next();
    })
    .catch(next);
};
