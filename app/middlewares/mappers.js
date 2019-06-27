const keysToCamelCase = snakeSpineJson => {
  const camelJson = {};
  const toCamelCase = key =>
    key
      .replace(/[-_][a-z]/gi, idx => idx.toUpperCase())
      .replace('_', '')
      .replace('-', '');
  Object.keys(snakeSpineJson).forEach(key => {
    camelJson[toCamelCase(key)] = snakeSpineJson[key];
  });
  return camelJson;
};

exports.bodyToCamelCase = (req, res, next) => {
  req.body = keysToCamelCase(req.body);
  return next();
};
