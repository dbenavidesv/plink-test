const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.INVALID_INPUT_ERROR = 'invalid_input_error';
exports.schemaError = message => internalError(message, exports.INVALID_INPUT_ERROR);

exports.UNIQUE_USERNAME_ERROR = 'unique_username_error';
exports.uniqueUsernameError = message => internalError(message, exports.UNIQUE_USERNAME_ERROR);

exports.BAD_LOGIN_ERROR = 'bad_login_error';
exports.badLogInError = message => internalError(message, exports.BAD_LOGIN_ERROR);

exports.SESSION_ERROR = 'session_error';
exports.sessionError = message => internalError(message, exports.SESSION_ERROR);

exports.CRYPTO_COIN_API_ERROR = 'crypto_coin_api_error';
exports.crytpoCoinApiError = message => internalError(message, exports.CRYPTO_COIN_API_ERROR);

exports.ITEM_NOT_FOUND_ERROR = 'item_not_found_error';
exports.itemNotFoundError = message => internalError(message, exports.ITEM_NOT_FOUND_ERROR);

exports.UNIQUE_USER_COIN_ERROR = 'unique_user_coin_error';
exports.uniqueUserCoinError = message => internalError(message, exports.UNIQUE_USER_COIN_ERROR);
