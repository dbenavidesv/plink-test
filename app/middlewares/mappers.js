const objectMapper = require('../mappers/objects');

exports.bodyToCamelCase = (req, res, next) => {
  req.body = objectMapper.keysToCamelCase(req.body);
  return next();
};
