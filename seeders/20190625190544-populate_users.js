'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        username: 'plink_admin',
        password: 'plink_admin',
        first_name: 'Plink',
        last_name: 'Admon',
        preferred_currency: 'USD',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('users')
};
