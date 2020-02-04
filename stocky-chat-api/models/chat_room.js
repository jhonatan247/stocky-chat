'use strict';
const ChatRoomDefnition = require('../table_definitions').ChatRoomDefnition;

module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    'ChatRoom',
    ChatRoomDefnition.build(DataTypes),
    {}
  );
  ChatRoom.associate = function(models) {
    // associations can be defined here
  };
  return ChatRoom;
};
