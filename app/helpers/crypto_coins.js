exports.sortByPrice = (coins, order) =>
  coins.sort((prev, next) => (order === 'ASC' ? prev.price - next.price : next.price - prev.price));

exports.getSortedTopCoins = (coins, top, order) => {
  const sortedCoins = this.sortByPrice(coins, order);
  return order === 'ASC' ? sortedCoins.slice(sortedCoins.length - top) : sortedCoins.slice(0, top);
};
