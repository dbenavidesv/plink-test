const errors = require('../errors');
const { User } = require('../models');

exports.registerUser = user =>
  User.create(user)
    .then(result => result.get({ plain: true }))
    .catch(error =>
      error.name === 'SequelizeUniqueConstraintError'
        ? Promise.reject(errors.uniqueUsernameError('The provided username is already taken.'))
        : Promise.reject(errors.databaseError(`${error.name}: ${error.message}`))
    );

exports.findUserBy = params =>
  User.findOne({ where: params, raw: true }).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.message}`))
  );

exports.getPreferredCurrency = id =>
  User.findOne({ where: { id }, attributes: ['preferredCurrency'], raw: true }).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.message}`))
  );
