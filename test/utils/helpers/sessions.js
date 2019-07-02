const jwt = require('jsonwebtoken');

const config = require('../../../config').common.session;

exports.invalidToken = 'eyJ0eXAiOiJKV1QiLCJh.eyJpZCI6NiIjoxNTYxOTQ0O9.YSk9VhMcwWWXanh2SGYPH';

exports.forceTokenToExpire = token => {
  const payload = jwt.decode(token);
  payload.exp = payload.iat;
  const expiredToken = jwt.sign(payload, config.secret, { expiresAt: 0 });
  return expiredToken;
};
