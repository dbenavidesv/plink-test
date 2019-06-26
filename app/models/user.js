'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      firstName: { type: DataTypes.STRING, field: 'first_name', allowNull: false },
      lastName: { type: DataTypes.STRING, field: 'last_name', allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      preferredCurrency: {
        // eslint-disable-next-line new-cap
        type: DataTypes.ENUM(['COP', 'USD', 'EUR']),
        field: 'preferred_currency',
        defaultValue: 'USD',
        allowNull: false
      }
    },
    {
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
