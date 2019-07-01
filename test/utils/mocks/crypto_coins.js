const nock = require('nock');

const configCoinApi = require('../../../config').common.braveNewCoinApi;
const coinObjects = require('../objects/crypto_coins');

exports.mockCoinApiOK = () => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query({ coin: 'BTC', show: 'USD' })
    .reply(200, coinObjects.coinApiTickerResponse);
};

exports.mockCoinApiItemNotFound = () => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query({ coin: 'ABDCEFG', show: 'USD' })
    .reply(200, coinObjects.coinApiTickerNotFound);
};

exports.mockCoinApiFailure = () => {
  nock(configCoinApi.endpoint)
    .get(`/${configCoinApi.routes.ticker}`)
    .query({ coin: 'BTC', show: 'USD' })
    .replyWithError('Connection refused, request time out');
};
