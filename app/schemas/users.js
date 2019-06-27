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
    matches: { options: /^(COP|USD|EUR)$/ },
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
