exports.coinApiTickerResponse = {
  success: true,
  source: 'BraveNewCoin',
  time_stamp: '1562008561',
  utc_date: '2019-07-01 19:16:01',
  coin_id: 'BTC',
  coin_name: 'Bitcoin',
  last_price: '10147.70215039',
  price_24hr_pcnt: '-9.17',
  volume_24hr: '10054189057',
  vol_24hr_pcnt: '23.31',
  currency: 'USD',
  currency_name: 'United States Dollar'
};

exports.coinApiTickerNotFound = {
  success: false,
  error: 'The coin specified is not available'
};

exports.coinBTC = {
  id: 'BTC',
  coinName: 'BitCoin',
  source: 'BraveNewCoin',
  price: '9884.69312003'
};

exports.coinLTC = {
  id: 'LTC',
  coinName: 'Litecoin',
  source: 'BraveNewCoin',
  price: '120.45536806'
};

exports.coinETH = {
  id: 'ETH',
  coinName: 'Ethereum',
  source: 'BraveNewCoin',
  price: '288.94060383'
};

exports.coinZEC = {
  id: 'ZEC',
  coinName: 'Zcash',
  source: 'BraveNewCoin',
  price: '103.07104273'
};

exports.coinXRP = {
  id: 'XRP',
  coinName: 'Zcash',
  source: 'BraveNewCoin',
  price: '0.40085439'
};

exports.coinsArray = [this.coinBTC, this.coinETH, this.coinLTC, this.coinXRP, this.coinZEC];
