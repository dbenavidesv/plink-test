const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.UNIQUE_USERNAME_ERROR]: 409,
  [errors.BAD_LOGIN_ERROR]: 403,
  [errors.SESSION_ERROR]: 440,
  [errors.ITEM_NOT_FOUND_ERROR]: 404,
  [errors.CRYPTO_COIN_API_ERROR]: 503,
  [errors.UNIQUE_USER_COIN_ERROR]: 409
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
