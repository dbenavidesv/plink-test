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

exports.getTopUserCoins = {
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
