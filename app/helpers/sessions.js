const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken-promisified');

const config = require('../../config').common.session;

exports.encodePassword = password => bcrypt.hash(password, 10);

exports.comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

exports.generateToken = user => {
  const payload = {
    id: user.id,
    username: user.username
  };
  return jwt.signAsync(payload, config.secret, { expiresIn: config.expirationTime });
};

exports.validateToken = token => jwt.verifyAsync(token, config.secret);

exports.decodeToken = token => jwt.decode(token);

exports.getExpirationTime = token => {
  const expiresAt = this.decodeToken(token).exp;
  return new Date(expiresAt * 1000).toString();
};
