const request = require('request-promise');

const braveNewCoinApiConfig = require('../../config').common.braveNewCoinApi;
const errors = require('../errors');
const logger = require('../logger');
const { CryptoCoin } = require('../models');

exports.getCoin = queryParams => {
  const options = {
    method: 'GET',
    uri: `${braveNewCoinApiConfig.endpoint}/${braveNewCoinApiConfig.routes.ticker}`,
    headers: {
      [braveNewCoinApiConfig.hostHeaderName]: braveNewCoinApiConfig.host,
      [braveNewCoinApiConfig.keyHeaderName]: braveNewCoinApiConfig.key
    },
    qs: queryParams,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri} Query params:`, options.qs);
  return request(options).catch(error =>
    Promise.reject(errors.crytpoCoinApiError(`${error.name}: ${error.message}`))
  );
};

exports.addCoin = coin =>
  CryptoCoin.create(coin)
    .then(result => result.get({ plain: true }))
    .catch(error =>
      error.name === 'SequelizeUniqueConstraintError'
        ? Promise.reject(errors.uniqueUserCoinError('User has already addded this coin.'))
        : Promise.reject(errors.databaseError(`${error.name}: ${error.message}`))
    );
