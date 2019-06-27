'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptoCoin = sequelize.define(
    'CryptoCoin',
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      coinName: { type: DataTypes.STRING, field: 'coin_name', allowNull: false },
      source: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.STRING, allowNull: false },
      preferredCurrency: {
        // eslint-disable-next-line new-cap
        type: DataTypes.ENUM(['COP', 'USD', 'EUR']),
        field: 'preferred_currency',
        allowNull: false
      }
    },
    {
      tableName: 'crypto_coins',
      underscored: true
    }
  );

  CryptoCoin.associate = models => {
    CryptoCoin.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return CryptoCoin;
};
