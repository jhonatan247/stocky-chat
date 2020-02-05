'use strict';
const MessageDefnition = require('../table_definitions').MessageDefnition;

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    MessageDefnition.build(DataTypes),
    {}
  );
  Message.associate = function(models) {
    Message.belongsTo(models.AccountPublic, {
      foreignKey: 'owner',
      as: 'account'
    });
    // associations can be defined here
  };
  return Message;
};
