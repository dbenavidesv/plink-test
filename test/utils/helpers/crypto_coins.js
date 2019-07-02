const { CryptoCoin } = require('../../../app/models');
const coinObjects = require('../objects/crypto_coins');

exports.addMultipleCoins = (userId = 1) => {
  const coins = coinObjects.coinsArray.map(coin => ({ ...coin, userId }));
  return CryptoCoin.bulkCreate(coins);
};
