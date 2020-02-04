'use strict';
const MessageDefnition = require('../table_definitions').MessageDefnition;

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    MessageDefnition.build(DataTypes),
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
