'use strict';
const ChatRoomDefnition = require('../table_definitions').ChatRoomDefnition;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ChatRooms',
      ChatRoomDefnition.build(Sequelize)
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChatRooms');
  }
};
