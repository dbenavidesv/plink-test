const logger = require('../logger');
const cryptoCoinsService = require('../services/crypto_coins');

exports.addCryptoCoin = (req, res, next) => {
  logger.info(`${req.method} ${req.path} start... Buy crypto coins.`);
  return cryptoCoinsService
    .addCoin()
    .then(result => {
      logger.info(result);
      return res.status(200).send({ message: 'szs' });
    })
    .catch(next);
};
