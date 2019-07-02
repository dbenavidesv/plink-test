const { healthCheck } = require('./controllers/health_check');
const cryptoCoins = require('./controllers/crypto_coins');
const users = require('./controllers/users');
const sessions = require('./controllers/sessions');
const mappersMiddleware = require('./middlewares/mappers');
const squemaValidator = require('./middlewares/schema_validator');
const sessionsMiddleware = require('./middlewares/sessions');
const usersMiddleware = require('./middlewares/users');
const usersSchemas = require('./schemas/users');
const cryptoCoinsSchemas = require('./schemas/crypto_coins');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post(
    '/users',
    [mappersMiddleware.bodyToCamelCase, squemaValidator.validateSchemaAndFail(usersSchemas.signUp)],
    users.signUp
  );
  app.get(
    '/users/:id/crypto-coins',
    [
      sessionsMiddleware.isUserAuthenticated,
      squemaValidator.validateSchemaAndFail(cryptoCoinsSchemas.getUserCoinsList),
      usersMiddleware.getUserInfo
    ],
    cryptoCoins.geUserCoinsList
  );

  app.get(
    '/users/:id?/top-crypto-coins',
    [
      sessionsMiddleware.isUserAuthenticated,
      squemaValidator.validateSchemaAndFail(cryptoCoinsSchemas.getUserTopCoins),
      usersMiddleware.getUserInfo
    ],
    cryptoCoins.getUserTopCoins
  );

  app.post('/sessions', [squemaValidator.validateSchemaAndFail(usersSchemas.logIn)], sessions.logIn);

  app.post('/crypto-coins/:id', [sessionsMiddleware.isUserAuthenticated], cryptoCoins.addCryptoCoin);
};
