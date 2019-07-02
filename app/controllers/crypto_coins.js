const errors = require('../errors');
const logger = require('../logger');
const cryptoCoinsHelpers = require('../helpers/crypto_coins');
const objectMapper = require('../mappers/objects');
const cryptoCoinsService = require('../services/crypto_coins');

exports.addCryptoCoin = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Add crypto coin.`);
  const user = req.session;
  const coinId = req.params.id;
  return cryptoCoinsService
    .getCoin({ coin: coinId })
    .then(coin =>
      coin.success
        ? cryptoCoinsService.addCoin(objectMapper.mapCoinObject(coin, user.id))
        : Promise.reject(errors.itemNotFoundError(coin.error))
    )
    .then(addedCoin =>
      res.status(201).send({ message: `Added coin ${addedCoin.id} to user with id ${addedCoin.userId}` })
    )
    .catch(next);
};

exports.geUserCoinsList = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Get user crypto coins list.`);
  const userId = req.params.id;
  const { preferredCurrency } = req.session;
  return cryptoCoinsService
    .getUserCoins(userId)
    .then(coins => {
      if (coins.length === 0) {
        return res.status(200).send({ message: 'User has not added any crypto coins yet' });
      }
      return cryptoCoinsService.getCoinsTicker(coins, preferredCurrency).then(coinsTikcer =>
        res.status(200).send({
          message: 'User crypto coins list obtained',
          cryptoCoins: objectMapper.mapCoinsArray(coinsTikcer)
        })
      );
    })
    .catch(next);
};

exports.getTopUserCoins = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Get user top crypto coins.`);
  const { userId, order, top } = req.query;
  const { preferredCurrency } = req.session;
  return cryptoCoinsService
    .getUserCoins(userId)
    .then(coins => {
      if (coins.length === 0) {
        return res.status(200).send({ message: 'User has not added any crypto coins yet' });
      }
      return cryptoCoinsService.getCoinsTicker(coins, preferredCurrency).then(coinsTikcer => {
        const topCoins = cryptoCoinsHelpers.getSortedTopCoins(
          objectMapper.mapCoinsArray(coinsTikcer),
          top,
          order
        );
        return res.status(200).send({
          message: `User top ${top} crypto coins list obtained`,
          cryptoCoins: topCoins
        });
      });
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
