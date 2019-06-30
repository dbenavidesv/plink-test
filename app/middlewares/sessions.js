const sessionConfig = require('../../config').common.session;
const errors = require('../errors');
const sessionsHelpers = require('../helpers/sessions');

exports.isUserAuthenticated = (req, res, next) => {
  const token = req.headers[sessionConfig.headerName];
  if (token) {
    return sessionsHelpers
      .validateToken(token, sessionConfig.secret)
      .then(decodedToken => {
        req.session = decodedToken;
        return next();
      })
      .catch(error => next(errors.sessionError(`Session error: ${error.message}`)));
  }
  return next(errors.sessionError('Session error: no token provided'));
};
