const logger = require('../logger');
const sessionsHelpers = require('../helpers/sessions');
const cryptoCoinsHelpers = require('../helpers/crypto_coins');
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
    .then(coins =>
      coins.length === 0
        ? res.status(200).send({ message: 'User has not added any crypto coins yet' })
        : res.status(200).send({ message: 'User crypto coins list obtained', cryptoCoins: coins })
    )
    .catch(next);
};

exports.getUserTopCoins = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Get user top crypto coins.`);
  const { userId, order, top } = req.query;
  logger.info(userId, order, top);
  return cryptoCoinsService
    .getUserCoins(userId)
    .then(coins => {
      if (coins.length === 0) {
        return res.status(200).send({ message: 'User has not added any crypto coins yet' });
      }
      const topCoins = cryptoCoinsHelpers.getSortedTopCoins(coins, top, order);
      return res
        .status(200)
        .send({ message: `User top ${top} crypto coins list obtained`, cryptoCoins: topCoins });
    })
    .catch(next);
};
