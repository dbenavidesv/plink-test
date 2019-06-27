const requestsHelpers = require('../helpers/requests');

exports.bodyToCamelCase = (req, res, next) => {
  req.body = requestsHelpers.keysToCamelCase(req.body);
  return next();
};
