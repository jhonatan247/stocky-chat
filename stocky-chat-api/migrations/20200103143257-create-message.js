'use strict';
const MessageDefnition = require('../table_definitions').MessageDefnition;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Messages', MessageDefnition.build(Sequelize))
      .then(() => queryInterface.addIndex('Messages', ['chatRoom']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
