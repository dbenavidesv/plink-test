exports.sortByPrice = (coins, order) => {
  const coinsFloat = coins.map(coin => ({
    ...coin,
    price: parseFloat(coin.price)
  }));
  return coinsFloat.sort((a, b) => {
    let left = a;
    let right = b;
    if (order === 'ASC') {
      left = b;
      right = a;
    }
    if (left.price > right.price) {
      return -1;
    }
    if (left.price < right.price) {
      return 1;
    }
    return 0;
  });
};

exports.getSortedTopCoins = (coins, top, order) => {
  const sortedCoins = this.sortByPrice(coins, order);
  return order === 'ASC' ? sortedCoins.slice(sortedCoins.length - top) : sortedCoins.slice(0, top);
};
