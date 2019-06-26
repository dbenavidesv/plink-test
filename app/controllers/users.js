const logger = require('../logger');
const usersService = require('../services/users');

exports.userSignUp = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User registration.`);
  const user = req.body;
  return usersService
    .registerUser(user)
    .then(cretedUser => {
      logger.info(`User inserted with id: ${cretedUser.id}`);
      return res
        .status(201)
        .send({ message: `User ${cretedUser.username} registered with id: ${cretedUser.id}` });
    })
    .catch(next);
};
