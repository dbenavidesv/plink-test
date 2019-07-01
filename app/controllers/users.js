const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const usersService = require('../services/users');

exports.signUp = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User registration.`);
  const user = req.body;
  return sessionsHelpers
    .encodePassword(user.password)
    .then(hashedPassword => usersService.registerUser({ ...user, password: hashedPassword }))
    .then(createdUser => {
      logger.info(`User inserted with id: ${createdUser.id}`);
      return res
        .status(201)
        .send({ message: `User ${createdUser.username} registered with id: ${createdUser.id}` });
    })
    .catch(next);
};
