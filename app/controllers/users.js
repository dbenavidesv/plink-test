const logger = require('../logger');
const usersService = require('../services/users');

exports.userSignUp = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User registration.`);
  const user = req.body;
  return usersService
    .registerUser(user)
    .then(result => res.status(201).send(result))
    .catch(next);
};
