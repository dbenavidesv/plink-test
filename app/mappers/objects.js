exports.keysToCamelCase = snakeSpineJson => {
  const camelJson = {};
  const toCamelCase = key =>
    key
      .replace(/[-_][a-z]/gi, idx => idx.toUpperCase())
      .replace('_', '')
      .replace('-', '');

  Object.keys(snakeSpineJson).forEach(key => {
    camelJson[toCamelCase(key)] = snakeSpineJson[key];
  });
  return camelJson;
};

exports.mapCoinObject = (coin, userId) => ({
  id: coin.coin_id,
  coinName: coin.coin_name,
  source: coin.source,
  userId
});

exports.mapCoinsArray = coins =>
  coins.map(coin => ({
    id: coin.coin_id,
    coinName: coin.coin_name,
    price: parseFloat(coin.last_price),
    source: coin.source
  }));
