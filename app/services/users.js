const errors = require('../errors');
const { User } = require('../models');

exports.registerUser = user =>
  User.create(user).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );
