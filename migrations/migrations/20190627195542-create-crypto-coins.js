'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('crypto_coins', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      coin_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
  down: queryInterface => queryInterface.dropTable('crypto_coins')
};
