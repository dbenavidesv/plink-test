'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      // eslint-disable-next-line new-cap
      preferredCurrency: { type: DataTypes.ENUM(['COP', 'USD', 'EUR']), allowNull: false }
    },
    {
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
