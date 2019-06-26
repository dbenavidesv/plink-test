const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const usersService = require('../services/users');

exports.userSignUp = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... User registration.`);
  const user = req.body;
  logger.info(user);
  return sessionsHelpers
    .encodePassword(user.password)
    .then(hashedPassword => usersService.registerUser({ ...user, password: hashedPassword }))
    .then(cretedUser => {
      logger.info(`User inserted with id: ${cretedUser.id}`);
      return res
        .status(201)
        .send({ message: `User ${cretedUser.username} registered with id: ${cretedUser.id}` });
    })
    .catch(next);
};
