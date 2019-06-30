const errors = require('../errors');
const logger = require('../logger');
const objectMapper = require('../mappers/objects');
const cryptoCoinsService = require('../services/crypto_coins');
const userService = require('../services/users');

exports.addCryptoCoin = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Add crypto coin.`);
  const user = req.session;
  const coinId = req.params.id;
  return userService
    .getPreferredCurrency(user.id)
    .then(({ preferredCurrency }) => cryptoCoinsService.getCoin({ coin: coinId, show: preferredCurrency }))
    .then(coin => {
      if (coin.success) {
        return cryptoCoinsService
          .addCoin(objectMapper.mapCoinObject(coin, user.id))
          .then(addedCoin =>
            res
              .status(201)
              .send({ message: `Added coin ${addedCoin.id} to user with id ${addedCoin.userId}` })
          );
      }
      return Promise.reject(errors.itemNotFoundError(coin.error));
    })
    .catch(next);
};
