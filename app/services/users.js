const errors = require('../errors');
const { User } = require('../models');

exports.registerUser = user =>
  User.create(user)
    .then(result => result.get({ plain: true }))
    .catch(error =>
      error.name === 'SequelizeUniqueConstraintError'
        ? Promise.reject(errors.uniqueUsernameError('The username provided is already taken.'))
        : Promise.reject(errors.databaseError(`${error.name}: ${error.message}`))
    );
