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
        return res.status(200).send({ message: 'User has not added any crypto coins yet', cryptoCoins: [] });
      }
      return cryptoCoinsService.getCoinsTicker(coins, preferredCurrency).then(coinsTicker =>
        res.status(200).send({
          message: 'User crypto coins list obtained',
          cryptoCoins: objectMapper.mapCoinsArray(coinsTicker)
        })
      );
    })
    .catch(next);
};

exports.getUserTopCoins = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Get user top crypto coins.`);
  const { userId, order, top } = req.query;
  const { preferredCurrency } = req.session;
  return cryptoCoinsService
    .getUserCoins(userId)
    .then(coins => {
      if (coins.length === 0) {
        return res.status(200).send({ message: 'User has not added any crypto coins yet', cryptoCoins: [] });
      }
      return cryptoCoinsService.getCoinsTicker(coins, preferredCurrency).then(coinsTicker => {
        const topCoins = cryptoCoinsHelpers.getSortedTopCoins(
          objectMapper.mapCoinsArray(coinsTicker),
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
