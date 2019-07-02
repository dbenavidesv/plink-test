const nock = require('nock');

const configCoinApi = require('../../../config').common.braveNewCoinApi;
const coinObjects = require('../objects/crypto_coins');

exports.mockGetCoinOK = (params, responseCoin = coinObjects.coinApiTickerBTC) => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query(params)
    .reply(200, responseCoin);
};

exports.mockGetCoinNotFound = () => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query({ coin: 'ABDCEFG' })
    .reply(200, coinObjects.coinApiTickerNotFound);
};

exports.mockGetCoinFailure = () => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query({ coin: 'BTC', show: 'USD' })
    .replyWithError('Connection refused, request time out');
};

exports.mulipleMockGetCoinOK = () => {
  this.mockGetCoinOK({ coin: 'BTC', show: 'USD' }, coinObjects.coinApiTickerBTC);
  this.mockGetCoinOK({ coin: 'LTC', show: 'USD' }, coinObjects.coinApiTickerLTC);
  this.mockGetCoinOK({ coin: 'ETH', show: 'USD' }, coinObjects.coinApiTickerETH);
  this.mockGetCoinOK({ coin: 'ZEC', show: 'USD' }, coinObjects.coinApiTickerZEC);
  this.mockGetCoinOK({ coin: 'XRP', show: 'USD' }, coinObjects.coinApiTickerXRP);
};
