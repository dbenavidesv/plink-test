const { healthCheck } = require('./controllers/health-check');

exports.init = app => {
  app.get('/health', healthCheck);
};
