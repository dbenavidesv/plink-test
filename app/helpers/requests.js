exports.keysToCamelCase = snakeSpineJson => {
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
