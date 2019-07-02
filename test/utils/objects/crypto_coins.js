exports.coinApiTickerBTC = {
  success: true,
  source: 'BraveNewCoin',
  coin_id: 'BTC',
  coin_name: 'Bitcoin',
  last_price: '10147.70215039'
};

exports.coinApiTickerLTC = {
  success: true,
  source: 'BraveNewCoin',
  coin_id: 'LTC',
  coin_name: 'Litecoin',
  last_price: '118.89371009'
};

exports.coinApiTickerETH = {
  success: true,
  source: 'BraveNewCoin',
  coin_id: 'ETH',
  coin_name: 'Ethereum',
  last_price: '286.64463867'
};
exports.coinApiTickerZEC = {
  success: true,
  source: 'BraveNewCoin',
  coin_id: 'ZEC',
  coin_name: 'Zcash',
  last_price: '100.57648012'
};

exports.coinApiTickerXRP = {
  success: true,
  source: 'BraveNewCoin',
  coin_id: 'XRP',
  coin_name: 'Ripple',
  last_price: '0.40163527'
};

exports.coinApiTickerNotFound = {
  success: false,
  error: 'The coin specified is not available'
};

exports.coinMapper = coin => ({
  id: coin.coin_id,
  coinName: coin.coin_name,
  source: coin.source
});

exports.coinBTC = this.coinMapper(this.coinApiTickerBTC);
exports.coinLTC = this.coinMapper(this.coinApiTickerLTC);
exports.coinETH = this.coinMapper(this.coinApiTickerETH);
exports.coinZEC = this.coinMapper(this.coinApiTickerZEC);
exports.coinXRP = this.coinMapper(this.coinApiTickerXRP);

exports.coinsArray = [this.coinBTC, this.coinLTC, this.coinETH, this.coinZEC, this.coinXRP];
