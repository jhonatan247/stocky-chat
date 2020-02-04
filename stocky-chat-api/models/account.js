'use strict';
const AccountDefnition = require('../table_definitions').AccountDefnition;

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    AccountDefnition.build(DataTypes),
    {}
  );
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};
