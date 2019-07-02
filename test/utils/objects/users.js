exports.testUser = {
  username: 'test_user',
  password: 'wolox1234',
  first_name: 'Test',
  last_name: 'User',
  preferred_currency: 'USD'
};

exports.wrongTestUser = {
  username: 'wrong',
  password: 'wolox',
  first_name: 'Test',
  last_name: 'User',
  preferred_currency: '  '
};

exports.testUserHashed = {
  username: 'test_user',
  password: '$2b$10$5GilT7rkimQd9xO4E.P8TOtKLduqjk2I2YK4aBZloz1Tk6IWeqO1u',
  firstName: 'Test',
  lastName: 'User',
  preferredCurrency: 'USD'
};

exports.testUserCredentials = {
  username: 'test_user',
  password: 'wolox1234'
};

exports.testUserWrongCredentials = {
  username: 'test_usxr',
  password: 'wolox4321'
};

exports.testUserInvalidCredentials = {
  username: 'test??usxr',
  password: '   '
};
