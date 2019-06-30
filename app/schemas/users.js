exports.signUp = {
  username: {
    in: ['body'],
    isLength: { options: { min: 8, max: 30 } },
    matches: { options: /^[a-z0-9_-]+$/i },
    trim: true,
    errorMessage: 'Invalid username, please enter one with 8 or more characters.'
  },
  password: {
    in: ['body'],
    isLength: { options: { min: 6, max: 30 } },
    isAlphanumeric: true,
    trim: true,
    errorMessage: 'Invalid password, please enter one with 6 or more characters.'
  },
  firstName: {
    in: ['body'],
    isLength: { options: { min: 2 } },
    matches: { options: /^[a-z' ]+$/i },
    trim: true,
    errorMessage: 'Invalid first name.'
  },
  lastName: {
    in: ['body'],
    isLength: { options: { min: 2 } },
    matches: { options: /^[a-z' ]+$/i },
    trim: true,
    errorMessage: 'Invalid last name.'
  },
  preferredCurrency: {
    in: ['body'],
    matches: { options: /^(COP|USD|EUR)$/i },
    errorMessage: 'Invalid currency. Please enter one of the following: COP, USD, EUR.'
  }
};

exports.logIn = {
  username: {
    in: ['body'],
    exists: true,
    matches: { options: /^[a-z0-9_-]+$/i },
    trim: true,
    errorMessage: 'Please enter a valid username.'
  },
  password: {
    in: ['body'],
    exists: true,
    isAlphanumeric: true,
    trim: true,
    errorMessage: 'Please enter a valid password'
  }
};

exports.getUserCoinsList = {
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    custom: {
      options: (value, { req }) => value === req.session.id,
      errorMessage: 'Auhtenticated user can only list their own coins'
    },
    errorMessage: 'Please enter a valid numeric id'
  }
};

exports.getUserTopCoins = {
  id: {
    in: ['params'],
    optional: true,
    isInt: true,
    toInt: true,
    custom: {
      options: (value, { req }) => {
        if (value) {
          return value === req.session.id;
        }
        return true;
      },
      errorMessage: 'Auhtenticated user can only list their own coins'
    },
    customSanitizer: { options: (_, { req }) => req.session.id },
    errorMessage: 'Please enter a valid numeric id'
  },
  userId: {
    in: ['query'],
    optional: true,
    isInt: true,
    toInt: true,
    custom: {
      options: (value, { req }) => {
        if (value) {
          return value === req.session.id;
        }
        return true;
      },
      errorMessage: 'Auhtenticated user can only list their own coins'
    },
    customSanitizer: { options: (_, { req }) => req.session.id },
    errorMessage: 'Please enter a valid numeric id'
  },
  order: {
    in: ['query'],
    optional: true,
    matches: { options: /^(DESC|ASC)$/i },
    customSanitizer: { options: value => (value ? value.toUpperCase() : 'DESC') },
    errorMessage: 'Please enter either DESC or ASC'
  },
  top: {
    in: ['query'],
    optional: true,
    isInt: true,
    toInt: true,
    customSanitizer: { options: value => (value ? value : 3) },
    errorMessage: 'Please enter a valid numeric top value'
  }
};
