'use strict';
const AccountPublicDefnition = require('../table_definitions')
  .AccountPublicDefnition;

module.exports = (sequelize, DataTypes) => {
  const AccountPublic = sequelize.define(
    'AccountPublic',
    AccountPublicDefnition.build(DataTypes),
    { tableName: 'Accounts' }
  );
  AccountPublic.associate = function(models) {
    // associations can be defined here
  };
  return AccountPublic;
};
