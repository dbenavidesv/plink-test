const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const usersService = require('../services/users');
const cryptoCoinsService = require('../services/crypto_coins');

exports.signUp = (req, res, next) => {
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

exports.geUserCoinsList = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Get user crypto coins list.`);
  const userId = req.params.id;
  return cryptoCoinsService
    .getUserCoins(userId)
    .then(result =>
      result.length === 0
        ? res.status(200).send({ message: 'User has not added any crypto coins yet' })
        : res.status(200).send({ message: 'User crypto coins list obtained', cryptoCoins: result })
    )
    .catch(next);
};
