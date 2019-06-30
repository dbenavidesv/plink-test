const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === undefined) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
  }
  return target;
};

const config = {
  common: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    session: {
      headerName: 'authorization',
      expirationTime: process.env.JWT_EXPIRATION_TIME,
      secret: process.env.NODE_API_SESSION_SECRET,
      saltRounds: process.env.ENCRYPTION_SALT_ROUNDS
    },
    braveNewCoinApi: {
      endpoint: process.env.BNC_API_ENDPOINT,
      routes: {
        ticker: process.env.BNC_API_TICKER_ROUTE
      },
      hostHeaderName: process.env.BNC_HOST_HEADER_NAME,
      keyHeaderName: process.env.BCN_KEY_HEADER_NAME,
      host: process.env.BCN_HOST,
      key: process.env.BCN_KEY
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
