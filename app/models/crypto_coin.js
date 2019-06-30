'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptoCoin = sequelize.define(
    'CryptoCoin',
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      coinName: { type: DataTypes.STRING, field: 'coin_name', allowNull: false },
      source: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, primaryKey: true }
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
