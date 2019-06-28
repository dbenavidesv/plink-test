const errors = require('../errors');
const { CryptoCoin } = require('../models');

exports.addCoin = coin =>
  CryptoCoin.create(coin)
    .then(result => result.get({ plain: true }))
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.message}`)));
