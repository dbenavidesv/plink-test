const { healthCheck } = require('./controllers/health_check');
const cryptoCoins = require('./controllers/crypto_coins');
const users = require('./controllers/users');
const sessions = require('./controllers/sessions');
const mappersMiddleware = require('./middlewares/mappers');
const squemaValidator = require('./middlewares/schema_validator');
const sessionsMiddleware = require('./middlewares/sessions');
const usersSchemas = require('./schemas/users');

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
      squemaValidator.validateSchemaAndFail(usersSchemas.getUserCoinsList)
    ],
    users.geUserCoinsList
  );

  app.post('/sessions', [squemaValidator.validateSchemaAndFail(usersSchemas.logIn)], sessions.logIn);

  app.post('/crypto-coins/:id', [sessionsMiddleware.isUserAuthenticated], cryptoCoins.addCryptoCoin);
};
