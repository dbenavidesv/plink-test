const { healthCheck } = require('./controllers/health_check');
const users = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', users.userSignUp);
};
