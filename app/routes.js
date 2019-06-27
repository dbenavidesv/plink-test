const { healthCheck } = require('./controllers/health_check');
const users = require('./controllers/users');
const sessions = require('./controllers/sessions');
const squemaValidator = require('./middlewares/schema_validator');
const mappers = require('./middlewares/mappers');
const usersSchemas = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post(
    '/users',
    [mappers.bodyToCamelCase, squemaValidator.validateSchemaAndFail(usersSchemas.signUp)],
    users.signUp
  );

  app.post('/sessions', [squemaValidator.validateSchemaAndFail(usersSchemas.logIn)], sessions.logIn);
};
