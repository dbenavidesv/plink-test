const { healthCheck } = require('./controllers/health_check');
const users = require('./controllers/users');
const squemaValidator = require('./middlewares/schema_validator');
const usersSchemas = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [squemaValidator.validateSchemaAndFail(usersSchemas.signUp)], users.userSignUp);
};
